import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/Product';
import { Router } from '@angular/router';
import { StatusUpdate } from '../../interfaces/StatusUpdate';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductsService);
  private router = inject(Router);
  public productList: Product[] = [];
  public displayedColumns: string[] = ['id', 'name', 'status', 'elaboration', 'actions'];
  public selectedStatus: string = 'Todos';
  public statusOptions: string[] = ['Todos', 'Disponible', 'Defectuoso'];

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    if (this.selectedStatus === 'Todos') {
      this.productService.ProductList().subscribe({
        next: (data) => {
          this.productList = data;
        },
        error: (error) => {
          console.log(error.message);
        }
      });
    } else {
      this.productService.getByStatus(this.selectedStatus).subscribe({
        next: (data) => {
          this.productList = data;
        },
        error: (error) => {
          console.log(error.message);
        }
      });
    }
  }

  filterProducts() {
    this.getProducts();
  }

  navigateToProductForm() {
    this.router.navigate(['/register-product']);
  }

  markAsDefective(productId: number) {
    const statusUpdate: StatusUpdate = { statusName: 'Defectuoso' };
    this.productService.defectiveUpdate(productId, statusUpdate).subscribe({
      next: (response) => {
        console.log('Product marked as defective', response);
        this.getProducts();
      },
      error: (error) => {
        console.error('Error marking product as defective', error);
      }
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (error) => {
        console.log('Error al eliminar el producto:', error.message);
      }
    });
  }
}