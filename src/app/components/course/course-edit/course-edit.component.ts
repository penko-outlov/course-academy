import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { CourseModel } from 'src/app/models/course/course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  editCourseForm: FormGroup;
  course: CourseModel;

  constructor(private formBuilder: FormBuilder,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    await this.fetchCoruse();
    await this.createEditCourseForm();
  }

  async editCourse() {
    this.course.title = this.title.value;
    this.course.description = this.description.value;
    await this.courseService.update(this.course);
  }

  private async fetchCoruse() {
    const courseId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('courseId'));
    this.course = await this.courseService.getById(courseId);
  }

  private async createEditCourseForm() {
    this.editCourseForm = this.formBuilder.group({
      title: [this.course.title, [Validators.required]],
      description: [this.course.description, [Validators.required]]
    });
  }

  get title() { return this.editCourseForm.get('title'); };

  get description() { return this.editCourseForm.get('description'); }
}
