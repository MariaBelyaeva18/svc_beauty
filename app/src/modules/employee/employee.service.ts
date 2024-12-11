import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { EmployeeCreateDto } from './dto/employee.create.dto';
import { EmployeeUpdateDto } from './dto/employee.update.dto';
import { EmployeeGetListDtoResponse } from './dto/responses/employee.getList.dto.response';
import { EmployeeRepository } from './employee.repository';
import { PromiseResponseDto } from '../../dto/promise.response.dto';
import { StorageGetListDto } from '../storage/dto/storage.getList.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  /** Получение списка мастеров */
  async getList(dto: StorageGetListDto): PromiseResponseDto<EmployeeGetListDtoResponse> {
    const data = await this.employeeRepository.getList(dto);

    return {
      data,
      message: 'Список мастеров успешно получен',
    };
  }

  /** Создание мастера */
  async create(dto: EmployeeCreateDto) {
    await this.sequelize.models.EmployeeModel.create({
      name: dto.name,
      middle_name: dto.middleName,
      last_name: dto.lastName,
      phone_number: dto.phone,
      roleId: dto.roleId,
    });

    return {
      message: 'Мастер успешно создан',
    };
  }

  /** Обновление мастера */
  async update(dto: EmployeeUpdateDto): PromiseResponseDto {
    await this.sequelize.models.EmployeeModel.update(
      {
        name: dto.name,
        middle_name: dto.middleName,
        last_name: dto.lastName,
        phone_number: dto.phone,
        roleId: dto.roleId,
      },
      {
        where: {
          id: dto.id,
        },
      },
    );

    return {
      message: 'Мастер успешно обновлен',
    };
  }

  /** Удаление мастера */
  async delete(masterId: string): PromiseResponseDto {
    await this.sequelize.models.EmployeeModel.destroy({
      where: {
        id: masterId,
      },
    });

    return {
      message: 'Мастер успешно удален',
    };
  }
}
