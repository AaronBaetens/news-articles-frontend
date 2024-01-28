import { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Button,
  CircularProgress,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout, loadingAuth }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/favorites">
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </ListItem>
        <ListItem button onClick={onLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News Dashboard
        </Typography>
        {!isMobile && (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)", // Example hover effect
                },
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/favorites"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)", // Apply the same or different effect as needed
                },
              }}
            >
              Favorites
            </Button>
          </>
        )}
        <Button color="inherit" onClick={onLogout} disabled={loadingAuth}>
          {loadingAuth ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Logout"
          )}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
  loadingAuth: PropTypes.bool,
};

Navbar.defaultProps = {
  loadingAuth: false,
};

export default Navbar;
