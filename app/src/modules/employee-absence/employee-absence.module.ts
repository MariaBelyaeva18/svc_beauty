import { Module } from '@nestjs/common';
import { EmployeeAbsenceService } from './employee-absence.service';
import { EmployeeAbsenceController } from './employee-absence.controller';

@Module({
  controllers: [EmployeeAbsenceController],
  providers: [EmployeeAbsenceService]
})
export class EmployeeAbsenceModule {}
