  import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/header/header.component';
import { HomeComponent } from './Component/home/home.component';
import { FooterComponent } from './Component/footer/footer.component';
import { CartComponent } from './Component/cart/cart.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { ThankyouComponent } from './Component/thankyou/thankyou.component';
import { ProductComponent } from './Component/product/product.component';
import { ProductDetailComponent } from './Component/product-detail/product-detail.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
  import {ShopComponent} from "./Component/shop/shop.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CartComponent,
    ShopComponent,
    CheckoutComponent,
    ThankyouComponent,
    ProductComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
