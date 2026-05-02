import { Grid2, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi";
import BasketItem from "./BasketItem";
import OrderSummary from "../../shared/components/OrderSummary";

export default function BasketPage() {
  const { data, isLoading } = useFetchBasketQuery();

  if (isLoading) return <Typography>Loading basket...</Typography>;

  if (!data || data.items.length === 0) {
    return <Typography variant="h3">Your basket is empty</Typography>;
  }

  return (
    <Grid2 container spacing={3}>
      {/* On extra-small (mobile), size is 12 (full width).
          On medium screens and up, size is 8.
      */}
      <Grid2 size={{ xs: 12, md: 8 }}>
        {data.items.map((item) => (
          <BasketItem item={item} key={item.productId} />
        ))}
      </Grid2>

      {/* On extra-small (mobile), size is 12 (stacks below).
          On medium screens and up, size is 4.
      */}
      <Grid2 size={{ xs: 12, md: 4 }}>
        <OrderSummary />
      </Grid2>
    </Grid2>
  );
}