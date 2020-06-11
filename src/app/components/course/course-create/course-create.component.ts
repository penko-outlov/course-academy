import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseModel } from 'src/app/models/course/course.model';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) form;
  createCourseForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private courseService: CourseService,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    await this.createEditCourseForm();
  }

  async createCourse() {
    const course: CourseModel = {
      title: this.title.value,
      description: this.description.value,
      createdOn: new Date(),
      rating: 0.0
    };
    await this.courseService.create(course);

    this.form.resetForm();
  }

  private async createEditCourseForm() {
    this.createCourseForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      description: ['', [
        Validators.required
      ]]
    });
  }

  get title() { return this.createCourseForm.get('title'); };

  get description() { return this.createCourseForm.get('description'); }
}
