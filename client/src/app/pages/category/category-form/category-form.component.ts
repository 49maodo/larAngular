import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Category, CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-category-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  isEditMode = false;
  categoryId!: number;
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', Validators.required]
    });
    this.route.paramMap.subscribe(params => {
      const id: string | null = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.categoryId = +id;
        this.categoryService.getById(this.categoryId).subscribe((category: Category) => {
          this.form.patchValue(category);
        });
      }
    })
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const data = this.form.value as Category;

    const obs = this.isEditMode
      ? this.categoryService.update(this.categoryId, data)
      : this.categoryService.create(data);

    obs.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Categorie modifiée' : 'Categorie ajoutée');
        this.router.navigate(['/category']);
      },
      error: () => {
        alert('Erreur lors de la sauvegarde');
      },

      complete: () => {
        this.isLoading = false;
      }
    });
  }


}
