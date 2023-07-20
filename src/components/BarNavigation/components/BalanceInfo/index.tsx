import {
  Fade,
  Tooltip,
  useMediaQuery,
  Theme,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import { BalanceContent } from "../../style";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useState } from "react";

interface IBalanceInfoProps {
  balance: number;
  balanceText: string;
}
export const BalanceInfo = ({ balance, balanceText }: IBalanceInfoProps) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return !isSmallScreen ? (
    <Tooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      title={`Balanço anual - Saldo ${balanceText}`}
    >
      <BalanceContent balance={balance}>
        <AccountBalanceIcon />
        {!isSmallScreen && balanceText}
      </BalanceContent>
    </Tooltip>
  ) : (
    <BalanceContent balance={balance}>
      <IconButton
        onClick={handleClick}
        sx={{ width: "2rem", height: "2rem", color: "#fff" }}
      >
        <AccountBalanceIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          sx={{ p: 1 }}
        >{`Balanço anual - Saldo ${balanceText}`}</Typography>
      </Popover>
    </BalanceContent>
  );
};
