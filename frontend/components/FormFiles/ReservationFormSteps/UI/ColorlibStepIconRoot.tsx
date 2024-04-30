// UI Imports
import { styled } from "@mui/material";

export const ColorlibStepIconRoot = styled("div")(
  ({ theme, ownerState }: { theme?: any; ownerState: any }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#bbb",
    zIndex: 1,
    color: "#fff",
    width: 30,
    height: 30,
    marginTop: "-4px",
    padding: "4px",
    display: "flex",
    borderRadius: "10%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundColor: "#337ab7",
    }),
    ...(ownerState.completed && {
      backgroundColor: "#337ab7",
    }),
  })
);
