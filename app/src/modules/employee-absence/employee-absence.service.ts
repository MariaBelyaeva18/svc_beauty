import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { EmployeeAbsenceCreateDto } from './dto/employee-absence.create.dto';
import { EmployeeAbsenceUpdateDto } from './dto/employee-absence.update.dto';
import { PromiseResponseDto } from '../../dto/promise.response.dto';

@Injectable()
export class EmployeeAbsenceService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
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
}
