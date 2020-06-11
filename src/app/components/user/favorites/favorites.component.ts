import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CourseModel } from 'src/app/models/course/course.model';
import { UserModel } from 'src/app/models/user/user.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  user: UserModel;
  favoriteCourses: CourseModel[]= [];

  constructor(private userService: UserService,
              private courseService: CourseService) { }

  async ngOnInit() {
    await this.fetchUser();
    await this.fetchFavoriteCourses();
  }

  async removeCourseFromFavorites(courseId: number) {
    this.favoriteCourses = this.favoriteCourses.filter(course => course.id !== courseId);
    this.user.favoriteCourses = this.user.favoriteCourses.filter(id => id !== courseId);
    await this.userService.update(this.user);
  }

  private async fetchUser() {
    const userId: number = JSON.parse(localStorage.getItem('user')).userId;
    this.user = await this.userService.getById(userId);
  }

  private async fetchFavoriteCourses() {
    for (let courseId of this.user.favoriteCourses) {
      const course: CourseModel = await this.courseService.getById(courseId);
      this.favoriteCourses.push(course);
    }
  }
}
