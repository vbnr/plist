import { Injectable } from '@angular/core';
import { CartProduct } from './interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  add(product: CartProduct) {
    const clonedPr = { ...product };

    let products: CartProduct[] = [];

    const productsStr = localStorage.getItem('cart');

    if (productsStr) {
      products = JSON.parse(productsStr);
    }

    const targetProductIndex = products.findIndex((p) => p.id === clonedPr.id);

    if (targetProductIndex !== -1) {
      products[targetProductIndex].quantity++;
    } else {
      products.push(clonedPr);
    }

    localStorage.setItem('cart', JSON.stringify(products));
  }

  getAll(): CartProduct[] {
    let products = [];

    const productsStr = localStorage.getItem('cart');

    if (productsStr) {
      products = JSON.parse(productsStr);
    }

    return products;
  }

  setAll(products: CartProduct[]) {
    localStorage.setItem('cart', JSON.stringify(products));
  }

  removeAll() {
    localStorage.removeItem('cart');
  }
}
