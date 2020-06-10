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

  getById(userId: string): Promise<UserModel> {
    return this.httpClient.get<UserModel>(`${baseUrl}/users/${userId}`).toPromise();
  }

  getByEmail(email: string): Promise<UserModel> {
    return this.httpClient.get<UserModel>(`${baseUrl}/users?email=${email}`).toPromise();
  }
}
