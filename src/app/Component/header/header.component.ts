import { Component, OnInit } from '@angular/core';
import {CartService} from "../../Services/cart.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @ts-ignore

  constructor(private cartService: CartService) {
    this.cartService.cartSubject.subscribe((data)=> {
      this.cartItem = data
    })
  }
  ngOnInit(): void {

    this.cartItemFunc()

  }
  cartItem: number = 0;
  cartItemFunc(){
    this.cartService.cartNumberFunc()
  }
}
