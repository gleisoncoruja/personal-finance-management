import { Box, Paper, SpeedDial, styled } from "@mui/material";

interface BalanceContentProps {
  balance: number;
}

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
      transition: "background-color 0.3s ease-in-out",
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

export const HeaderContent = styled(Box)({
  display: "flex",
  width: "100%",
});

export const TitleContent = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

export const BalanceContent = styled(Paper)<BalanceContentProps>(
  ({ balance }) => ({
    display: "flex",
    minWidth: "fit-content",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
    gap: "0.5rem",
    backgroundColor: balance > 0 ? "#89BD23" : "#d32f2f",
    color: "#FFF",
  })
);
