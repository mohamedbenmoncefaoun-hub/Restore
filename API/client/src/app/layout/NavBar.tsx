import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { DarkMode, LightMode } from'@mui/icons-material';
type props = {

  toggelDarkMode:() =>void;
  darkMode : boolean;
}


export default function NavBar({darkMode, toggelDarkMode }:props) {
  return (
    <AppBar position="fixed">
        <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
        <IconButton onClick={toggelDarkMode}>
          {darkMode?<DarkMode/>:<LightMode sx={{color:'yellow'}}/>}
        </IconButton>

        </Toolbar>

    </AppBar>
  )
}