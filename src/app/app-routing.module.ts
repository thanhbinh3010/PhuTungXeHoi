import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Component/cart/cart.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { HomeComponent } from './Component/home/home.component';
import { ProductDetailComponent } from './Component/product-detail/product-detail.component';
import { ProductComponent } from './Component/product/product.component';
import { ThankyouComponent } from './Component/thankyou/thankyou.component';
import {LoginComponent} from "./Component/login/login.component";
import {RegisterComponent} from "./Component/register/register.component";
const routes: Routes = [

{
    path: '', component: HomeComponent},

   { path: 'product/category/:cat', component: ProductComponent
  },

  {
    path: 'cart', component: CartComponent
  },
  {path: 'productdetail/:id', component: ProductDetailComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'thankyou', component: ThankyouComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
