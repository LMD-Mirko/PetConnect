import React from "react";
import { TextField, Box } from "@mui/material";

const SearchPet = ({ searchTerm, onSearch }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Buscar"
        variant="outlined"
        value={searchTerm}
        onChange={onSearch}
        fullWidth
      />
    </Box>
  );
};

export default SearchPet;
