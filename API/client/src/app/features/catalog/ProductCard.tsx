import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import type { Product } from "../../models/product";
import { Link } from "react-router-dom";
import { useAddBasketItemMutation } from "../basket/basketApi";
import { currencyFormat } from "../../../lib/util";

type props = {
    product: Product
}

export default function ProductCard({ product }: props) {
    const [addBasketItem, { isLoading }] = useAddBasketItemMutation();

    return (
        <Card
            sx={{
                // Change fixed width to 100% to let the Grid item control size
                width: '100%', 
                maxWidth: 345, // Optional: prevents card from getting too huge on ultra-wide containers
                mx: 'auto',    // Centers card if the container is wider than maxWidth
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%', // Ensures cards in a row have equal height
                justifyContent: 'space-between',
                transition: 'transform 0.2s', // Adds a nice hover effect
                '&:hover': { transform: 'scale(1.02)' }
            }}
            elevation={3}
        >
            <CardMedia
                sx={{ 
                    // Responsive height: smaller on mobile, larger on desktop
                    height: { xs: 180, sm: 240 }, 
                   // backgroundSize: 'contain', // Changed to contain to avoid cropping product images
                    bgcolor: 'grey.100',      // Neutral background for transparent images
                }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                    sx={{ 
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        // Truncate text if it's too long to keep card heights consistent
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                    }}
                    gutterBottom
                    variant="subtitle2"
                >
                    {product.name}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ color: 'secondary.main' }}
                >
                    {currencyFormat(product.price)}
                </Typography>
            </CardContent>
            
            <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Button
                    size="small" // Smaller buttons fit better on mobile
                    variant="contained"
                    disabled={isLoading}
                    onClick={() => addBasketItem({ product, quantity: 1 })}
                >
                    Add 
                </Button>
                <Button 
                    size="small"
                    component={Link} 
                    to={`/catalog/${product.id}`}
                >
                    View
                </Button>
            </CardActions>
        </Card>
    )
}