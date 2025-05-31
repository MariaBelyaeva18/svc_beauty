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
import { ScheduleService } from './schedule.service';
import ordersSchema from './schemas/orders.schema';
import { PromiseResponseDto } from '../../dto/promise.response.dto';
import { VALIDATION_ERROR } from '../../messages/validation.messages';
import JoiObjectValidationPipe from '../../pipes/JoiObjectValidationPipe';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly scheduleService: ScheduleService,
  ) {}

  @Post()
  create(
    @Body(new JoiObjectValidationPipe(ordersSchema.create, VALIDATION_ERROR)) dto: OrdersCreateDto,
  ): PromiseResponseDto {
    return this.ordersService.create(dto);
  }

  @Put()
  update(
    @Body(new JoiObjectValidationPipe(ordersSchema.update, VALIDATION_ERROR)) dto: OrdersUpdateDto,
  ): PromiseResponseDto {
    return this.ordersService.update(dto);
  }

  @Get('/')
  get(@Query() dto: { serviceId: string; masterId: string; date: string }) {
    const { serviceId, masterId, date } = dto;
    return this.scheduleService.getAvailableSlots(serviceId, masterId, date);
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
