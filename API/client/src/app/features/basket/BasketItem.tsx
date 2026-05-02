import { Box, Grid2, IconButton, Paper, Typography } from "@mui/material";
import type { Item } from "../../models/Basket";
import { Add, Close, Remove } from "@mui/icons-material";
import { useAddBasketItemMutation, useRemoveBasketItemMutation } from "./basketApi";
import { currencyFormat } from "../../../lib/util";

type Props = {
    item: Item;
};

export default function BasketItem({ item }: Props) {
    const [removeBasketItem] = useRemoveBasketItemMutation();
    const [addBasketItem] = useAddBasketItemMutation();

    return (
        <Paper
            sx={{
                borderRadius: 3,
                display: 'flex',
                // Stack vertically on extra-small screens, horizontally on small+
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                mb: 2,
                p: 2, // Added padding for better mobile spacing
                position: 'relative'
            }}
        >
            <Box
                display='flex'
                flexDirection={{ xs: 'row', sm: 'row' }}
                alignItems='center'
                sx={{ width: '100%' }}
            >
                <Box
                    component='img'
                    src={item.pictureUrl}
                    alt={item.name}
                    sx={{
                        width: { xs: 80, sm: 100 },
                        height: { xs: 80, sm: 100 },
                        objectFit: 'cover',
                        borderRadius: '8px',
                        mr: { xs: 2, sm: 4 }, // Reduced margin for mobile
                    }}
                />

                <Box display='flex' flexDirection='column' gap={0.5} sx={{ flexGrow: 1 }}>
                    <Typography 
                        variant="h6" 
                        sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 'bold' }}
                    >
                        {item.name}
                    </Typography>

                    <Box display='flex' flexWrap='wrap' alignItems='center' gap={1}>
                        <Typography variant="body2" color="text.secondary">
                            {currencyFormat(item.price)} x {item.quantity}
                        </Typography>
                        <Typography variant="subtitle1" color='primary' fontWeight="bold">
                            {currencyFormat(item.price * item.quantity)}
                        </Typography>
                    </Box>

                    {/* Quantity Controls */}
                    <Box display="flex" alignItems="center" gap={2} mt={1}>
                        <IconButton
                            onClick={() => removeBasketItem({ productId: item.productId, quantity: 1 })}
                            color="error"
                            size="small"
                            sx={{ border: 1, borderRadius: 1 }}
                        >
                            <Remove fontSize="small" />
                        </IconButton>

                        <Typography variant="h6">{item.quantity}</Typography>

                        <IconButton
                            onClick={() => addBasketItem({ product: item, quantity: 1 })}
                            color="success"
                            size="small"
                            sx={{ border: 1, borderRadius: 1 }}
                        >
                            <Add fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            {/* Remove All Button */}
            <IconButton
                onClick={() => removeBasketItem({ productId: item.productId, quantity: item.quantity })}
                color='error'
                size="small"
                sx={{
                    position: { xs: 'absolute', sm: 'static' },
                    top: 8,
                    right: 8,
                    border: 1,
                    borderRadius: 1,
                    alignSelf: { xs: 'flex-start', sm: 'center' }
                }}
            >
                <Close fontSize="small" />
            </IconButton>
        </Paper>
    );
}