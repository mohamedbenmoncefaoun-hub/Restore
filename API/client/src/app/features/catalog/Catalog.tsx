
import type { Product } from "../../models/product";
import ProductList from "./ProductList";

type props={
  products:Product[];
 
}

export default function Catalog({products}:props) {
  return (
    <>
    <ProductList products={products}/>
    
    </>
  )
}