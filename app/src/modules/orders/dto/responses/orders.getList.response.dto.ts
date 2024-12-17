import { orderStatuses } from '../../../../sequelize/models/statuses.model';

export class OrdersGetListResponseDto {
  data: {
    id: string;

    executionDate: string;

    service: {
      id: string;

      name: string;
    };

    client: {
      id: string;

      name: string;
    };
    master: {
      id: string;

      name: string;
    };

    description: string;

    status: orderStatuses;
  }[];

  count: string;
}
