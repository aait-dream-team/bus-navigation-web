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
import { useResetPasswordMutation } from "state/api";
import { enqueueSnackbar } from "notistack";

const ChangePassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [trigger, result] = useResetPasswordMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "otp") {
      setOtp(value);
      setOtpError(false);
    }
    if (name === "password") {
      setPassword(value);
      setPasswordError(false);
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setConfirmPasswordError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Input validation
    if (otp === "" || otp.length !== 6) {
      setOtpError(true);
      return;
    }

    if (password === "") {
      setPasswordError(true);
      return;
    }
    if (confirmPassword === "" || confirmPassword !== password) {
      setConfirmPasswordError(true);
      return;
    }

    let data = undefined;
    try {
      data = await trigger({
        email: localStorage.getItem("email"),
        otp,
        password,
      }).unwrap();
      navigate("/login", { replace: true });
      enqueueSnackbar("Password changed successfully", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Error in changing password, please try again later!", {
        variant: "error",
      });
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
            <Typography
              variant="h6"
              align="center"
              color={theme.palette.secondary.main}
            >
              Change Password
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="OTP"
              name="otp"
              type="number"
              value={otp}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              error={otpError}
              helperText={otpError ? "OTP should be 6 characters long" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New Password"
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
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              error={confirmPasswordError}
              helperText={
                confirmPasswordError
                  ? "Make sure the 'password' and 'confirm password' match"
                  : ""
              }
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
                ChangePassword
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ChangePassword;
