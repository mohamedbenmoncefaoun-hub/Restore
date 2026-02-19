
import {decrement, increment } from "./counterRuducer"
import { Button, ButtonGroup, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function ContactPage() {
  const {data} = useAppSelector(state=> state.counter);
  const dispatch=useAppDispatch();
  return (
    <>
    <Typography variant="h2">
      Contact page
    </Typography>
    <Typography variant="body1">
      the data is:{data}
    </Typography>
    <ButtonGroup>
      <Button onClick={()=>dispatch(decrement(1))} color="error">Decrement</Button>
      <Button onClick={()=>dispatch(increment(1))} color="secondary">Increment</Button>
      <Button onClick={()=>dispatch(decrement(5))} color="error">Decrement by 5</Button>


    </ButtonGroup>
    
    </>
  )
}