export class StorageGetListRepositoryDtoResponse {
  materials: {
    id: string;

    name: string;

    count: number;

    expirationDate: string;
  }[];

  totalCount: number;
}
