import { 
  AppBar, Badge, Box, IconButton, LinearProgress, 
  List, ListItem, Toolbar, Typography, Fade, 
  Drawer, Divider, ListItemText
} from "@mui/material";
import { DarkMode, LightMode, Menu as MenuIcon, ShoppingCart } from "@mui/icons-material";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";
import { useFetchBasketQuery } from "../features/basket/basketApi";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../features/account/accountApi";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": { color: "grey.500" },
  "&.active": { color: "#baecf9" },
};

export default function NavBar() {
  const { data: user } = useUserInfoQuery();
  const { isLoading, darkMode } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { data: basket } = useFetchBasketQuery();
  const [mobileOpen, setMobileOpen] = useState(false);

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // محتوى القائمة الجانبية للموبايل
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }}>
      <Typography variant="h6" sx={{ my: 2 }}>RE-STORE</Typography>
      <Divider />
      <List>
        {midLinks.map(({ title, path }) => (
          <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
            <ListItemText primary={title.toUpperCase()} />
          </ListItem>
        ))}
        {!user && rightLinks.map(({ title, path }) => (
          <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
            <ListItemText primary={title.toUpperCase()} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          <Box display="flex" alignItems="center">
            {/* أيقونة القائمة للموبايل فقط */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography component={NavLink} to="/" sx={navStyles} variant="h6">
              RE-STORE
            </Typography>
            <IconButton onClick={() => dispatch(setDarkMode())}>
              {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
            </IconButton>
          </Box>

          {/* روابط الوسط - تختفي في الموبايل */}
          <List sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>

          <Box display="flex" alignItems="center">
            <IconButton component={Link} to="/basket" size="large" sx={{ color: "inherit" }}>
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {user ? (
              <UserMenu user={user} />
            ) : (
              // روابط اليمين - تختفي في الموبايل
              <List sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {rightLinks.map(({ title, path }) => (
                  <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                    {title.toUpperCase()}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* الـ Drawer الخاص بالموبايل */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // لأداء أفضل على الموبايل
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* شريط التحميل العلوي */}
      <Fade in={isLoading}>
        <Box sx={{ width: "100%", position: "fixed", top: 0, left: 0, zIndex: 2000 }}>
          <LinearProgress color="secondary" />
        </Box>
      </Fade>
    </>
  );
}