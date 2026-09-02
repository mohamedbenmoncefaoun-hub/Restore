
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useAppSelector } from "../store/store";


function App() {
 
 const {darkMode}= useAppSelector(state=>state.ui);
 const paletteType = darkMode? 'dark':'light'
 const theme= createTheme({
  palette:{
    mode:paletteType,
    background:{
      default:(paletteType==='dark')?'#1a1d20':'#f0f9ff'
    }
  }
 })
 
 
 return (
    <ThemeProvider theme={theme}>
      <ScrollRestoration />
      <CssBaseline/>
    <NavBar />
    <Box
    sx={{
      minHeight:'100vh',
      background: darkMode 
      ? 'radial-gradient(circle, #2d2c2a 0%, #1a1918 100%);'
      :'radial-gradient(circle, #2d2c2a 0%, #1a1918 100%);',
      py: 6
    }}
    >
 <Container maxWidth='xl' sx={{mt: 1}}>
< Outlet />
 </Container>

    </Box>

 </ThemeProvider>
  )
}

export default App
