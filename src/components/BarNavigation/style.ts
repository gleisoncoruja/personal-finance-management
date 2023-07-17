import { SpeedDial, styled } from "@mui/material";

export const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",

  "& .MuiButtonBase-root .MuiFab-sizeLarge": {
    backgroundColor: theme.palette.primary.main,
  },

  "& .MuiButtonBase-root.MuiFab-sizeSmall": {
    backgroundColor: theme.palette.primary.main,
    "& .MuiSvgIcon-root": {
      color: "#FFF",
    },
    "&:hover": {
      backgroundColor: "#FFF",
      "& .MuiSvgIcon-root": {
        color: theme.palette.primary.main,
      },
    },
  },

  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
