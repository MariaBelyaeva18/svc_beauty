import { IsNotEmpty } from 'class-validator';

export class StorageCreateMaterialDto {
  @IsNotEmpty()
  materialName: string;

  @IsNotEmpty()
  amount: string;
}
