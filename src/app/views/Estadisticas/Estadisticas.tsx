import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { Calendar, Views } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { localizer } from "../../helpers/calendarLocalizer";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { agenda } from "../../interfaces/Visitas";
import { Iroles, menus } from "../../interfaces/menu";
import { CatalogosServices } from "../../services/catalogosServices";
import { getMenus, getRoles, getUser } from "../../services/localStorage";
import TitleComponent from "../componentes/TitleComponent";

interface VisitaDia {
  fecha: string;
  cantidad_visitas: number;
}
const Estadisticas = () => {
  const [listAgenda, setlistAgenda] = useState<agenda[]>([]);
  const [open, setOpen] = useState(false);
  const [cancelado, setCancelado] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const listMenus: menus[] = JSON.parse(String(getMenus()));
  const navigate = useNavigate();
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  function verificarEscanearEnMenus(menusList: Iroles[]): boolean {
    for (const menu of menusList) {
      if (menu.ControlInterno === "ESCANEAR") {
        return true;
      }
    }
    return false;
  }
  const list: Iroles[] = JSON.parse(String(getRoles()));
  const [visitasDia, setVisitasDia] = useState<VisitaDia[]>([]);
  const [dataset, setdataset] = React.useState(null);

  const handleSend = () => {
    let data = {
      NUMOPERACION: 21,
      CHID: user.Id,
      IDENTIDAD: user.IdEntidad,
      ROL: verificarEscanearEnMenus(list),
    };

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        let eveitem: agenda[] = [];
        res.RESPONSE.map((item: VisitaDia) => {
          var fechaOriginal = new Date(item.fecha);
          fechaOriginal.setDate(fechaOriginal.getDate() + 1);

          let it = {
            title: `${item.cantidad_visitas} visitas`, // Título del evento con la cantidad de visitas
            start: new Date(fechaOriginal), // Fecha de inicio del evento
            end: new Date(fechaOriginal), // Fecha de fin del evento (en este caso, igual a la fecha de inicio)
            color: "#AF8C55", // Color del evento
            allDay: true,
          };
          eveitem.push(it);
        });
        setlistAgenda(eveitem);
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  const canceladosSistema = () => {
    let data = {
      NUMOPERACION: 18,
    };
    CatalogosServices.visita_index(data).then((res) => {
      setCancelado(res.RESPONSE.contador);
    });
  };

  const totalVisitas = () => {
    let data = {
      NUMOPERACION: 19,
    };
    CatalogosServices.visita_index(data).then((res) => {
      setVisitas(res.RESPONSE.contador);
    });
  };

  const loadGrafica = (nivel: number, id: string) => {
    const data = { nivel: nivel, P_ID: id };
    CatalogosServices.graficas(data).then((res) => {
      setdataset(res.RESPONSE);
      console.log(res.RESPONSE);
    });
  };

  function verificarEscanearMenus(listMenus: menus[]): boolean {
    for (const menu of listMenus) {
      if (menu.Menu === "Generar Visita") {
        return true;
      }
    }
    return false;
  }

  const onSelectEvent = (v: any) => {
    if (verificarEscanearMenus(listMenus)) {
      if (v.estatus === "0779435b-5718-11ee-b06d-3cd92b4d9bf4") {
        Swal.fire("Cita Finalizada, no se puede modificar", "¡Error!", "info");
      } else {
        navigate("/inicio/view/" + v.id);
      }
    } else {
      Swal.fire(
        "Aviso",
        "No es posible visualizar los detalles de la cita hasta que el código QR ha sido escaneado.",
        "info"
      );
    }
  };

  useEffect(() => {
    loadGrafica(0, "");
    canceladosSistema();
    totalVisitas();
    handleSend();
  }, []);

  return (
    <>
      <TitleComponent title={"Estadísticas"} show={open} />
      <Grid
        container
        item
        spacing={5}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ padding: "2%" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  align="center"
                >
                  {cancelado}
                </Typography>
                <Typography variant="h5" color="text.secondary" align="center">
                  Cancelados por Sistema
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  align="center"
                >
                  {visitas}
                </Typography>
                <Typography variant="h5" color="text.secondary" align="center">
                  Total de visitas
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
      </Grid>

      <Grid
        container
        item
        spacing={5}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ padding: "2%" }}
      >
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: 20 }}>
            {dataset && (
              <BarChart
                xAxis={[{ scaleType: "band", dataKey: "Clasificacion" }]}
                series={[
                  {
                    dataKey: "Generado por Recepción",
                    label: "Generado por Recepción",
                  },
                  { dataKey: "Generado con QR", label: "Generado con QR" },
                ]}
                dataset={dataset}
                width={400}
                height={400}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          {listAgenda.length >= 1 ? (
            <div style={{ height: 445, width: "100%" }}>
              <Calendar
                culture="es"
                localizer={localizer}
                events={listAgenda}
                //showAllEvents
                views={[Views.MONTH]}
                defaultView={Views.MONTH}
                startAccessor="start"
                endAccessor="end"
                // messages={getMessagesES()}
                //  onSelectEvent={(v) => onSelectEvent(v)}
                selectable
                popup={true}
                components={{
                  event: ({ event }) => {
                    return (
                      <div className="info">
                        <Grid
                          className="info"
                          container
                          spacing={2} // Ajusta el espacio entre los elementos
                          direction="row"
                          justifyContent="center"
                          alignItems="flex-start"
                        >
                          <Grid
                            className="info"
                            item
                            xs={12}
                            style={{ transition: "width 0.3s" }}
                          >
                            <p className="info" style={{ margin: "0" }}>
                              {event.title}
                            </p>
                          </Grid>
                        </Grid>
                      </div>
                    );
                  },
                }}
              />
            </div>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default Estadisticas;
function dayjs(fecha: string) {
  throw new Error("Function not implemented.");
}
