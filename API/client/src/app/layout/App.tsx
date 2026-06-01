
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
      ? 'radial-gradient( #2d2a2a)'
      :'radial-gradient( #383a3b)',
      py: 6
    }}
    >
 <Container maxWidth='xl' sx={{mt: 8}}>
< Outlet />
 </Container>

    </Box>

 </ThemeProvider>
  )
}

export default App
