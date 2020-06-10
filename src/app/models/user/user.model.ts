export interface UserModel {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  favoriteCourses?: number[];
  isAdmin: boolean;
  isActive: boolean;
}