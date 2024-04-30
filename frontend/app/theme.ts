// UI Imports
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "inherit",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          maxHeight: "300px!important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: "100%",
          "& .MuiOutlinedInput-input": {
            padding: "8px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid #6F6B6B`,
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: `2px solid black`,
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black!important",
          "&.Mui-focused": {
            fontWeight: "bold",
          },
          "&.MuiFormLabel-filled": {
            fontWeight: "bold",
          },
        },
      },
    },
  },
});
