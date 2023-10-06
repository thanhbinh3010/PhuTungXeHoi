import { Component, OnInit } from '@angular/core';
import {productModel, serverResponse} from "../../Model/product.model";
import {Router} from "@angular/router";
import {ProductService} from "../../Services/product.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: productModel[] = [];
  constructor(private productService: ProductService, private router: Router) {

  }

  ngOnInit(): void {
    this.productService.getAllProd().subscribe((prods: serverResponse) => {
      this.products = prods.products;
      this.products.forEach((a:any)=>{
        Object.assign(a,{quantity:1})
      });
      console.log(this.products);
    });
  }


  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then()
  }


}
