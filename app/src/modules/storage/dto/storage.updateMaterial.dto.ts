import { IsNotEmpty } from 'class-validator';

export class StorageUpdateMaterialDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  materialName: string;

  @IsNotEmpty()
  amount: string;

  @IsNotEmpty()
  expirationDate: string;
}
