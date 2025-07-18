import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Teacher, TeacherService} from '../../../services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent {
  teachers: Teacher[] = [];
  constructor(private teacherService: TeacherService) {
  }

  loadTeacher(): void {
    this.teacherService.getAll().subscribe((data) => this.teachers = data);
  }

  ngOnInit(): void {
    this.loadTeacher();
  }

  delete(teacher: Teacher): void {
    if(confirm("Voulez-vous vraiment supprimer ?")){
      this.teacherService.delete(teacher.id!).subscribe(() => {
        this.loadTeacher();
      })
    }
  }
}
