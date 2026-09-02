import { Box, Button, Typography } from "@mui/material";

export default function Slider() {
  return (
     <Box 
      className="home"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.75)), url('/images/home.png')",
        backgroundSize: "cover",
        //backgroundPosition: "center",
        //backgroundAttachment: "fixed",
        backgroundAttachment: { xs: "scroll", md: "fixed" },
        padding: { xs: "10px", md: "40px" },
      }}
    >
      <Box className="hero-content">
        <Typography className="hero-subtitle" variant="subtitle1">
          ESTD. 2018 — PRAGUE, CZECH REPUBLIC
        </Typography>

        <Typography className="hero-title" variant="h1">
          JAMEL'S
        </Typography>

        <Typography className="hero-script" variant="h2">
          Barbershop
        </Typography>

        <Box className="hero-buttons">
          <Button className="btn-primary" variant="contained">
            Book Appointment
          </Button>
          <Button className="btn-outline" variant="outlined">
            View Services
          </Button>
        </Box>
      </Box>
      </Box>
  )
}