import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Query,
  Patch,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { OrdersCreateDto } from './dto/orders.create.dto';
import { OrdersGetListDto } from './dto/orders.getList.dto';
import { OrdersGetMastersListDto } from './dto/orders.getMastersList.dto';
import { OrdersUpdateDto } from './dto/orders.update.dto';
import { OrdersGetListResponseDto } from './dto/responses/orders.getList.response.dto';
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
  getList(@Query() dto: OrdersGetListDto): PromiseResponseDto<OrdersGetListResponseDto> {
    return this.ordersService.getList(dto);
  }

  @Get('/master')
  getMastersList(
    @Query() dto: OrdersGetMastersListDto,
  ): PromiseResponseDto<OrdersGetMastersListResponseDto[]> {
    return this.ordersService.getMastersList(dto);
  }

  @Patch('/cancel/:orderId')
  cancelOrder(@Param('orderId') orderId: string): PromiseResponseDto {
    return this.ordersService.changeOrderStatus(orderId, 'canceled');
  }

  @Patch('/accept/:orderId')
  acceptOrder(@Param('orderId') orderId: string): PromiseResponseDto {
    return this.ordersService.changeOrderStatus(orderId, 'accepted');
  }

  @Patch('/done/:orderId')
  doneOrder(@Param('orderId') orderId: string): PromiseResponseDto {
    return this.ordersService.changeOrderStatus(orderId, 'done');
  }

  @Get('report')
  generatePdfReport(): Promise<StreamableFile> {
    return this.ordersService.generatePdfReport();
  }
}
