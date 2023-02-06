import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CartService } from 'src/core/services/http/cart/cart.service';
import { CartProduct } from 'src/core/services/http/cart/interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  initial = true;
  subs?: Subscription;
  cartProducts?: CartProduct[];
  totalPrice?: number;

  cartChanged$: BehaviorSubject<CartProduct[]> = new BehaviorSubject(
    this.cartService.getAll()
  );

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.subs = this.cartChanged$.subscribe((products) => {
      this.cartProducts = products;
      this.calcTotalPrice(products);

      // Executes updating of the localStorage data only when the user has some interaction with the card's list
      if (!this.initial) {
        this.cartService.setAll(this.cartProducts);
      }

      this.initial = false;
    });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  onChangeQuantity(
    id: number,
    action: { increase?: boolean; decrease?: boolean }
  ) {
    const clonedCartProducts = [...(this.cartProducts ?? [])];
    const targetProductIndex = clonedCartProducts.findIndex((p) => p.id === id);

    if (targetProductIndex === -1) {
      throw Error('Can`t find the product');
    }

    // Updates quantity of the product based on the action parameters
    this.updateCartProductsQuantity(
      clonedCartProducts,
      targetProductIndex,
      action
    );

    // Removes product from the list if the quantity is 0
    if (clonedCartProducts[targetProductIndex].quantity === 0) {
      const filteredCartProducts = this.filterOutTheProduct(
        clonedCartProducts,
        id
      );

      this.cartChanged$.next(filteredCartProducts);

      return;
    }

    this.cartChanged$.next(clonedCartProducts);
  }

  onRemove(id: number) {
    const filteredCartProducts = this.filterOutTheProduct(
      this.cartProducts ?? [],
      id
    );

    this.cartChanged$.next(filteredCartProducts);
  }

  onCompleteOrder() {
    this.cartService.removeAll();
    this.router.navigateByUrl('cart/complete');
  }

  private calcTotalPrice(prs: CartProduct[]) {
    this.totalPrice = prs
      .map((p) => p.price * p.quantity)
      .reduce((acc, curr) => acc + curr, 0);
  }

  private filterOutTheProduct(cartProducts: CartProduct[], id: number) {
    return cartProducts.filter((p) => p.id !== id);
  }

  private updateCartProductsQuantity(
    cartProducts: CartProduct[],
    targetProductIndex: number,
    action: {
      increase?: boolean;
      decrease?: boolean;
    }
  ) {
    if (action.increase) {
      cartProducts[targetProductIndex].quantity++;
    } else if (action.decrease) {
      cartProducts[targetProductIndex].quantity--;
    }
  }
}
