import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {ProductFormComponent} from './pages/product-form.component';
import {ProductListComponent} from './pages/product-list/product-list.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'add', component: ProductFormComponent },
  { path: 'edit/:id', component: ProductFormComponent }
];
