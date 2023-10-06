import { Component, OnInit } from '@angular/core';
import {map} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {productModel, serverResponse} from "../../Model/product.model";
import {ProductService} from "../../Services/product.service";
import {CartService} from "../../Services/cart.service";


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id?:number
  product?: any
  constructor(private route:ActivatedRoute, private productService: ProductService,private cartService:CartService ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
        map((param: ParamMap) => {
          // @ts-ignore
          return param.params.id;
        })
      ).subscribe(id => {

      this.id = id;
      // @ts-ignore
      this.productService.getSingleProduct(this.id || 0).subscribe((prod:serverResponse) => {
        this.product = prod;
        this.product.forEach((a:any)=>{
          Object.assign(a,{quantity:1, total:this.product.price})
        });
        console.log(this.product)
      });
    });

  }
  addToCart(product: productModel){
    this.cartService.AddToCart(product);
    this.cartService.cartNumberFunc();
  }

}
