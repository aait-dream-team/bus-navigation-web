import React, { useState } from "react";
import { TextField, Button, useTheme, Box, Container } from "@mui/material";
import Header from "components/Header";

const AddRoutes = () => {
  const theme = useTheme();

  const [networkName, setNetworkName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(networkName, email, description);
    // Handle form submission
  };

  return (
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
        <Header title="Add Network" />
      </Box>
      <form onSubmit={handleSubmit}>
        <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={2}>
          <TextField
            label="Network Name"
            value={networkName}
            onChange={(event) => setNetworkName(event.target.value)}
            required
          />
          <TextField
            label="Admin Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            multiline={true}
            minRows={3}
            maxRows={10}
          />
        </Box>
        <Box
          display="grid"
          justifyContent="center"
          gap={2}
          mt="2rem"
        >
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
  );
};

export default AddRoutes;
