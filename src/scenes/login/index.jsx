import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  useTheme,
} from "@mui/material";
import { setToken, setUserId, setUserType } from "state";
import { useLoginMutation } from "state/api";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [trigger, result] = useLoginMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      setUsernameError(false);
    }
    if (name === "password") {
      setPassword(value);
      setPasswordError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    event.preventDefault();
    // Input validation
    if (email === "") {
      setUsernameError(true);
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }

    let data = undefined;
    try {
      data = await trigger({ username: email, password }).unwrap();

      dispatch(setUserId(data?.user_id));
      dispatch(setToken(data?.token));

      if (data?.user_type === "sys-admin") {
        dispatch(setUserType("superadmin"));
        navigate("/", { replace: true });
      } else {
        dispatch(setUserType("admin"));
        navigate("/", { replace: true });
      }
      enqueueSnackbar("Welcome back!");
    } catch (e) {
      enqueueSnackbar("Error while trying to login, make sure the email and password are valid.", { variant: 'error' })
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          p="1.5rem"
          sx={{ boxShadow: "rgba(255, 255, 255, 0.35) 0px 5px 15px" }}
          borderRadius="10px"
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              color={theme.palette.secondary.main}
            >
              Bus Navigation System
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              error={usernameError}
              helperText={usernameError ? "Email is required" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              error={passwordError}
              helperText={passwordError ? "Password is required" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Container
              maxWidth="sm"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                type="submit"
                onClick={handleSubmit}
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                Login
              </Button>
              <Link to="/resetpassword">
                <Button
                  variant="text"
                  type="submit"
                  size="small"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  Reset Password
                </Button>
              </Link>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
