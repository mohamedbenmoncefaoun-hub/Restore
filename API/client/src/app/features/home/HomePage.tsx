
import Box from "@mui/material/Box";

import Slider from "./Slider";
import About from "./About";
import ServicesSection from "./ServicesSection";
import Review from "./Review";
import ShopSection from "./ShopSection";

export default function HomePage() {
  return (
   <Box>
   <Slider/>
    <Box ><About/></Box>
    <Box><ServicesSection/></Box>
    <Box><Review/></Box>
    <Box><ShopSection/></Box>
   </Box>
      
    
    
  );
}