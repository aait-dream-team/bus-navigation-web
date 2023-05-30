import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { setToken, setUserId, setUserType } from "state";
import { useLoginMutation } from "state/api";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [trigger, result] = useLoginMutation();

  const [open, setOpen] = useState(false); // snackbar state

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsername(name === "username" ? value : username);
    setPassword(name === "password" ? value : password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    let data = undefined;
    try {
      data = await trigger({ username, password }).unwrap();
      
      dispatch(setUserId(data?.user_id));
      dispatch(setToken(data?.token));
      
      if (data?.user_type === "sys-admin") {
        dispatch(setUserType("superadmin"));
        navigate("/", { replace: true });
      } else {
        dispatch(setUserType("admin"));
        navigate("/", { replace: true });
      }
    } catch (e) {
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              color={theme.palette.secondary.main}
            >
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              type="username"
              value={username}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
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
            />
          </Grid>
          <Grid item xs={12}>
            <Container
              maxWidth="sm"
              sx={{
                display: "flex",
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
            </Container>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Username or Password is Incorrect!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
