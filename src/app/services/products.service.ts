import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseProduct } from '../interfaces/ResponseProduct';
import { Observable } from 'rxjs';
import { StatusUpdate } from '../interfaces/StatusUpdate';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  ProductList(): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(`${this.baseUrl}/product/all`)
  }

  getByStatus(statusName: String): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(`${this.baseUrl}/product/findByStatus/${statusName}`);
  }

  createProducts(Product: any) {
    return this.http.post(`${this.baseUrl}/product/create`, Product);
  }

  defectiveUpdate(id: number, statusUpdate: StatusUpdate): Observable<any> {
    return this.http.patch(`${this.baseUrl}/product/defective/${id}`, statusUpdate);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/product/out/${id}`)
  }

}