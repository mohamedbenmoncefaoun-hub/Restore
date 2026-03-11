import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import type { Product } from "../../models/product";
import { Link } from "react-router-dom";
import { useAddBasketItemMutation } from "../basket/basketApi";
import { currencyFormat } from "../../../lib/util";

type props ={

    product:Product
}


export default function ProductCard({product}:props) {
    const[addBasketItem, {isLoading}]=useAddBasketItemMutation();
  return (
    < Card 
    sx={{
        width:280,
        borderRadius:2,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    }}
    elevation={3}>
      <CardMedia
         sx={{height:240, backgroundSize:'cover'}}
         image={product.pictureUrl}
         title={product.name}
         />
     <CardContent>
        <Typography 
        sx={{textTransform:'uppercase'}}
        gutterBottom variant="subtitle2">
         {product.name}
        </Typography>
        <Typography
        variant="h6"
        sx={{color:'secondary.main'}}
        >
            {currencyFormat(product.price)}
        </Typography>
        <CardActions
        sx={{justifyContent:'space-between'}}
        >
            <Button
            disabled= {isLoading}
             onClick={()=>addBasketItem({product, quantity:1})}>Add to Card</Button>
            <Button component={Link} to={`/catalog/${product.id}`}>View</Button>

        </CardActions>
     </CardContent>

    </Card>
  )
}