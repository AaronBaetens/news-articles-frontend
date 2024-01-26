import PropTypes from "prop-types";
import { AppBar, Toolbar, Button, CircularProgress } from "@mui/material";

const Navbar = ({ onLogout, loadingAuth }) => {
  return (
    <AppBar position="static">
      <Toolbar>
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
