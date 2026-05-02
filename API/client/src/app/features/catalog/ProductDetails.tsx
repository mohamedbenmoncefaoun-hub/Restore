import { useParams } from "react-router-dom";
import Grid2 from "@mui/material/Grid2";
import { 
  Button, 
  Divider, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow, 
  TextField, 
  Typography, 
  Box,
  CircularProgress 
} from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { useAddBasketItemMutation, useFetchBasketQuery, useRemoveBasketItemMutation } from "../basket/basketApi";
import { useEffect, useState, type ChangeEvent } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  
  const item = basket?.items.find(x => x.productId === +id!);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);

  const { data: product, isLoading } = useFetchProductDetailsQuery(id ? +id : 0);

  // Improved loading state
  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress />
    </Box>
  );

  if (!product) return <Typography variant="h5">Product not found</Typography>;

  const handleUpdateBasket = () => {
    const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity;
    if (!item || quantity > item.quantity) {
      addBasketItem({ product, quantity: updatedQuantity });
    } else {
      removeBasketItem({ productId: product.id, quantity: updatedQuantity });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    if (value >= 0) setQuantity(value);
  };

  const productDetails = [
    { label: 'Name', value: product.name },
    { label: 'Description', value: product.description },
    { label: 'Type', value: product.type },
    { label: 'Brand', value: product.brand },
    { label: 'Stock', value: product.quantityInStock },
  ];

  return (
    <Grid2 container spacing={4} sx={{ mt: 2, px: { xs: 2, md: 0 } }} maxWidth="lg" mx="auto">
      {/* IMAGE SECTION: Full width on mobile (12), Half width on desktop (6) */}
      <Grid2 size={{ xs: 12, md: 6 }}>
        <img 
          src={product.pictureUrl} 
          alt={product.name} 
          style={{ width: '100%', borderRadius: '8px', display: 'block' }} 
        />
      </Grid2>

      {/* CONTENT SECTION */}
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '3rem' } }}>
          {product.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>

        <TableContainer>
          <Table sx={{ '& td': { fontSize: '1rem', py: 1.5, px: 0 } }}>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: 'bold', width: '40%' }}>{detail.label}</TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ACTIONS SECTION */}
        <Grid2 container spacing={2} sx={{ mt: 3 }}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in basket"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Button
              onClick={handleUpdateBasket}
              disabled={quantity === item?.quantity || (!item && quantity === 0)}
              sx={{ height: '55px' }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? 'Update quantity' : 'Add to basket'}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}