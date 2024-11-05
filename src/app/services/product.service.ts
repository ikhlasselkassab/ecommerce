import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }


  getProducts(){
    return this.http.get('https://dummyjson.com/products')
  }

  getProductBycategory(){
    return this.http.get('https://dummyjson.com/products/category-list')

  }
  getProductByCategory(category: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/category/${category}`);
  }

  getCategories() {
    return this.http.get('https://dummyjson.com/products/categories')
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`https://dummyjson.com/products/${productId}`);
  }

}
