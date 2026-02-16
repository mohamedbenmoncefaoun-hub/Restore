import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { DarkMode, LightMode, ShoppingCart } from'@mui/icons-material';
import { NavLink } from "react-router-dom";

const midLink =[
  {title:'catalog',path:'/catalog'},
  {title:'about',path:'/about'},
  {title:'contact',path:'/contact'},
]
const rightLink =[
  {title:'login',path:'/login'},
  {title:'register',path:'/register'},
 
]
const navStyles={color:'inherit',typography:'h6', textDecoration:'none','&:hover':{color:'grey.500'},
      '&.active':{color:'#baecf9'}
      }

type props = {

  toggelDarkMode:() =>void;
  darkMode : boolean;
}


export default function NavBar({darkMode, toggelDarkMode }:props) {
  return (
    <AppBar position="fixed">
        <Toolbar sx={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
          <Box display='flex' alignItems='center'>
        <Typography component={NavLink} to='/'sx={navStyles} variant="h6">RE-STORE</Typography>
        <IconButton onClick={toggelDarkMode}>
          {darkMode?<DarkMode/>:<LightMode sx={{color:'yellow'}}/>}
        </IconButton>
          </Box>
       
        <List sx={{display:'flex'}}>
        {midLink.map(({title,path})=>(
        <ListItem
        component={NavLink}
        to={path}
        key={path}
        sx={navStyles}
        >
          {title.toUpperCase()}
        </ListItem>
        
       ) )}
        </List>
        <Box display='flex' alignItems={"center"}>
<IconButton size="large"sx={{color:'inherit'}}>
          <Badge badgeContent='4' color="secondary">
            <ShoppingCart/>

          </Badge>

        </IconButton>
        <List sx={{display:'flex'}}>
        {rightLink.map(({title,path})=>(
        <ListItem
        component={NavLink}
        to={path}
        key={path}
        sx={navStyles}
        >
          {title.toUpperCase()}
        </ListItem>
        
       ) )}
        </List>
          
        </Box>
        
       
        

        </Toolbar>

    </AppBar>
  )
}