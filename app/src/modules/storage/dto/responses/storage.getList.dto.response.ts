export class StorageGetListDtoResponse {
  materials: {
    id: string;

    name: string;

    count: number;
  }[];

  totalCount: number;
}
