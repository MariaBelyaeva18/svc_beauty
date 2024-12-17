import { Controller, Post, Body, Put, Get, Query, Patch, Param } from '@nestjs/common';
import { OrdersCreateDto } from './dto/orders.create.dto';
import { OrdersGetListDto } from './dto/orders.getList.dto';
import { OrdersGetMastersListDto } from './dto/orders.getMastersList.dto';
import { OrdersUpdateDto } from './dto/orders.update.dto';
import { OrdersGetMastersListResponseDto } from './dto/responses/orders.getMastersList.response.dto';
import { OrdersService } from './orders.service';
import { PromiseResponseDto } from '../../dto/promise.response.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: OrdersCreateDto): PromiseResponseDto {
    return this.ordersService.create(dto);
  }

  @Put()
  update(@Body() dto: OrdersUpdateDto): PromiseResponseDto {
    return this.ordersService.update(dto);
  }

  @Get('/list')
  getList(@Query() dto: OrdersGetListDto): PromiseResponseDto {
    return this.ordersService.getList(dto);
  }

  @Get('/master')
  getMastersList(
    dto: OrdersGetMastersListDto,
  ): PromiseResponseDto<OrdersGetMastersListResponseDto[]> {
    return this.ordersService.getMastersList(dto);
  }

  @Patch('/cancel/:orderId')
  cancelOrder(@Param('orderId') orderId: string): PromiseResponseDto {
    return this.ordersService.cancelOrder(orderId);
  }
}
