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
} from "@mui/material";
import { setUserType } from "state";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
    dispatch(setUserType("admin"));
    // dispatch(setUserType("superadmin"));
    navigate("/", { replace: true });
  };

  return (
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
            label="Email"
            name="email"
            type="email"
            value={formData.email}
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
            value={formData.password}
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
  );
};

export default Login;
