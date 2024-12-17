import { orderStatuses } from '../../../../../sequelize/models/statuses.model';

export class OrdersGetListResponseRepositoryDto {
  data: {
    id: string;

    executionDate: string;

    serviceId: string;

    serviceName: string;

    clientId: string;

    clientName: string;

    masterId: string;

    masterName: string;

    description: string;

    status: orderStatuses;
  }[];

  count: string;
}
