import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize, Transaction } from 'sequelize';
import { EmployeeCreateDto } from './dto/employee.create.dto';
import { EmployeeUpdateDto } from './dto/employee.update.dto';
import { EmployeeUpsertEmployeeServicesDto } from './dto/employee.upsertEmployeeServices.dto';
import { EmployeeGetDetailInfoDtoResponse } from './dto/responses/employee.getDetailInfo.dto.response';
import { EmployeeGetListDtoResponse } from './dto/responses/employee.getList.dto.response';
import { EmployeeRepository } from './employee.repository';
import { PromiseResponseDto } from '../../dto/promise.response.dto';
import { StorageGetListDto } from '../storage/dto/storage.getList.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    private readonly employeeRepository: EmployeeRepository,
    private readonly usersService: UsersService,
  ) {}

  /** Получение списка мастеров */
  async getList(dto: StorageGetListDto): PromiseResponseDto<EmployeeGetListDtoResponse> {
    const data = await this.employeeRepository.getList(dto);

    const masterIds = data.data.map((item) => item.id);

    const masterServices = await this.employeeRepository.getMasterServices(masterIds);

    /** Преобразовываем массив в объект, чтобы можно было получать по id мастера его услуги */
    const updatedMasterServices = masterServices.reduce((acc, item) => {
      const accValue = acc[item.masterId] || [];

      return {
        ...acc,
        [item.masterId]: [
          ...accValue,
          {
            id: item.id,
            name: item.name,
          },
        ],
      };
    }, {});

    return {
      data: {
        data: data.data.map((item) => ({
          ...item,
          masterServices: updatedMasterServices[item.id],
        })),
        totalCount: data.totalCount,
      },
      message: 'Список мастеров успешно получен',
    };
  }

  /** Получение детальной информации */
  async getDetailInfo(masterId: string): PromiseResponseDto<EmployeeGetDetailInfoDtoResponse> {
    const data = await this.employeeRepository.getDetailInfo(masterId);

    const masterServices = await this.employeeRepository.getMasterServices([masterId]);

    return {
      data: {
        ...data,
        masterServices: masterServices.map((item) => item.id),
      },
      message: 'Мастер успешно получен',
    };
  }

  /** Создание мастера */
  async create(dto: EmployeeCreateDto, avatarFile: Express.Multer.File): PromiseResponseDto {
    await this.sequelize.transaction(async (transaction) => {
      const masterInfo = await this.sequelize.models.UsersModel.create(
        {
          name: dto.name,
          middle_name: dto.middleName,
          last_name: dto.lastName,
          phone_number: dto.phone,
          role_id: dto.roleId,
          login: dto.username,
          password: dto.password,
        },
        {
          returning: true,
          transaction,
        },
      );

      await this.upsertEmployeeServices(
        {
          masterId: masterInfo['id'],
          serviceIds: dto.masterServiceIds,
        },
        transaction,
      );

      if (avatarFile) {
        await this.usersService.updateAvatar(masterInfo['id'], avatarFile, transaction);
      }
    });

    return {
      message: 'Мастер успешно создан',
    };
  }

  /** Обновление мастера */
  async update(dto: EmployeeUpdateDto): PromiseResponseDto {
    await this.sequelize.transaction(async (transaction) => {
      await this.sequelize.models.UsersModel.update(
        {
          name: dto.name,
          middle_name: dto.middleName,
          last_name: dto.lastName,
          phone_number: dto.phone,
          role_id: dto.roleId,
          login: dto.username,
          password: dto.password,
        },
        {
          where: {
            id: dto.id,
          },
          transaction,
        },
      );

      await this.upsertEmployeeServices(
        {
          masterId: dto.id,
          serviceIds: dto.masterServiceIds,
        },
        transaction,
      );
    });

    return {
      message: 'Мастер успешно обновлен',
    };
  }

  /** Удаление мастера */
  async delete(masterId: string): PromiseResponseDto {
    await this.sequelize.models.UsersModel.destroy({
      where: {
        id: masterId,
      },
    });

    return {
      message: 'Мастер успешно удален',
    };
  }

  /** Назначение услуг к-ые могут выполнять сотрудники */
  private async upsertEmployeeServices(
    dto: EmployeeUpsertEmployeeServicesDto,
    transaction: Transaction,
  ): Promise<void> {
    const servicesList = dto.serviceIds.reduce((acc, serviceId) => {
      return [
        ...acc,
        {
          master_id: dto.masterId,
          service_id: serviceId,
        },
      ];
    }, []);

    await this.sequelize.models.EmployeeServiceModel.destroy({
      where: {
        master_id: dto.masterId,
      },
      transaction,
    });

    await this.sequelize.models.EmployeeServiceModel.bulkCreate(servicesList, {
      transaction,
    });
  }
}
