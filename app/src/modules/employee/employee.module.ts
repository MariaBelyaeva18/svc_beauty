import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { EmployeeService } from './employee.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
  imports: [UsersModule],
})
export class EmployeeModule {}
