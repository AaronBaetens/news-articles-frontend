import { Formik, Form, Field } from "formik";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Link,
  Container,
  Paper,
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
    <Container
      component="main"
      maxWidth={false}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          'url("https://source.unsplash.com/random/1920x1080?news")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "90%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
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
                sx={{ mt: 2, mb: 2 }}
              >
                {loadingAuth ? <CircularProgress size={24} /> : "Login"}
              </Button>
              <Box sx={{ textAlign: "center" }}>
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
      </Paper>
    </Container>
  );
};

export default Login;
