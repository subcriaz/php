export interface IssueFilters {
  location?: {
    coordinates: [number, number];
    distance: number;
  };
  startDate?: Date;
  endDate?: Date;
  severity?: number;
}
