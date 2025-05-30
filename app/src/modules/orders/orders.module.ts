import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { ScheduleService } from './schedule.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, ScheduleService],
})
export class OrdersModule {}
