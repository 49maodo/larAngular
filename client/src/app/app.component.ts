import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Product, ProductService} from './services/product.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {

}
