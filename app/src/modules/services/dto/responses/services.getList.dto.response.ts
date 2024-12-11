export class ServicesGetListDtoResponse {
  data: {
    id: string;

    name: string;

    count: number;

    expirationDate: string;
  }[];

  totalCount: number;
}
