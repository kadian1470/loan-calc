export type PageableResults<T> = Readonly<{
  total: number;
  results: T[];
  page: number;
}>;

export type UserResponse = Readonly<{
  id: string;
  name: string;
}>;
