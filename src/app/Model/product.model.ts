export interface productModel{
  category:string;
  name:string;
  price:number;
  quantity:number;
  image:string;
  id:number;
  description:string;
}
export interface serverResponse{
  count:number;
  products: productModel[];

}
