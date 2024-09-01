import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Success = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box
        sx={{
          bgcolor: "#C6F7D0", // Light green background color
          py: 4,
          px: 2,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" color="success.main" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Your payment has been processed successfully. You will receive a
          confirmation email shortly.
        </Typography>
        <Link to="/">
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
            onClick={() =>{
              Toastify({
                text: "Order Placed",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true,
              }).showToast();
            }}
              variant="contained"
              color="primary"
            >
              Go Back
            </Button>
          </Box>
        </Link>
      </Box>
    </Container>
  );
};

export default Success;
