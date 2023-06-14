import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  useTheme,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "components/Header";
import { useCreateAdminMutation } from "state/api";
import { enqueueSnackbar } from "notistack";

const CreateAdmin = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [username, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  const [trigger, result] = useCreateAdminMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission
    let data = undefined;
    try {
      data = await trigger({
        username: username,
        password: crypto.randomUUID(),
        user_type: userType,
      }).unwrap();
      navigate("/");
      enqueueSnackbar("Admin created successfully!", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Error in creating admin", { variant: "error" });
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          // display: "flex",
          direction: "vertical",
          justifyContent: "center",
          height: "100vh",
          mt: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          mb="1rem"
        >
          <Header title="Create Admin" />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
            <TextField
              label="Admin Email"
              value={username}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userType}
                label="Report Type"
                onChange={(event) => setUserType(event.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="sys-admin">System Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display="grid" justifyContent="center" gap={2} mt="2rem">
            <Button
              sx={{
                color: theme.palette.secondary.main,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              type="button"
              variant="outlined"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default CreateAdmin;
