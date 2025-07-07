import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Product, ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  isEditMode = false;
  productId!: number;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productId = +id;
        this.productService.getById(this.productId).subscribe((product: Product) => {
          this.form.patchValue(product);
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value as Product;

    if (this.isEditMode) {
      this.productService.update(this.productId, data).subscribe(() => {
        alert('Produit modifié');
        this.router.navigate(['/']);
      });
    } else {
      this.productService.create(data).subscribe(() => {
        alert('Produit ajouté');
        this.router.navigate(['/']);
      });
    }
  }
}
