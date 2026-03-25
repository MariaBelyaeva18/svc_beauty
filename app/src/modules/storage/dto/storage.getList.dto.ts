import { IsNotEmpty, IsNumberString } from 'class-validator';

export class StorageGetListDto {
  @IsNotEmpty()
  @IsNumberString()
  limit: string;

  @IsNotEmpty()
  @IsNumberString()
  offset: string;
}
