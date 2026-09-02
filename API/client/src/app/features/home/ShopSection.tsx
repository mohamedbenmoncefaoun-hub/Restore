import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2"; // Matching your modern Grid2 usage
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Dummy data for premium grooming products
const PRODUCTS = [
  {
    id: 1,
    title: "Premium Matte Clay",
    price: "$28.00",
    oldPrice: "$34.00",
    image: "/images/product-clay.jpg", // Replace with your image paths
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Sandalwood Beard Oil",
    price: "$24.00",
    image: "/images/product-oil.jpg",
    badge: "100% Organic",
  },
  {
    id: 3,
    title: "Classic Sandalwood Cologne",
    price: "$65.00",
    image: "/images/product-cologne.jpg",
    badge: "New Arrival",
  },
];

// Dummy data for gift cards / promotional vouchers
const VOUCHERS = [
  {
    id: 1,
    title: "The Ultimate Grooming Gift Card",
    value: "$50",
    code: "GIFT50",
    description: "Perfect for birthdays or special celebrations. Valid for all cuts and treatments.",
  },
  {
    id: 2,
    title: "First-Time Client Special",
    value: "15% OFF",
    code: "WELCOME15",
    description: "Get a sweet discount on your first visit. Applicable on any service or retail item.",
  },
];

export default function ShopSection() {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Promo code "${code}" copied to clipboard!`);
  };

  return (
    <Box
      className="shop-section"
      sx={{
        backgroundColor: "#0a0a0a", // Deep elegant black matching your theme
        color: "#ffffff",
        padding: { xs: "60px 20px", sm: "80px 40px", md: "100px 80px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* SECTION HEADER */}
      <Box sx={{ textAlign: "center", marginBottom: { xs: "50px", md: "70px" }, maxWidth: "600px" }}>
        <Typography className="services-tagline" variant="subtitle2">
          RETAIL & GIFTS
        </Typography>
        <Typography className="services-main-title" variant="h3" sx={{ mt: 1 }}>
          Elevate Your <span className="italic-gold">Daily Routine</span>
        </Typography>
        <Typography className="services-desc" sx={{ mt: 2, color: "#aaaaaa" }}>
          Take the barbershop experience home with our curated signature products, or gift an exclusive experience to someone who appreciates looking sharp.
        </Typography>
      </Box>

      {/* 1. VOUCHERS SUBSECTION */}
      <Box sx={{ width: "100%", maxWidth: "1200px", mb: 8 }}>
        <Typography variant="h5" sx={{ mb: 4, fontFamily: "serif", letterSpacing: "1px", color: "#d4af37" }}>
          Exclusive Gift Cards & Vouchers
        </Typography>
        <Grid container spacing={4}>
          {VOUCHERS.map((voucher) => (
            <Grid size={{ xs: 12, md: 6 }} key={voucher.id}>
              <Box
                sx={{
                  border: "2px dashed #333333",
                  borderRadius: "16px",
                  padding: "30px",
                  backgroundColor: "#111111",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 3,
                  position: "relative",
                  transition: "border-color 0.3s ease",
                  "&:hover": {
                    borderColor: "#d4af37", // Shifts border color to match your gold accents
                  },
                }}
              >
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: "900", color: "#d4af37" }}>
                    {voucher.value}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1, fontSize: "1.1rem" }}>
                    {voucher.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaaaaa", mt: 1 }}>
                    {voucher.description}
                  </Typography>
                </Box>
                <Button
                  className="btn-outline"
                  variant="outlined"
                  onClick={() => handleCopyCode(voucher.code)}
                  sx={{
                    whiteSpace: "nowrap",
                    borderColor: "#d4af37",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#d4af37", color: "#000000" },
                  }}
                >
                  Code: {voucher.code}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 2. PRODUCTS SUBSECTION */}
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        <Typography variant="h5" sx={{ mb: 4, fontFamily: "serif", letterSpacing: "1px", color: "#d4af37" }}>
          Signature Premium Products
        </Typography>
        <Grid container spacing={4}>
          {PRODUCTS.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <Box
                sx={{
                  backgroundColor: "#0f0f0f",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #1a1a1a",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.7)",
                  },
                }}
              >
                {/* Product Image Area */}
                <Box
                  sx={{
                    height: "280px",
                    backgroundColor: "#161616",
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Fallback Label if your image fails to load */}
                  {!product.image && <Typography sx={{ color: "#444" }}>Product Photo</Typography>}
                  
                  {product.badge && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 15,
                        left: 15,
                        backgroundColor: "#d4af37",
                        color: "#000000",
                        padding: "4px 10px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {product.badge}
                    </Box>
                  )}
                </Box>

                {/* Card Info Details */}
                <Box sx={{ padding: "24px" }}>
                  <Typography variant="h6" sx={{ fontWeight: "600", mb: 1, minHeight: "56px" }}>
                    {product.title}
                  </Typography>
                  
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 3 }}>
                    <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold", color: "#ffffff" }}>
                      {product.price}
                    </Typography>
                    {product.oldPrice && (
                      <Typography sx={{ textDecoration: "line-through", color: "#666666", fontSize: "0.95rem" }}>
                        {product.oldPrice}
                      </Typography>
                    )}
                  </Box>

                  <Button
                    className="btn-primary"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#d4af37", color: "#000000" },
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}