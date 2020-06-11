import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseModel } from 'src/app/models/course/course.model';
import { UserModel } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: CourseModel[];

  constructor(private courseService: CourseService,
              private userService: UserService) { }

  async ngOnInit() {
    await this.fetchCourses();
  }

  async addToFavorites(courseId: number) {
    const cachedUser = JSON.parse(localStorage.getItem('user'));
    const user: UserModel = await this.userService.getById(parseInt(cachedUser.userId));
    if (!user.favoriteCourses) {
      user.favoriteCourses = [];
    }
    user.favoriteCourses.push(courseId);
    await this.userService.update(user);
  }

  async removeCourse(courseId: number) {
    await this.courseService.removeById(courseId);
    this.courses = this.courses.filter(course => course.id !== courseId);
    await this.removeCourseFromUserFavorites(courseId);
  }

  private async fetchCourses() {
    this.courses = await this.courseService.getAll();
  }

  private async removeCourseFromUserFavorites(courseId: number) {
    const users = await this.userService.getAll();
    for (let user of users) {
      if (user.favoriteCourses && user.favoriteCourses.includes(courseId)) {
        user.favoriteCourses = user.favoriteCourses.filter(id => id !== courseId);
        await this.userService.update(user);
      }
    }
  }
}
