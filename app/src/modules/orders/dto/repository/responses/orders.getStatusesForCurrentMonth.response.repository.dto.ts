import { orderStatuses } from '../../../../../sequelize/models/statuses.model';

export class OrdersGetStatusesForCurrentMonthResponseRepositoryDto {
  status: orderStatuses;

  count: number;
}
