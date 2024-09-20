import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  public productForm: FormGroup;
  public elaborationOptions: string[] = ['Elaborado a Mano', 'Elaborado a Mano y Maquina'];
  private productService = inject(ProductsService);
  private file: File | null = null;
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      elaborationName: ['', Validators.required],
    });
  }

  submitProduct() {
    if (this.productForm.valid) {
      const product = [this.cleanProduct(this.productForm.value)];
      this.productService.createProducts(product).subscribe({
        next: () => {
          this.handleProductCreationSuccess();
        },
        error: (error) => {
          console.log(error.message);
        },
      });
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadProducts() {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => {
        const products = this.parseCSV(reader.result as string);
        if (products.length > 0) {
          this.productService.createProducts(products).subscribe({
            next: () => {
              this.handleProductCreationSuccess();
            },
            error: (error) => {
              console.log(error.message);
            },
          });
        } else {
          alert('No products where added because the file wes empty or the products were invalid.');
        }
      };
      reader.readAsText(this.file);
    }
  }

  private handleProductCreationSuccess() {
    const userResponse = confirm('Producto(s) successfully added. Do you want to add more Products?');
    this.file = null;
    if (userResponse) {
      this.productForm.reset();
    } else {
      this.router.navigate(['Home'])
    }
  }

  private parseCSV(data: string): any[] {
    const lines = data.split('\n');
    const result: any[] = [];
    const headers = ['name', 'elaborationName'];

    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      const currentline = lines[i].split(',');

      if (!currentline[0] || currentline[0].trim() === '') {
        continue;
      }

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = this.cleanString(currentline[j]);
      }

      result.push(obj);
    }
    return result;
  }

  private cleanString(value: string | undefined | null): string {
    if (value === undefined || value === null) {
      return '';
    }
    return value.replace(/\r?\n|\r/g, '').trim();
  }

  private cleanProduct(product: any): any {
    return {
      ...product,
      elaborationName: this.cleanString(product.elaborationName)
    };
  }
}