import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {ProductFormComponent} from './pages/product-form.component';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {CategoryListComponent} from './pages/category/category-list/category-list.component';
import {CategoryFormComponent} from './pages/category/category-form/category-form.component';
import {TeacherListComponent} from './pages/teacher/teacher-list/teacher-list.component';
import {TeacherFormComponent} from './pages/teacher/teacher-form/teacher-form.component';

export const routes: Routes = [
  // product
  // { path: '', component: ProductListComponent },
  // { path: 'add', component: ProductFormComponent },
  // { path: 'edit/:id', component: ProductFormComponent },
  { path: '', component: TeacherListComponent },
  { path: 'add', component:  TeacherFormComponent},
  { path: 'edit/:id', component: TeacherFormComponent },
  // category
  { path: 'category', component: CategoryListComponent },
  { path: 'category/add', component: CategoryFormComponent },
  { path: 'category/edit/:id', component: CategoryFormComponent },
];
