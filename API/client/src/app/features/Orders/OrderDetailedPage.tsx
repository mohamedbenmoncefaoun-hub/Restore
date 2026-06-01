import { Link, useParams } from "react-router-dom";
import { useFetchOrderDetailedQuery } from "./OrderApi";
import Typography from "@mui/material/Typography/Typography";
import Card from "@mui/material/Card/Card";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider/Divider";
import { format } from "date-fns";

import { currencyFormat, formatAddressString, formatPaymentString } from "../../../lib/util";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

export default function OrderDetailedPage() {
 
 const{id}=useParams();
 const {data:order, isLoading}=useFetchOrderDetailedQuery(+id!);
 if(isLoading) return <Typography variant="h5" >Loading order...</Typography>
 if(!order) return <Typography variant="h5" >Order not found</Typography>
    return (
 
       <Card sx={{p:2,maxWidth:'md',mx:'auto'}}>
        <Box display='flex'justifyContent='space-between' alignItems='center' >
         <Typography variant="h5" align='center'>
            Order summary for #{order.id}
         </Typography>
         <Button component={Link} to='/orders' variant="outlined">
            Back to orders
         </Button>
        </Box>
        <Divider sx={{my:2}}/>
        <Box>
            <Typography variant="h6" fontWeight='bold'>
                Billing and delivery information
            </Typography>
            <Box component='dl'>
                <Typography component='dt' fontWeight='500' variant="subtitle1">
                    Shipping address
                </Typography>
                  <Typography component='dd' fontWeight='300'variant="body2">
                    {formatAddressString(order.shippingAddress)}
                </Typography>
            </Box>
            <Box component='dl'>
                <Typography component='dt' fontWeight='500' variant="subtitle1">
                   Payment info
                </Typography>
                  <Typography component='dd' fontWeight='300'variant="body2">
                    {formatPaymentString(order.paymentSummary)}
                </Typography>
            </Box>
        </Box>
        <Divider sx={{my:2}} />
        <Box>
            <Typography variant="h6" fontWeight='bold'>
                Order details
            </Typography>
              <Box component='dl'>
                <Typography component='dt' fontWeight='500' variant="subtitle1">
                    Email address
                </Typography>
                  <Typography component='dd' fontWeight='300'variant="body2">
                    {order.buyerEmail}
                </Typography>
            </Box>
            <Box component='dl'>
                <Typography component='dt' fontWeight='500' variant="subtitle1">
                   Order status
                </Typography>
                  <Typography component='dd' fontWeight='300'variant="body2">
                    {order.orderStatus}
                </Typography>
            </Box>
                <Box component='dl'>
                <Typography component='dt' fontWeight='500' variant="subtitle1">
                   Order date
                </Typography>
                  <Typography component='dd' fontWeight='300'variant="body2">
                    {format(order.orderDate, 'dd MMM yyyy')}
                </Typography>
            </Box>

        </Box>
        <Divider sx={{my:2}} />
        <TableContainer>
            <Table>
              <TableBody>
                {order?.orderItems.map(item => (
                  <TableRow key={item.productId}
                  sx ={{borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
                   <TableCell sx={{py:4}}>
                    <Box display='flex' gap={3} alignItems='center'>
                      <img src={item.pictureUrl}
                       alt={item.name}
                       style={{width:60, height:60}}
                        />
                        <Typography>
                          {item.name}
                        </Typography>
                      </Box>
                      </TableCell>
                      <TableCell align="center" sx={{p:4}}>
                        x{item.quantity}
                        </TableCell>
                        <TableCell align="right" sx={{p:4}}>
                        {currencyFormat(item.price)}
                        </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>

            </TableContainer>
             <Box mx={3} > 
              <Box component='dl'display='flex' justifyContent='space-between'  >
                <Typography component='dt' fontWeight='500' variant="subtitle1">
                   Subtotal
                </Typography>
                  <Typography component='dd' fontWeight='300'variant="body2">
                    {currencyFormat(order.subtotal)}
                </Typography>
            
            </Box>
            <Box>
              <Box component='dl'display='flex' justifyContent='space-between'  >
                <Typography component='dt' fontWeight='500' variant="subtitle1">
                   Discount
                </Typography>
                  <Typography component='dd' fontWeight='300'variant="body2" color="green">
                    {currencyFormat(order.discount)}
                </Typography>
            </Box>
              <Box component='dl'display='flex' justifyContent='space-between'  >
                <Typography component='dt' fontWeight='500' variant="subtitle1">
                   Delivery fee
                </Typography>
                  <Typography component='dd' fontWeight='300'variant="body2">
                    {currencyFormat(order.deliveryFee)}
                </Typography>
            
            </Box>
   
            </Box>
                 <Box component='dl'display='flex' justifyContent='space-between'  mx={3}>
                <Typography component='dt' fontWeight='500' variant="subtitle1">
                   Total
                </Typography>
                  <Typography component='dd' fontWeight='700'variant="body2">
                    {currencyFormat(order.total)}
                </Typography>
            
            </Box>
            </Box>
       </Card>
  )
}