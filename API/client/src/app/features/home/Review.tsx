import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

// 1. Get your Direct Google Review URL from your Google Business Profile dashboard
const GOOGLE_MAPS_REVIEWS_URL = "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID";
const GOOGLE_PROFILE_MAIN_URL = "https://google.com/maps?cid=YOUR_BUSINESS_CID";

const REVIEWS = [
  {
    id: 1,
    name: "Alexandre M.",
    date: "2 days ago",
    rating: 5,
    text: "Hands down the best haircut in Prague. Jamel's attention to detail is unmatched. The atmosphere is top-tier, and the hot towel finish is pure luxury.",
    avatar: "/images/avatar1.jpg",
  },
  {
    id: 2,
    name: "Lukas K.",
    date: "1 week ago",
    rating: 5,
    text: "Excellent service. They really take their time to understand what you want. My beard trim was immaculate. Highly recommend this premium spot.",
    avatar: "/images/avatar2.jpg",
  },
  {
    id: 3,
    name: "David P.",
    date: "3 weeks ago",
    rating: 5,
    text: "A truly professional experience from start to finish. The booking process is smooth, the staff is incredibly skilled, and the shop design is stunning.",
    avatar: "/images/avatar3.jpg",
  },
];

export default function ReviewsSection() {
  return (
    <Box
      className="reviews-section"
      sx={{
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        padding: { xs: "60px 20px", sm: "80px 40px", md: "100px 80px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Section Header */}
      <Box sx={{ textAlign: "center", marginBottom: { xs: "40px", md: "50px" }, maxWidth: "600px" }}>
        <Typography className="reviews-tagline" variant="subtitle2">
          REVIEWS
        </Typography>
        <Typography className="reviews-main-title" variant="h3">
          What Our <span className="italic-gold">Clients Say</span>
        </Typography>
        
        {/* Google Score Summary Banner */}
        <Box className="google-summary">
          <Typography className="google-rating">4.9</Typography>
          <Box className="stars-row" sx={{ mx: 1.5 }}>
            {"★".repeat(5)}
          </Box>
          
        </Box>
      </Box>

      {/* Reviews Cards Grid */}
      <Grid container spacing={4} sx={{ width: "100%", maxWidth: "1200px", mb: 6 }}>
        {REVIEWS.map((review) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={review.id}>
            {/* Clicking anywhere on the card opens your main business location reviews */}
            <Box 
              className="review-card"
              component="a"
              href={GOOGLE_PROFILE_MAIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none", display: "block" }} 
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar 
                  src={review.avatar} 
                  alt={review.name}
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    border: "1px solid #d4a03c",
                    bgcolor: "#1a1a1a",
                    color: "#d4a03c"
                  }}
                >
                  {review.name[0]}
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography className="review-author" variant="subtitle1">
                    {review.name}
                  </Typography>
                  <Typography className="review-date">
                    {review.date}
                  </Typography>
                </Box>
              </Box>

              <Box className="stars-row card-stars" sx={{ mb: 2 }}>
                {"★".repeat(review.rating)}
              </Box>

              <Typography className="review-text">
                "{review.text}"
              </Typography>

              <Box className="google-watermark">G</Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Interactive Action Buttons directly tied to Google Account */}
      <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        <Button 
          className="btn-primary" 
          variant="contained"
          component="a"
          href={GOOGLE_MAPS_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Leave A Google Review
        </Button>
        <Button 
          className="btn-outline" 
          variant="outlined"
          component="a"
          href={GOOGLE_PROFILE_MAIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          See All Reviews on Google
        </Button>
      </Box>
    </Box>
  );
}