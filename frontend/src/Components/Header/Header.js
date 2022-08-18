import { Container, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Header = function () {
  return (
    <Container>
      <Box
        sx={{
          py: "32px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MenuItem
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Home
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = "/add";
              }}
            >
              Add Transaction
            </MenuItem>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Header;
