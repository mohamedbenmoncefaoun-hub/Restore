import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Review from "./Review";
import { useFetchAddressQuery, useUpdateUserAddressMutation } from "../account/accountApi";
import type { Address } from "../../models/user";
import type { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { useBasket } from "../../../lib/hooks/useBasket";
import { currencyFormat } from "../../../lib/util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const steps = ['Address', 'Payment','Review'];
export default function CheckoutStepper() {
    const [activeStep, setActiveStep] = useState(0);
   // const{data:{name, ...restAddress}={}as Address}=useFetchAddressQuery();
const { data } = useFetchAddressQuery();
const { name, ...restAddress } = data ?? ({} as Address);
const [updateAddress] = useUpdateUserAddressMutation();
const[savedAddressChecked, setSavedAddressChecked]=useState(false);
const elements = useElements();
const [addressComplete, setAddressComplete]=useState(false);
const [paymentComplete, setPaymentComplete]=useState(false);
const{ total}=useBasket();
const stripe=useStripe();
const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);
const [submitting, setSubmitting]=useState(false);
const {basket, clearBasket}=useBasket();
const navigate = useNavigate();


    const handleNext = async () => {
        if(activeStep === 0 && savedAddressChecked&& elements){
            const address = await getStripeAddress();
            if(address) await updateAddress(address);
        }

        if(activeStep === 1){
            if(!stripe || !elements) return;
            const result = await elements.submit();
            if(result.error) return toast.error(result.error.message);
            const stripeResult = await stripe.createConfirmationToken({elements});
            if(stripeResult.error) return toast.error(stripeResult.error.message);
            setConfirmationToken(stripeResult.confirmationToken);
        
        }
        if (activeStep === 2){
            await confirmPayment();
            } 
       if(activeStep<2) setActiveStep(step=> step + 1);
    
    }
    const confirmPayment = async () => {
        setSubmitting(true);
    try {
        if(!confirmationToken||!basket?.clientSecret) 
            throw new Error('Unable to process payment');

        const paymentResult = await stripe?.confirmPayment({
            clientSecret: basket.clientSecret,
            redirect: 'if_required',
            confirmParams:{
                confirmation_token: confirmationToken.id
            }
        });
        if(paymentResult?.paymentIntent?.status === 'succeeded'){
        navigate('/checkout/success');
        clearBasket();
        
        } else if(paymentResult?.error) {
         throw new Error(paymentResult.error.message);   
        } else {
         throw new Error('Something went wrong ');   
        }
    } catch (error) {
        if(error instanceof Error){
        toast.error(error.message);
        }
        setActiveStep(step => step - 1);
    } finally{
    setSubmitting(false);
    }
    
    
    }
    const getStripeAddress= async () =>{
        const addressElement = elements?.getElement('address');
        if(!addressElement) return null;
        const{value:{name, address}}= await addressElement.getValue();
        if(name && address) return {...address, name}
        return null;
}


    const handleBack = () => {
        setActiveStep(step=> step - 1);
    }

    const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    
    setAddressComplete(event.complete);
    }
     const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    
    setPaymentComplete(event.complete);
    }




  return (
   <Paper sx={{ p: 3,borderRadius: 3 }}>
    <Stepper activeStep={activeStep} >
        {steps.map((label, index) =>{
            return (
             <Step key={index}>
                <StepLabel>{label}</StepLabel>
             </Step>

            )

        })}
        
    </Stepper>
    <Box sx={{ mt: 2 }}>
     <Box sx={{ display: activeStep === 0 ? 'block' : 'none' }}>
     <AddressElement 
         options={{
            mode:'shipping',
            defaultValues: {
                name: name,
                address: restAddress
            }
         }}
       onChange={handleAddressChange}
     
     />
     <FormControlLabel 
                      
        sx={{ display: 'flex', justifyContent: 'end' }}  
        control={<Checkbox
        checked={savedAddressChecked}
        onChange={(e) => setSavedAddressChecked(e.target.checked)}
        />}  
        label='Save as default address'            
                      
                      />
     </Box>
      <Box sx={{ display: activeStep === 1 ? 'block' : 'none' }}>
      <PaymentElement
       onChange={handlePaymentChange}
       options={{
        wallets:{
            applePay:'never',
            googlePay:'never'
        }
       }}
       />
     </Box>
      <Box sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
      <Review confirmationToken={confirmationToken} />
     </Box>
     </Box>
        <Box display='flex' paddingTop={2} justifyContent = 'space-between'>
            <Button onClick={handleBack} >Back</Button>
            <LoadingButton
             onClick={handleNext}
            disabled={
                (activeStep === 0 && !addressComplete) ||
                 (activeStep === 1 && !paymentComplete)||
                    submitting
                }
                loading={submitting}
            >
                {activeStep === steps.length - 1 ? `Pay ${currencyFormat(total)}` : 'Next'}
            </LoadingButton>
        </Box>
   </Paper>
  )
}

function useUpdateAddressMutation(): [any] {
    throw new Error("Function not implemented.");
}

