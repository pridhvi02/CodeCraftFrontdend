import React from "react";
import { Box, Link, Typography, Button, useTheme } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const theme = useTheme();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  //handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("logout successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      backgroundColor={theme.palette.background.alt}
      width={"100%"}
      p="1rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2, bgcolor: "#2F3C7E", color: "#FBEAEB" }}
    >
      <Typography variant="h1" color={"white"} fontWeight={"bold"}>
        Code-Craft
      </Typography>
      {loggedIn ? (
        <NavLink
          to="/login"
          onClick={handleLogout}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            disableElevation
          >
            Log Out
          </Button>
        </NavLink>
      ) : (
        <>
          <NavLink to="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              disableElevation
            >
              Sign Up
            </Button>
          </NavLink>
          <NavLink to="/login">
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              disableElevation
            >
              Sign In
            </Button>
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
