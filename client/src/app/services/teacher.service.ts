import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface Teacher {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  speciality: string;
  hiring_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = 'http://127.0.0.1:8000/api/teacher';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  getById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  create(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  update(id: number, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/${id}`, teacher);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
