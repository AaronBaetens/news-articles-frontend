import { Formik, Form, Field } from "formik";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
import { useAuth } from "@shared/authentication/useAuth";
import { loginValidationSchema } from "./validationSchema";

const Login = () => {
  const { handleLogin, loadingAuth } = useAuth();

  const submitLogin = async (values, { setSubmitting }) => {
    await handleLogin(values.username, values.password);
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Login
      </Typography>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={submitLogin}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              margin="normal"
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
            <Field
              as={TextField}
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
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
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Link href="#" variant="body2" sx={{ mr: 2 }}>
                Forgot Password?
              </Link>
              <Link href="#" variant="body2">
                Sign Up
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
