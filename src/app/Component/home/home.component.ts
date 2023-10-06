import { Component, OnInit } from '@angular/core';
import {productModel, serverResponse} from "../../Model/product.model";
import {ProductService} from "../../Services/product.service";
import {Router} from "@angular/router";
import {CartService} from "../../Services/cart.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  prodData:productModel[] =[];
  constructor(private prodService:ProductService, private route:Router,private cartService: CartService) { }

  ngOnInit(): void {
  this.prodService.getAllProd().subscribe((prod:serverResponse)=>{
    this.prodData = prod.products;
    this.prodData.forEach((a:any)=>{
      Object.assign(a,{quantity:1})});
    console.log(this.prodData)
  });
  }

  selectProduct(id: Number) {
    this.route.navigate(['/product', id]).then()
  }

  getProdDetails(id: number) {
    this.route.navigate(['/productdetail', id]).then();
  }
  addToCart(p: productModel) {
    this.cartService.AddToCart(p);
    this.cartService.cartNumberFunc();
  }



}
