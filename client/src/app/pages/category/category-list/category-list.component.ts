import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Category, CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-category-list',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories: Category[] = [];
  currentCategory: Category | null = null;
  constructor(private categoryService: CategoryService) {
  }
  loadCategory(): void {
    this.categoryService.getAll().subscribe((data) => this.categories = data);
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  delete(category: Category): void {
    if(confirm("Voulez-vous vraiment supprimer ce produit ?")){
      this.categoryService.delete(category.id!).subscribe(() => {
        this.loadCategory();
      })
    }
  }
}
