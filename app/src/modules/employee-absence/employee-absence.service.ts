import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { EmployeeAbsenceCreateDto } from './dto/employee-absence.create.dto';
import { EmployeeAbsenceGetListDto } from './dto/employee-absence.getList.dto';
import { EmployeeAbsenceUpdateDto } from './dto/employee-absence.update.dto';
import { EmployeeAbsenceGetListResponseDto } from './dto/responses/employee-absence.getList.response.dto';
import { EmployeeAbsenceRepository } from './employee-absence.repository';
import { PromiseResponseDto } from '../../dto/promise.response.dto';

@Injectable()
export class EmployeeAbsenceService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    private readonly employeeAbsenceRepository: EmployeeAbsenceRepository,
  ) {}

  /** Создание отсутствия */
  async create(dto: EmployeeAbsenceCreateDto): PromiseResponseDto {
    await this.sequelize.models.EmployeeAbsenceModel.create({
      employee_id: dto.employeeId,
      date_from: dto.dateFrom,
      date_to: dto.dateTo,
      reason: dto.reason,
    });

    return {
      message: 'Отсутствие успешно добавлено',
    };
  }

  /** Обновление отсутствия */
  async update(dto: EmployeeAbsenceUpdateDto): PromiseResponseDto {
    await this.sequelize.models.EmployeeAbsenceModel.update(
      {
        employee_id: dto.employeeId,
        date_from: dto.dateFrom,
        date_to: dto.dateTo,
        reason: dto.reason,
      },
      {
        where: {
          id: dto.id,
        },
      },
    );

    return {
      message: 'Отсутствие успешно обновлено',
    };
  }

  /** Обновление отсутствия */
  async delete(id: string): PromiseResponseDto {
    const date = new Date(Date.now());
    const isoString = date.toISOString();
    await this.sequelize.models.EmployeeAbsenceModel.update(
      {
        deletedAt: isoString,
      },
      {
        where: {
          id,
        },
      },
    );

    return {
      message: 'Отсутствие успешно обновлено',
    };
  }

  /** Получение списка отсутствий за определенный период */
  async getList(
    dto: EmployeeAbsenceGetListDto,
  ): PromiseResponseDto<EmployeeAbsenceGetListResponseDto[]> {
    const data = await this.employeeAbsenceRepository.getList(dto);

    return {
      data: data.map((item) => {
        return {
          id: item.id,
          dateFrom: new Date(item.dateFrom),
          dateTo: new Date(item.dateTo),
          reason: item.reason,
          employee: {
            id: item.employeeId,
            name: item.employeeName,
          },
        };
      }),
      message: 'Список отсутствий успешно получен',
    };
  }
}
