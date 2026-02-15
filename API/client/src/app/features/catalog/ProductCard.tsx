import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import type { Product } from "../../models/product";

type props ={

    product:Product
}


export default function ProductCard({product}:props) {
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
            ${(product.price/100).toFixed(2)}
        </Typography>
        <CardActions
        sx={{justifyContent:'space-between'}}
        >
            <button>Add to Card</button>
            <button>View</button>

        </CardActions>
     </CardContent>

    </Card>
  )
}