import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { StyledSpeedDial } from "./style";
import MenuIcon from "@mui/icons-material/Menu";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

export const BarNavigation = () => {
  const [hidden, setHidden] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            hidden={hidden}
            icon={<MenuIcon />}
            direction={"down"}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </StyledSpeedDial>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Gerenciar finanças
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
