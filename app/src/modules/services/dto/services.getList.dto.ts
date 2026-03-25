import { IsNumberString, IsOptional } from 'class-validator';

export class ServicesGetListDto {
  @IsOptional()
  @IsNumberString()
  limit: string;

  @IsOptional()
  @IsNumberString()
  offset: string;
}
