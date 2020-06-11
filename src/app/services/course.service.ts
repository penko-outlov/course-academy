import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseModel } from '../models/course/course.model';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  create(course: CourseModel): Promise<void> {
    return this.httpClient.post<void>(`${baseUrl}/courses`, course).toPromise();
  }

  getAll(): Promise<CourseModel[]> {
    return this.httpClient.get<CourseModel[]>(`${baseUrl}/courses`).toPromise();
  }

  getById(courseId: number): Promise<CourseModel> {
    return this.httpClient.get<CourseModel>(`${baseUrl}/courses/${courseId}`).toPromise();
  }

  removeById(courseId: number): Promise<void> {
    return this.httpClient.delete<void>(`${baseUrl}/courses/${courseId}`).toPromise();
  }

  update(course: CourseModel): Promise<void> {
    return this.httpClient.put<void>(`${baseUrl}/courses/${course.id}`, course).toPromise();
  }
}
