import { Module } from '@nestjs/common';
import { EmployeeAbsenceController } from './employee-absence.controller';
import { EmployeeAbsenceRepository } from './employee-absence.repository';
import { EmployeeAbsenceService } from './employee-absence.service';

@Module({
  controllers: [EmployeeAbsenceController],
  providers: [EmployeeAbsenceService, EmployeeAbsenceRepository],
})
export class EmployeeAbsenceModule {}
