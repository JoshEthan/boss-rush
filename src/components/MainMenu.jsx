import React, { useRef } from "react";
import { Box, Button, Stack } from "@mui/material";

// MainMenu Component
export const MainMenu = ({ startGame, players }) => {
  // Default images
  const defaultImages = [
    "./assets/profile_add.png",
    "./assets/profile_add.png",
    "./assets/profile_add.png",
  ];

  // Update images based on players
  const images = defaultImages.map((src, index) =>
    players[index] ? "./assets/profile.png" : src
  );

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh", // Full screen height
        backgroundColor: "black", // Dark background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Centered Images */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center", // Ensures horizontal alignment
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Profile ${index + 1}`}
            style={{ width: "30%", height: "auto", borderRadius: "50%" }}
          />
        ))}
      </Stack>

      {/* Start Game Button */}
      <Button
        sx={{
          position: "absolute",
          bottom: "20vh",
        }}
        variant="text"
        onClick={startGame}
      >
        Start Game
      </Button>
    </Box>
  );
};
