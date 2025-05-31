import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize, QueryTypes } from 'sequelize';

@Injectable()
export class ScheduleService {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}

  private timeStringToMinutes(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 60 + minutes + seconds / 60;
  }

  private dateToMinutes(date: Date): number {
    return date.getHours() * 60 + date.getMinutes();
  }

  private minutesToDate(baseDate: Date, minutes: number): Date {
    const d = new Date(baseDate);
    d.setHours(0, 0, 0, 0);
    d.setMinutes(minutes);
    return d;
  }

  async getAvailableSlots(
    serviceId: string,
    masterId: string,
    date: string, // 'YYYY-MM-DD'
  ): Promise<string[]> {
    // 1. Проверяем, что мастер оказывает эту услугу
    const [empService] = await this.sequelize.query(
      `
          SELECT *
          FROM employee_service
          WHERE master_id = :masterId AND service_id = :serviceId
            LIMIT 1
        `,
      {
        replacements: { masterId, serviceId },
        type: QueryTypes.SELECT,
      },
    );

    if (!empService) {
      throw new BadRequestException('Мастер не оказывает эту услугу');
    }

    // 2. Получаем длительность услуги
    const [service] = await this.sequelize.query<{
      duration: any;
    }>(
      `
          SELECT *
          FROM services
          WHERE id = :serviceId
            LIMIT 1
        `,
      {
        replacements: { serviceId },
        type: QueryTypes.SELECT,
      },
    );

    if (!service) {
      throw new BadRequestException('Услуга не найдена');
    }

    const serviceDurationMinutes = this.timeStringToMinutes(service.duration);

    const [absence] = await this.sequelize.query(
      `
        SELECT * FROM employee_absence
        WHERE employee_id = :masterId
        AND :selectedDate BETWEEN date_from AND date_to
        LIMIT 1;
        `,
      {
        replacements: { masterId, selectedDate: date },
        type: QueryTypes.SELECT,
      },
    );

    if (absence) {
      return [];
    }

    // 3. Рабочий день
    const WORK_START = 9 * 60; // 09:00
    const WORK_END = 18 * 60; // 18:00

    const execDate = new Date(date);
    execDate.setHours(execDate.getHours() + 3); // сдвиг на +3 часа

    const baseDate = new Date(execDate);
    baseDate.setHours(0, 0, 0, 0);
    const searchDate = baseDate.toISOString().split('T')[0];

    // 4. Заказы мастера на день
    const orders = await this.sequelize.query(
      `
          SELECT o.*, s.duration AS service_duration
          FROM orders o
                 JOIN services s ON o.service_id = s.id
          WHERE o.master_id = :masterId
            AND o.status_id <> 'done' 
            AND o.status_id <> 'canceled' 
            AND o.execution_date >= :startOfDay
            AND o.execution_date <= :endOfDay
          ORDER BY o.execution_date ASC
        `,
      {
        replacements: {
          masterId,
          startOfDay: `${searchDate}T00:00:00.000Z`,
          endOfDay: `${searchDate}T23:59:59.999Z`,
        },
        type: QueryTypes.SELECT,
      },
    );

    const occupiedIntervals: [number, number][] = orders.map(
      (order: { execution_date: any; service_duration: any; time: string }) => {
        const [hours, minutes] = order.time.split(':').map(Number);
        const startMinutes = hours * 60 + minutes;
        const durationMinutes = this.timeStringToMinutes(order.service_duration);
        return [startMinutes, startMinutes + durationMinutes];
      },
    );

    // 6. Создаём сетку времени по слотам
    const availableSlots: string[] = [];

    for (
      let slotStart = WORK_START;
      slotStart + serviceDurationMinutes <= WORK_END;
      slotStart += serviceDurationMinutes
    ) {
      const slotEnd = slotStart + serviceDurationMinutes;

      const overlaps = occupiedIntervals.some(
        ([busyStart, busyEnd]) => slotStart < busyEnd && slotEnd > busyStart, // пересечение
      );

      if (!overlaps) {
        availableSlots.push(
          this.minutesToDate(baseDate, slotStart).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
        );
      }
    }

    const currentDate = new Date();
    const currentDay = currentDate.toISOString().split('T')[0];
    const currentHours = currentDate.getHours();

    if (currentDay === searchDate) {
      return availableSlots.filter((slot) => {
        const slotHours = parseInt(slot.split(':')[0], 10);
        return slotHours > currentHours;
      });
    }

    return availableSlots;
  }
}
