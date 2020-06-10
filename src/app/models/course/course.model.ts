export interface CourseModel {
  id?: number;
  title: string;
  description: string;
  createdOn: Date;
  rating: number;
  ratedUsers?: number[];
}