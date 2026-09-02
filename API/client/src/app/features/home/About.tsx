import { Box, Grid2, Typography } from "@mui/material";

export default function about() {
  return (
    <Box className="about-section"
      sx={{
        backgroundColor: "#0a0a0a", // Deep elegant black matching Screenshot 2026-06-04 213712.jpg
        color: "#ffffff",
        padding: { xs: "60px 24px", md: "100px 80px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}
     
    >
      <Grid2 container spacing={{ xs: 4, md: 8 }} sx={{ maxWidth: "1200px", alignItems: "center" }}>
        
        {/* Left Side: Image with rounded corners */}
        <Grid2 size={{ xs: 12, md: 6 }} className="animate-on-scroll left-reveal">
          <Box
            component="img"
            src="/images/jj.png" // Swap with your actual image path
            alt="Barbering craft"
            sx={{
              width: "100%",
              height: { xs: "350px", sm: "450px", md: "500px" },
              objectFit: "cover",
              borderRadius: "16px", // Rounded edge as seen in Screenshot 2026-06-04 213712.jpg
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
            }}
          />
        </Grid2>

        {/* Right Side: Copywriting & Stats */}
        <Grid2 size={{ xs: 12, md: 6 }} className="animate-on-scroll right-reveal">
          <Box>
            <Typography className="about-tagline" variant="subtitle2">
              WHO WE ARE
            </Typography>

            <Typography className="about-title" variant="h3">
              More Than Just <br />
              <span className="italic-gold">A Haircut</span>
            </Typography>

            <Typography className="about-description">
              At Jamel's Barbershop, we strive to create the modern barbershop look and feel 
              with the highest level of skill, service and style to keep you looking and 
              feeling your best. Every visit is an experience crafted with care, precision, 
              and a genuine passion for the craft.
            </Typography>

            {/* Stats Row */}
            <Box className="stats-container">
              <Box className="stat-item">
                <Typography className="stat-number">10+</Typography>
                <Typography className="stat-label">Years Experience</Typography>
              </Box>

              <Box className="stat-item divider">
                <Typography className="stat-number">5000+</Typography>
                <Typography className="stat-label">Happy Clients</Typography>
              </Box>

              <Box className="stat-item divider">
                <Typography className="stat-number">Est.</Typography>
                <Typography className="stat-label">Prague 2018</Typography>
              </Box>
            </Box>
          </Box>
        </Grid2>

      </Grid2>
    </Box>
  )
}