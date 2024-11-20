import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { PostgresModule } from '../postgres/postgres.module';

@Module({
  controllers: [RolesController],
  imports: [PostgresModule],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
