import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Teacher, TeacherService} from '../../../services/teacher.service';
import {Product} from '../../../services/product.service';


@Component({
  selector: 'app-teacher-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css'
})
export class TeacherFormComponent {
  isEditMode = false;
  teacherId!: number;
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fist_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required],
      speciality: ['', Validators.required],
      hiring_date: ['', Validators.required],
    });
    this.route.paramMap.subscribe(params => {
      const id: string | null = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.teacherId = +id;
        this.teacherService.getById(this.teacherId).subscribe((teacher: Teacher) => {
          this.form.patchValue(teacher);
        });
      }
    })
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value as Teacher;

    if (this.isEditMode) {
      this.teacherService.update(this.teacherId, data).subscribe(() => {
        alert('teacher modifié');
        this.router.navigate(['/']);
      });
    } else {
      this.teacherService.create(data).subscribe(() => {
        alert('teacher ajouté');
        this.router.navigate(['/']);
      });
    }
  }
}
