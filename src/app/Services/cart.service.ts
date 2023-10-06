import { Injectable } from '@angular/core';
import {productModel} from "../Model/product.model";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OrderService} from "./order.service";
import {NavigationExtras, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private serverURL = environment.SERVER_URL;
  itemsCart: any = [];
  cartSubject = new Subject<any>()
  cartData$ = new BehaviorSubject<any>(this.itemsCart)
  constructor(private http: HttpClient, private orderService: OrderService, private router:Router,
  ) {
    this.itemsCart = JSON.parse(localStorage.getItem('localCart')||'[]')
    this.cartData$.next(this.itemsCart)
  }
  // Add to cart


  AddToCart(product: productModel){

    console.log(product);
    let cartDataNull = localStorage.getItem('localCart');
    Object.assign(product, {total: product.price * product.quantity})
    if(cartDataNull == null){
      let storeDataGet : any = [];

      storeDataGet.push(product);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet))
    }else{
      var id = product.id;
      let index:number = -1
      this.itemsCart = JSON.parse(localStorage.getItem('localCart')||'{}') || [];
      for(let i=0; i< this.itemsCart.length; i++ ){
        // @ts-ignore
        if(parseInt(id)===parseInt(this.itemsCart[i].id)){
          this.itemsCart[i].quantity = product.quantity;
          index = i;
          break;
        }
      }
      if (index == -1){
        this.itemsCart.push(product);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart))
      }else{
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart))
      }
    }

  }

  //Cart Number
  cartNumber: number = 0;
  cartNumberFunc(){
    var cartValue = JSON.parse(localStorage.getItem('localCart') || '[]')
    this.cartNumber = cartValue.length
    this.cartSubject.next(this.cartNumber)
  }

  // + - Method
  increase(p: productModel) {
    p.quantity += 1;
  }
  decrease(p: productModel) {
    if(p.quantity != 1){
      p.quantity -= 1;
    }
  }

  // CheckoutFromCart(userId: number) {
  //   this.http.post(`${this.serverURL}/orders/payment`, null).subscribe((res: any) => {
  //     if (res.success) {
  //       this.http.post<OrderResponse>(`${this.serverURL}/orders/new`, {
  //         userId,
  //         products: this.itemsCart
  //       }).subscribe((data: OrderResponse) => {
  //         console.log(data)
  //         this.orderService.getSingleOrder(data.order_id).then(prods => {
  //           if (data.success) {
  //             const navigationExtras: NavigationExtras = {
  //               state: {
  //                 message: data.message,
  //                 products: prods,
  //                 orderId: data.order_id,
  //                 total: this.itemsCart.total
  //               }
  //             };
  //             this.spinner.hide().then();
  //             this.router.navigate(['/thankyou'], navigationExtras).then(p => {
  //               this.itemsCart = [];
  //               this.cartSubject.next(0);
  //               localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
  //             });
  //           }
  //         });
  //       });
  //     } else {
  //       this.router.navigateByUrl('/checkout').then();
  //     }
  //   });
  // }

}


interface OrderResponse {
  order_id: number;
  success: boolean;
  message: string;
  products: [{
    id: string,
    numInCart: string
  }];
}
