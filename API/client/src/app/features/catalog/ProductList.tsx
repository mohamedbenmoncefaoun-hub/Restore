import { Grid2 } from "@mui/material"
import type { Product } from "../../models/product"
import ProductCard from "./ProductCard"

type props = {
  products: Product[]
}

export default function ProductList({ products }: props) {
  return (
    <Grid2 container spacing={{ xs: 1, sm: 2, md: 3 }}> 
      {products.map(product => (
        /* xs: 6 makes it 2 items per row on mobile */
        <Grid2 size={{ xs: 6, sm: 6, md: 3 }} display='flex' key={product.id}>
          <ProductCard product={product} />
        </Grid2>
      ))}
    </Grid2>
  )
}