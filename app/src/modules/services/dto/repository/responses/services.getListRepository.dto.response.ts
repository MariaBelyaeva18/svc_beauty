export class ServicesGetListRepositoryDtoResponse {
  data: {
    id: string;

    name: string;

    count: number;

    expirationDate: string;
  }[];

  totalCount: number;
}
