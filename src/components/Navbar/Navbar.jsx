import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout, loadingAuth }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News Dashboard
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/favorites">
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
