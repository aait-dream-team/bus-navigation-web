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
import { useResetPasswordRequestMutation } from "state/api";

const ResetPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [openSnackbar, setOpenSnackBar] = useState(false); // snackbar state
  const [trigger, result] = useResetPasswordRequestMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      setEmailError(false);
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    // Input validation
    if (email === "") {
      setEmailError(true);
      return;
    }

    let data = undefined;
    try {
      localStorage.setItem("email", email);
      data = await trigger({ email }).unwrap();
      console.log("Email With an OTP has been sent to your email.");
      navigate("/changepassword", { replace: true })
    } catch (e) {
      openSnackbar(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnackbar(false);
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
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              color={theme.palette.secondary.main}
            >
              Enter your email to reset your password
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
              error={emailError}
              helperText={emailError ? "Email is required" : ""}
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
                onClick={handleEmailSubmit}
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                Submit
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Email or Password is Incorrect!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResetPassword;
