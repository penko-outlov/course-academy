import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user/user.model';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  create(user: UserModel): Promise<UserModel> {
    return this.httpClient.post<UserModel>(`${baseUrl}/users`, user).toPromise();
  }

  getAll(): Promise<UserModel[]> {
    return this.httpClient.get<UserModel[]>(`${baseUrl}/users`).toPromise();
  }

  getById(userId: number): Promise<UserModel> {
    return this.httpClient.get<UserModel>(`${baseUrl}/users/${userId}`).toPromise();
  }

  update(user: UserModel): Promise<void> {
    return this.httpClient.put<void>(`${baseUrl}/users/${user.id}`, user).toPromise();
  }

  removeById(userId: number): Promise<void> {
    return this.httpClient.delete<void>(`${baseUrl}/users/${userId}`).toPromise();
  }

  getByEmail(email: string): Promise<UserModel> {
    return this.httpClient.get<UserModel>(`${baseUrl}/users?email=${email}`).toPromise();
  }

  async blockUserById(userId: number): Promise<void> {
    const user: UserModel = await this.getById(userId);
    user.isActive = false;
    return this.update(user);
  }
}
