import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Product, ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
    imports: [
        NgForOf,
        RouterLink
    ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  // currentProduct: Product | null = null;

  loadProducts() {
    this.productService.getAll().subscribe((data) => this.products = data);
  }
  constructor(private productService: ProductService) {
    // Initialize the component and fetch products
  }

  ngOnInit() {
    this.loadProducts();
  }

  delete(product: Product) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.productService.delete(product.id!).subscribe(() => {
        this.loadProducts(); // Recharger la liste après suppression
      });
    }
  }
}
