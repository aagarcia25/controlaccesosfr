import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HelpIcon from "@mui/icons-material/Help";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import UploadIcon from "@mui/icons-material/Upload";
import {
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  RESPONSEGUIARAPIDA,
  RESPONSEPREGUNTASFRECUENTES,
  RESPONSEVIDEOS,
} from "../../interfaces/UserInfo";
import { menus } from "../../interfaces/menu";
import { AuthService } from "../../services/AuthService";
import { ValidaSesion } from "../../services/UserServices";
import { CatalogosServices } from "../../services/catalogosServices";
import { getMenus, getToken } from "../../services/localStorage";
import { AdminAyudasModal } from "../AdminVideosTutoriales/AdminAyudasModal";
import Progress from "../Progress";
import { TooltipPersonalizado } from "./CustomizedTooltips";
import { VisualizadorAyudas } from "./VisualizadorAyudas";

const ButtonsTutorial = ({
  route,
  handleCloseMenuVideos,
}: {
  route: string;
  handleCloseMenuVideos: Function;
}) => {
  const [open, setOpen] = React.useState(false);
  const [openCarga, setOpenCarga] = React.useState(false);
  const [dataVideos, setDataVideos] = useState<Array<RESPONSEVIDEOS>>([]);
  const [dataPreguntasFrecuentes, setDataPreguntasFrecuentes] = useState<
    Array<RESPONSEPREGUNTASFRECUENTES>
  >([]);
  const [dataGuiaRapida, setDataGuiaRapida] = useState<
    Array<RESPONSEGUIARAPIDA>
  >([]);
  const [idMenu, setIdMenu] = useState<string>("");
  const list: menus[] = JSON.parse(String(getMenus()));
  const [slideropen, setslideropen] = useState(false);
  const [openMenu, setOpenMenu] = useState(-1);
  const [URLVideo, setURLVideo] = useState<string>("");
  const [modo, setModo] = useState<string>("");

  const handleClickOpen = (URLVideo: string, modo: string) => {
    setModo(modo);
    setURLVideo(URLVideo);
    setOpen(true);
  };

  const handleObtenerVideos = (idmenu: string) => {
    let data = {
      CHID: idmenu,
      NUMOPERACION: 12,
    };
    AuthService.AdminAyudas(data).then((res) => {
      if (res.SUCCESS) {
        setDataVideos(res.RESPONSE);
      } else {
      }
    });
  };

  const handleObtenerPreguntasFrecuentes = (
    idmenu: string,
    numeroOperacion: number
  ) => {
    let data = {
      CHID: idmenu,
      NUMOPERACION: numeroOperacion,
    };
    AuthService.AdminAyudas(data).then((res) => {
      if (res.SUCCESS) {
        if (numeroOperacion === 10) {
          setDataPreguntasFrecuentes(res.RESPONSE);
        } else {
          setDataGuiaRapida(res.RESPONSE);
        }
      }
    });
  };

  const handleClick = (x: number) => {
    openMenu === x ? setOpenMenu(-1) : setOpenMenu(x);
  };

  const handleClickOpenCarga = () => {
    setOpenCarga(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCarga(false);
    handleObtenerVideos(idMenu);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    setslideropen(true);
    ValidaSesion();

    list.map((item: any) => {
      if (
        String(item.Path) ===
        window.location.href
          .slice(window.location.href.indexOf("#") + 1)
          .replace(/%20/g, " ")
      ) {
        setIdMenu(item.Id);
        handleObtenerVideos(item.Id);
        handleObtenerPreguntasFrecuentes(item.Id, 10);
        handleObtenerPreguntasFrecuentes(item.Id, 11);
      }
    });
    setslideropen(false);
  }, [window.location.href]);

  return (
    <div>
      <Progress open={slideropen}></Progress>

      <Grid
        className="containerBotonesControladoresVideos"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {dataVideos.length === 0 ? (
          ""
        ) : (
          <Grid item xs={5}>
            <TooltipPersonalizado
              placement="left"
              title={
                <React.Fragment>
                  <div className="containerBotonesVideos">
                    <Typography variant="h5" className="TooltipPersonalizado">
                      Videos de ayuda
                    </Typography>
                    <Grid container className="containerVideosLista">
                      {dataVideos.length === 0
                        ? ""
                        : dataVideos.map((datos) => {
                            return (
                              <Grid
                                key={Math.random()}
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                              >
                                <Grid key={Math.random()} item xs={9.5}>
                                  <div
                                    key={Math.random()}
                                    className="div-BotonesVideos"
                                  >
                                    <IconButton
                                      key={Math.random()}
                                      className="VerVideos"
                                      onClick={() =>
                                        handleClickOpen(
                                          String(datos?.RutaVideo),
                                          "video"
                                        )
                                      }
                                    >
                                      <OndemandVideoIcon />
                                      <Typography
                                        variant="h6"
                                        className="FuenteDeBotonesTooltip"
                                      >
                                        {datos?.NombreOriginalVideo + " "}
                                      </Typography>
                                    </IconButton>
                                  </div>
                                </Grid>

                                <Grid key={Math.random()} item xs={2}>
                                  <div
                                    key={Math.random()}
                                    className="div-BotonesVideos"
                                  >
                                    <IconButton
                                      key={Math.random()}
                                      className="VerVideos"
                                      onClick={() =>
                                        handleClickDelet(
                                          datos?.RutaVideo,
                                          route
                                        )
                                      }
                                    >
                                      <DeleteForeverIcon />
                                    </IconButton>
                                  </div>
                                </Grid>
                              </Grid>
                            );
                          })}
                    </Grid>
                  </div>
                </React.Fragment>
              }
            >
              <IconButton
                className="ControlVideosHeader"
                onClick={() =>
                  handleClickOpen(
                    dataVideos.length === 1 ? dataVideos[0]?.RutaVideo : "",
                    "video"
                  )
                }
              >
                <OndemandVideoIcon className="IconoDentroBoton" />
              </IconButton>
            </TooltipPersonalizado>
          </Grid>
        )}

        <Grid item xs={5}>
          <Tooltip title="Cargar Video Tutorial">
            <IconButton
              className="ControlVideosHeader"
              onClick={handleClickOpenCarga}
            >
              <UploadIcon className="IconoDentroBoton" />
            </IconButton>
          </Tooltip>
        </Grid>

        {dataGuiaRapida.length === 0 ? (
          ""
        ) : (
          <>
            <Grid
              container
              item
              xs={12}
              direction="row"
              justifyContent="flex-start"
            >
              <TooltipPersonalizado
                placement="left"
                title={
                  <React.Fragment>
                    <div className="containerBotonesVideos">
                      <Typography variant="h5" className="TooltipPersonalizado">
                        {" "}
                        Guía Rapida
                      </Typography>
                      <Grid container className="containerVideosLista">
                        {dataGuiaRapida.length === 0
                          ? ""
                          : dataGuiaRapida.map((datos) => {
                              return (
                                <Grid
                                  key={Math.random()}
                                  container
                                  direction="row"
                                  justifyContent="space-around"
                                  alignItems="center"
                                >
                                  <Grid
                                    key={Math.random()}
                                    item
                                    xs={12}
                                    padding={0.5}
                                  >
                                    <div
                                      key={Math.random()}
                                      className="div-BotonesVideosTexto"
                                    >
                                      <Grid key={Math.random()} item>
                                        <Button
                                          className="ButtonGuiaRapida"
                                          onClick={() =>
                                            handleClickOpen(
                                              String(datos?.RutaGuia),
                                              "guia"
                                            )
                                          }
                                        >
                                          {datos?.Pregunta + " "}
                                        </Button>
                                      </Grid>
                                    </div>
                                  </Grid>
                                </Grid>
                              );
                            })}
                      </Grid>
                    </div>
                  </React.Fragment>
                }
              >
                <IconButton
                  className="ControlMenuHeaderButton"
                  // onClick={onOpenHelp}
                >
                  <MenuBookIcon className="IconoDentroBoton" />
                  <Typography variant="h6" className="TextoMenuHeader">
                    {" "}
                    Guía Rapida
                  </Typography>
                </IconButton>
              </TooltipPersonalizado>
            </Grid>
          </>
        )}
        {dataPreguntasFrecuentes.length === 0 ? (
          ""
        ) : (
          <>
            <Grid container item xs={12} justifyContent="flex-start">
              <TooltipPersonalizado
                placement="left"
                title={
                  <React.Fragment>
                    <div className="containerBotonesVideos">
                      <Typography variant="h5" className="TooltipPersonalizado">
                        {" "}
                        Preguntas frecuentes
                      </Typography>
                      <Grid container className="containerVideosLista">
                        {dataPreguntasFrecuentes.length === 0
                          ? ""
                          : dataPreguntasFrecuentes.map((datos, indexx) => {
                              return (
                                <Grid
                                  key={Math.random()}
                                  container
                                  direction="row"
                                  justifyContent="space-around"
                                  alignItems="center"
                                >
                                  <Grid container item xs={12}>
                                    <ListItemButton
                                      sx={{
                                        bgcolor:
                                          openMenu === indexx
                                            ? "rgba(195, 165, 117)"
                                            : "rgba(255, 255, 255, 0.291)",
                                      }}
                                      key={indexx}
                                      onClick={() => handleClick(indexx)}
                                    >
                                      <ListItemText
                                        key={indexx}
                                        primary={
                                          <Typography
                                            variant="caption"
                                            sx={{
                                              fontFamily: "sans-serif",
                                              fontWeight: "800",
                                            }}
                                            gutterBottom
                                          >
                                            {datos?.Pregunta}
                                          </Typography>
                                        }
                                      />
                                      {/* {openMenu === indexx ? <ExpandLess /> : <ExpandMore />} */}
                                    </ListItemButton>
                                  </Grid>
                                  <Grid container item xs={12} paddingLeft={2}>
                                    <Collapse
                                      key={indexx}
                                      in={openMenu === indexx}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <List
                                        sx={{ borderRadius: "1" }}
                                        key={indexx}
                                        component="div"
                                        disablePadding
                                      >
                                        <Divider />
                                        <ListItemText
                                          key={indexx}
                                          primary={
                                            <>
                                              <Typography
                                                variant="h5"
                                                className="menu-Typography"
                                                gutterBottom
                                              >
                                                {datos.Texto}
                                              </Typography>
                                            </>
                                          }
                                        />
                                        <Divider />
                                      </List>
                                    </Collapse>
                                  </Grid>
                                </Grid>
                              );
                            })}
                      </Grid>
                    </div>
                  </React.Fragment>
                }
              >
                <IconButton
                  className="ControlMenuHeaderButton"
                  // onClick={onOpenHelp}
                >
                  <HelpIcon className="IconoDentroBoton" />
                  <Typography variant="h6" className="TextoMenuHeader">
                    {" "}
                    Preguntas Frecuentes
                  </Typography>
                </IconButton>
              </TooltipPersonalizado>
            </Grid>
          </>
        )}
      </Grid>

      {open ? (
        <VisualizadorAyudas
          URLVideo={URLVideo}
          modo={modo}
          handleclose={handleCloseModal}
        />
      ) : (
        ""
      )}

      {openCarga ? (
        <AdminAyudasModal
          IdMenu={idMenu}
          modo={"Administrar ayudas"}
          tipo={0}
          handleClose={handleClose}
          dt={{}}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ButtonsTutorial;

export const handleClickDelet = (URLVideo: string, route: string) => {
  let data = {
    TOKEN: JSON.parse(String(getToken())),
    RUTA: route,
    NOMBRE: URLVideo,
  };

  if (URLVideo !== "") {
    ValidaSesion();
    CatalogosServices.deleteVideoTutorial(data).then((res) => {
      if (res.SUCCESS) {
        Swal.fire("¡Video eliminado!", "¡Error!", "success");
      } else {
        Swal.fire("¡ups!. Algo Fallo", "¡Error!", "success");
      }
    });
  }
};
function getcontrolInternoEntidad(): any {
  throw new Error("Function not implemented.");
}
