import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, useTheme, Box, Container } from "@mui/material";
import Header from "components/Header";
import { useCreateAgencyMutation } from "state/api";

const AddRoutes = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [lang, setLang] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [phone, setPhone] = useState("");

  const [open, setOpen] = useState(false); // snackbar state
  const [trigger, result] = useCreateAgencyMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name, url, lang, timeZone, phone);
    // Handle form submission
    let data = undefined;
    try {
      data = await trigger({
        "name": name,
        "url": url,
        "lang": lang,
        "time_zone": timeZone,
        "phone": phone,
        "admin": localStorage.getItem("userId"),
      }).unwrap();
      navigate("/network");
    } catch (e) {
      setOpen(true);
    }
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
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <TextField
            label="Network URL"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required
          />
          <TextField
            label="Language"
            value={lang}
            onChange={(event) => setLang(event.target.value)}
            required
          />
          <TextField
            label="Time Zone"
            value={timeZone}
            onChange={(event) => setTimeZone(event.target.value)}
            required
          />
          <TextField
            label="Phone Number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
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
  );
};

export default AddRoutes;
