import { Formik, Form, Field } from "formik";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import useLogin from "./useLogin";

const Login = ({ onLogin }) => {
  const { handleLogin, loading } = useLogin();

  const submitLogin = async (values, { setSubmitting }) => {
    const isAuth = await handleLogin(values.username, values.password);
    if (isAuth) {
      onLogin(true);
    }
    setSubmitting(false);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Login
      </Typography>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={submitLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Field
              as={TextField}
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
