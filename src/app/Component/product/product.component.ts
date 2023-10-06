import { Component, OnInit } from '@angular/core';
import {productModel, serverResponse} from "../../Model/product.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map} from "rxjs";
import {ProductService} from "../../Services/product.service";
import {CartService} from "../../Services/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 category?:string;
 products:productModel[]=[];
  constructor(private cartService: CartService,private productService: ProductService, private  route: ActivatedRoute,private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.route)
    this.route.paramMap
      .pipe(
        map((param: ParamMap) => {
          // @ts-ignore
          return param.params.cat;
        })
      ).subscribe(catName => {

      this.category = catName;
      this.productService.getProductsFromCategory(this.category || '').subscribe((prods:serverResponse) => {
        this.products = prods.products;
        this.products.forEach((a:any)=>{
          Object.assign(a,{quantity:1, total:a.price})
        });
        console.log(this.products)
      });
    });
  }


  getProdDetails(id: number) {
    this.router.navigate(['/productdetail', id]).then();
  }
  addToCart(product: productModel){
    this.cartService.AddToCart(product);
    this.cartService.cartNumberFunc();
  }
}
