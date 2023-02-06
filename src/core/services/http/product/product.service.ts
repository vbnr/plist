import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { dump_list } from './dump_list';
import { Product } from './interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAll(): Observable<Product[]> {
    return of(
      dump_list.map((pr) => {
        return { ...pr, price: Number(pr.price) / 100 };
      })
    );
  }
}
