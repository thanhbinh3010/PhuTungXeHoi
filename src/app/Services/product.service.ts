import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {productModel, serverResponse} from "../Model/product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // @ts-ignore
 private url:"/api";
  constructor(
    private http:HttpClient
  ) {
  }
  getAllProd(limitOfResults=9): Observable<serverResponse>{
    return this.http.get<serverResponse>("  /api" + "/products", {
      params: {
        limit: limitOfResults.toString()
      }
    });

  }getSingleProduct(id: Number): Observable<productModel> {
    return this.http.get<productModel>("/api" + '/products/' + id);
  }

  getProductsFromCategory(catName: String): Observable<serverResponse> {
    return this.http.get<serverResponse>("/api" + '/products/category/' + catName);
  }
}
