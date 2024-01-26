import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

const Navbar = ({ onLogout, loadingAuth }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News Dashboard
        </Typography>
        <Button color="inherit" href="#home">
          Home
        </Button>
        <Button color="inherit" href="#favorites">
          Favorites
        </Button>
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
