export interface PaginationResponseModel<T> {
  data: T[];
  page: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}