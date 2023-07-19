import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { StyledSpeedDial } from "./style";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { menuActions } from "./menuIcons";

export const BarNavigation = () => {
  const navigate = useNavigate();

  const handleOptionClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<MenuIcon />}
            direction={"down"}
          >
            {menuActions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleOptionClick(action.path)}
              />
            ))}
          </StyledSpeedDial>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            <Link to={"/"}>Gerenciar finanças</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
