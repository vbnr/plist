import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CompleteOrderComponent } from './components/complete-order/complete-order.component';

@NgModule({
  declarations: [CartComponent, CompleteOrderComponent],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
