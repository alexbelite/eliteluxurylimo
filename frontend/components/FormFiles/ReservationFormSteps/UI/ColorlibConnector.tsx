// UI Imports
import { styled, StepConnector, stepConnectorClasses } from "@mui/material";

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 8,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#337ab7",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#337ab7",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 6,
    border: 0,
    backgroundColor: "#ffffff",
    boxShadow: "0 0 2px 2px rgba(152, 152, 152, 0.3) inset",
    borderRadius: 10,
    margin: "0",
    width: "100%",
  },
}));
