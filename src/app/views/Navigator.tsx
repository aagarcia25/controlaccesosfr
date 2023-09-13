import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import { Collapse, Grid, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import { getMenus } from "../services/localStorage";
import { menus } from "../interfaces/menu";

export default function Navigator(props: DrawerProps, logoFijo: any) {
  const { ...other } = props;
  const navigate = useNavigate();

  const list: menus[] = JSON.parse(String(getMenus()));
  const [open, setOpen] = useState(-1);
  const handleClick = (x: number) => {
    open === x ? setOpen(-1) : setOpen(x);
  };
  const consulta = (data: string) => {
    navigate(data);
  };

  return (
    <Drawer variant="permanent" {...other} {...logoFijo}>
      <Grid
        container
        position="sticky"
        alignContent="center"
        sx={{ bgcolor: "rgb(255, 255, 255)", width: "100%" }}
      >
        <Grid item sx={{ width: "auto", higth: "4%" }}>
          <img
            src={Logo}
            style={{ width: "100%" }}
            onClick={() => consulta("/")}
          />
        </Grid>
        <Grid
          item
          sx={{ width: "auto", textAlign: "center", paddingLeft: "3%" }}
        >
          <Typography variant="subtitle1" gutterBottom>
            PLATAFORMA DE CONTROL DE ACCESO
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <div>
          <List>
            {list.map((item, indexx) => {
              return (
                // SOLO IMPRIME EL BOTON CUANDO NO TIENE HIJOS RELACIONADOS
                <div key={Math.random()}>
                  <ListItemButton onClick={() => navigate(item.Path)}>
                    <ListItemIcon>
                      <SendIcon />
                    </ListItemIcon>
                    <ListItemText
                      key={Math.random()}
                      primary={
                        <Tooltip title={item.Descripcion}>
                          <Typography
                            className="menu-Typography"
                            variant="h5"
                            sx={{ fontFamily: "sans-serif" }}
                            gutterBottom
                          >
                            {item.Menu}
                          </Typography>
                        </Tooltip>
                      }
                    />
                  </ListItemButton>
                  <Divider key={Math.random()} absolute />
                </div>
              );
            })}
          </List>
        </div>
      </Box>
    </Drawer>
  );
}
