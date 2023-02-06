import { Component } from '@angular/core';
import { CartService } from 'src/core/services/http/cart/cart.service';
import { Product } from 'src/core/services/http/product/interfaces/product';
import { ProductService } from 'src/core/services/http/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  productList$ = this.productService.getAll();

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  onAddToTheCart(pr: Product) {
    const { id, name, price } = pr;
    this.cartService.add({ id, name, price, quantity: 1 });
  }
}
