import {
  Box,
  Button,
  TextField,
  Container,
  Paper,
  Stack,
  Link,
  Typography,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import LoginImage from "../../static/images/login.png";

import { useAuth } from "../context/AuthContext";

import { useHttpClient } from "../hooks/http-hook";
import { useState } from "react";
import ImageUpload from "../formelement/ImageUpload";

import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const auth = useAuth();

  const { sendRequest } = useHttpClient();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [imageFile, setImageFile] = useState();

  const navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const onSubmit = async (inputs) => {
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/users/login",
          "POST",
          JSON.stringify({
            username: inputs.username,
            password: inputs.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(
          responseData.userId,
          responseData.userName,
          responseData.userEmail,
          responseData.userImageUrl,
          responseData.token
        );

        navigate(from, { replace: true });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const formData = new FormData();

        formData.append("username", inputs.username);
        formData.append("email", inputs.email);
        formData.append("password", inputs.password);
        formData.append("image", imageFile);

        const responseData = await sendRequest(
          "http://localhost:8000/api/users/signup",
          "POST",
          formData
        );

        auth.login(
          responseData.userId,
          responseData.userName,
          responseData.userImageUrl,
          responseData.token
        );
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        minHeight="90vh"
        flexDirection="column"
      >
        <Container
          component={Paper}
          sx={{
            width: "40ch",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingY: "10px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} alignItems="center">
              <Box
                sx={{
                  width: "35ch",
                  padding: "5px",
                }}
              >
                {isLoginMode ? (
                  <img src={LoginImage} alt="login" width={"100%"} />
                ) : (
                  <Typography variant="h6" align="center">
                    Register
                  </Typography>
                )}
              </Box>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: "Username requiered" }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    error={!!errors.username}
                    type="text"
                    label="Username"
                    variant="outlined"
                    value={value}
                    autoComplete="username"
                    onChange={onChange}
                    helperText={
                      errors.username ? "Enter username" : null
                    }
                    margin="dense"
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Password requiered" }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    error={!!errors.password}
                    type="password"
                    label="Password"
                    variant="outlined"
                    value={value}
                    autoComplete="current-password"
                    onChange={onChange}
                    helperText={
                      errors.password ? "Enter password" : null
                    }
                    margin="dense"
                  />
                )}
              />

              {!isLoginMode && (
                <>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Email requiered" }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        fullWidth
                        error={!!errors.email}
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        helperText={
                          errors.email ? "Enter Email" : null
                        }
                        margin="dense"
                      />
                    )}
                  />
                  <ImageUpload setImageFile={setImageFile} />
                </>
              )}

              <Button type="submit" variant="contained" sx={{ width: "20ch" }}>
                {isLoginMode ? "Login" : "Register"}
              </Button>
              <Box
                component={isLoginMode ? Link : Button}
                variant="contained"
                onClick={() => {
                  setIsLoginMode((prevMode) => !prevMode);
                }}
                sx={{ fontSize: "0.75rem", textDecoration: "none" }}
              >
                {!isLoginMode ? "Cancel" : "Register"}
              </Box>
            </Stack>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
