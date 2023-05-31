export interface ResultsI {
  count: number;
  data: any;
}

export interface TypedResultsI<T> {
  count: number;
  data: T[];
}

export interface FiltersResults {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: string;
  [others: string]: any;
}