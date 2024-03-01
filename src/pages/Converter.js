import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";
import Dashboard from "./Dashboard";

const Converter = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  //fields
  const [from , setfrom] = useState("");
  const [to ,setto] = useState("");
  const [text , settext ] = useState("");
  const [code ,setcode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/api/v1/openai/converter", { from, to ,text});
      console.log(data)
      setcode(data)
    } catch (err) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Code-Converter</Typography>
        <TextField
          label="from"
          type="text"
          required
          margin="normal"
          fullWidth
          value={from}
          onChange={(e) => {
            setfrom(e.target.value);
          }}
        />
        <TextField
          label="to"
          type="text"
          required
          margin="normal"
          fullWidth
          value={to}
          onChange={(e) => {
            setto(e.target.value);
          }}
        />
        
        <TextField
          label="enter the code to be converted"
          type="text"
          multiline= {true}
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => {
            settext(e.target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Submit
        </Button>
        <Typography mt={2}>
          not this tool ? <Link to="/">Go Back</Link>
        </Typography>
      </form>
          {code ? (
            <Card
            sx={{
              mt: 4,
              border: 1,
              boxShadow: 0,
              height: "500px",
              borderRadius: 5,
              borderColor: "natural.medium",
              bgcolor: "background.default",
            }}
          >
            <Typography p={2}>{code}</Typography>
          </Card>
        ) : (
          <Card
            sx={{
              mt: 4,
              border: 1,
              boxShadow: 0,
              height: "500px",
              borderRadius: 5,
              borderColor: "natural.medium",
              bgcolor: "background.default",
            }}
          >
            <Typography
              variant="h5"
              color="natural.main"
              sx={{
                textAlign: "center",
                verticalAlign: "middel",
                lineHeight: "450px",
              }}
            >
              Code Will Apprea Here
            </Typography>
          </Card>
          )}
    </Box>
  );
};

export default Converter;
