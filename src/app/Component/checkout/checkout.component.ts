import { Component, OnInit } from '@angular/core';
import {CartService} from "../../Services/cart.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartData: any = [];
  cartTotal: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe((data) => this.cartData = data);
    console.log(this.cartData)
    this.loadCart()
  }
  loadCart(){
    if(localStorage.getItem('localCart')){
      this.cartData = JSON.parse(localStorage.getItem('localCart')||'[]')
      this.cartTotal = this.cartData.reduce(function (acc:any, val:any){
        return acc + (val.total);
      },0)
    }
  }


}
