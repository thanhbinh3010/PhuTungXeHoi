import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {productModel} from "../../Model/product.model";
import {CartService} from "../../Services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products?: productModel;

  constructor(private cartService:CartService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

    this.CartDetails();
    this.loadCart()
  }
  getCartDetails: any = [];
  CartDetails(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')|| '[]')
      console.log(this.getCartDetails)
    }
  }
  total: number = 0;
  loadCart(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')||'[]')
      this.total = this.getCartDetails.reduce(function (acc:any, val:any){
        return acc + (val.total);
      },0)
    }
  }
  incQnt(id:number, quantity:number) {
    for(let i=0; i<this.getCartDetails.length;i++){
      if(this.getCartDetails[i].id === id){
        this.getCartDetails[i].quantity = quantity + 1;
        this.getCartDetails[i].total = this.getCartDetails[i].quantity*this.getCartDetails[i].price
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
    this.loadCart()

  }

  decQnt(id:number, quantity:number) {
    for(let i=0; i<this.getCartDetails.length;i++){
      if(this.getCartDetails[i].id === id){
        if(quantity != 1)
          this.getCartDetails[i].quantity = quantity - 1;
        this.getCartDetails[i].total = this.getCartDetails[i].quantity*this.getCartDetails[i].price
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
    this.loadCart()

  }

  cartNumber: number=0
  removeAll() {
    localStorage.removeItem('localCart')
    this.getCartDetails = []
    this.total = 0
    this.cartService.cartSubject.next(this.cartNumber)
  }

  DeleteItem(id: number) {
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')||'[]')
      for(let i=0; i < this.getCartDetails.length; i++){
        if(this.getCartDetails[i].id === id){
          this.getCartDetails.splice(i, 1);
          localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
          this.loadCart()
          this.cartService.cartNumberFunc();
        }
      }
    }
  }


}

