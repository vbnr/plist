import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CompleteOrderComponent } from './components/complete-order/complete-order.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'complete', component: CompleteOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
