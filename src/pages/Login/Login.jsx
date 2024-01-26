import { Formik, Form, Field } from "formik";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@shared/authentication/useAuth";

const Login = () => {
  const { handleLogin, loadingAuth } = useAuth();

  const submitLogin = async (values, { setSubmitting }) => {
    await handleLogin(values.username, values.password);
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
              disabled={isSubmitting || loadingAuth}
              fullWidth
            >
              {loadingAuth ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
