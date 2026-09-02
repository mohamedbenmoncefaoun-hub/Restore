import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2"; // MUI's updated, performance-optimized grid
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Dummy data for your premium barbershop services
const SERVICES = [
  {
    id: 1,
    title: "Elegance Complete",
    price: "1250 CK",
    duration: "1 Hour",
    description: "Full haircut & beard styling experience",
    image: "/images/s1.jpg", // Replace with your image paths
  },
  {
    id: 2,
    title: "Luxury Beard Trim",
    price: "$35",
    duration: "30 Mins",
    description: "Beard shaping and lining with premium oils, hot towel treatment, and a precise straight razor finish.",
    image: "/images/service-beard.jpg",
  },
  {
    id: 3,
    title: "The Royal Shave",
    price: "$60",
    duration: "45 Mins",
    description: "Traditional hot lather wet shave experience featuring essential pre-shave oils and an ice-cold towel refresh.",
    image: "/images/service-shave.jpg",
  },
];

export default function ServicesSection() {
  return (
    <Box
      className="services-section"
      sx={{
        backgroundColor: "#0f0f0f", // Dark, atmospheric background
        color: "#ffffff",
        padding: { xs: "60px 20px", sm: "80px 40px", md: "100px 80px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Section Header */}
      <Box sx={{ textAlign: "center", marginBottom: { xs: "40px", md: "60px" }, maxWidth: "600px" }}>
        <Typography className="services-tagline" variant="subtitle2">
          OUR SERVICES
        </Typography>
        <Typography className="services-main-title" variant="h3">
          Crafted Men's <span className="italic-gold">Grooming</span>
        </Typography>
        <Typography className="services-desc">
          We combine classic old-school barbering traditions with modern styling trends to deliver elite results.
        </Typography>
      </Box>

      {/* Services Grid */}
      <Grid container spacing={4} sx={{ width: "100%", maxWidth: "1200px" }}>
        {SERVICES.map((service) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
            <Box className="service-card">
              {/* Background Image Container */}
              <Box
                className="service-card-image"
                sx={{
                  background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url(${service.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Card Static Content */}
              <Box className="service-card-content">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 1 }}>
                  <Typography className="service-title" variant="h5">
                    {service.title}
                  </Typography>
                  <Typography className="service-price">
                    {service.price}
                  </Typography>
                </Box>
                <Typography className="service-duration">
                  {service.duration}
                </Typography>
              </Box>

              {/* Card Hover Overlay (Reveals details smoothly) */}
              <Box className="service-card-overlay">
                <Typography className="overlay-title" variant="h5">
                  {service.title}
                </Typography>
                <Typography className="overlay-price">{service.price}</Typography>
                <Typography className="overlay-desc">{service.description}</Typography>
                <Button className="btn-primary-sm" variant="contained">
                  Book Now
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}