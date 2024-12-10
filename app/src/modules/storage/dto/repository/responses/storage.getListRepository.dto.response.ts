export class StorageGetListRepositoryDtoResponse {
  materials: {
    id: string;

    name: string;

    count: number;
  }[];

  totalCount: number;
}
