import { useEffect, useState } from "react";
import TitleComponent from "../componentes/TitleComponent";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Paper, SvgIcon, SvgIconProps, Typography } from "@mui/material";
import { CatalogosServices } from "../../services/catalogosServices";
import React from "react";
import { BarChart } from "@mui/x-charts";
import { Calendar, Views } from "react-big-calendar";
import { localizer } from "../../helpers/calendarLocalizer";
import { agenda } from "../../interfaces/Visitas";
import { getMessagesES } from "../../helpers/getMessages";
import { Iroles, menus } from "../../interfaces/menu";
import Swal from "sweetalert2";
import { getMenus, getRoles, getUser } from "../../services/localStorage";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../helpers/Toast";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import dayjs, { Dayjs } from "dayjs";


interface VisitaDia {
  fecha: string;
  cantidad_visitas: number;
}
const Estadisticas = () => {
  const [open, setOpen] = useState(false);
  const [cancelado, setCancelado] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const listMenus: menus[] = JSON.parse(String(getMenus()));
  const navigate = useNavigate();
  const [openCalendario, setOpenCalendario] = useState(true);
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

  const [listAgenda, setlistAgenda] = useState<agenda[]>([]);


  //const [data, setData] = useState();
  const [dataset, setdataset] = React.useState(null);


  // const data = [
  //     { category: 'A', value: 10 },
  //     { category: 'B', value: 20 },
  //     { category: 'C', value: 15 },
  //     // Agrega más objetos de datos según sea necesario
  //   ];


  const handleSend = () => {
    setOpenCalendario(true);
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
        res.RESPONSE.map((item: agenda) => {
          let it = {
            id: item.id,
            title: item.title,
            allDay: false,
            start: new Date(item.start),
            end: new Date(item.end),
            color: item.color,
            estatus: item.estatus,
          };
          eveitem.push(it);
        });
        console.log("entre al if del endppoint");
        console.log("res", res);

        setVisitasDia(res.RESPONSE)
        res.RESPONSE.map((visita: { fecha: string | number | Date; }) => {
          console.log("new Date(visita.fecha)", dayjs(visita.fecha));
          console.log("visitafecha", visita.fecha);
         
        })
        setlistAgenda(eveitem);
        //setOpenCalendario(true);
        console.log("eveitem", eveitem);
        console.log("", openCalendario);

      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        setOpenCalendario(false);
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
  }

  const totalVisitas = () => {
    let data = {
      NUMOPERACION: 19,
    };
    CatalogosServices.visita_index(data).then((res) => {
      setVisitas(res.RESPONSE.contador);
    });
  }

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
    console.log(v);
    if (verificarEscanearMenus(listMenus)) {
      if (v.estatus === "0779435b-5718-11ee-b06d-3cd92b4d9bf4") {
        Swal.fire("Cita Finalizada, no se puede modificar", "¡Error!", "info");
      } else {
        // if (v.color !== "#EC7063") {
        navigate("/inicio/view/" + v.id);
        //  } else {
        //    Swal.fire("Cita Vencida, no se puede modificar", "¡Error!", "info");
        //  }
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
    console.log("dataset usefect", dataset);
    handleSend();

    console.log("listAgenda", listAgenda);
    console.log("openCalendario", openCalendario);
console.log("visitasDia",visitasDia);


    loadGrafica(0, "");
    //setdataset(2)
    canceladosSistema();
    totalVisitas()
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
        
        <Grid item xs={12} sm={6} md={4} lg={3}>
          
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} >
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h3" component="div" align="center" >
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
                <Typography gutterBottom variant="h3" component="div" align="center" >
                  {visitas}
                </Typography>
                <Typography variant="h5" color="text.secondary" align="center">
                  Total de visistas
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          
        </Grid>
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
        <Grid item xs={12} sm={6} md={4} lg={3.5}>
          <Paper elevation={3} style={{ padding: 20 }}>
            {dataset && <BarChart
              xAxis={[{ scaleType: "band", dataKey: "Clasificacion" }]}
              series={[
                { dataKey: "Generado por Recepción", label: "Generado por Recepción" },
                { dataKey: "Generado con QR", label: "Generado con QR" },]}
              dataset={dataset}
              width={500}
              height={300}
            />}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <div style={{ height: 445, width: "100%" }}>
            <Calendar
              culture="es"
              localizer={localizer}
              events={
                // listAgenda
                visitasDia.map(visita => ({
                title: `${visita.cantidad_visitas} visitas`, // Título del evento con la cantidad de visitas
                start: dayjs(visita.fecha), // Fecha de inicio del evento
                end: dayjs(visita.fecha), // Fecha de fin del evento (en este caso, igual a la fecha de inicio)
                color: '#AF8C55', // Color del evento
              }))
            }
              //showAllEvents
              views={[Views.MONTH]}
              defaultView={Views.MONTH}
              startAccessor="start"
              endAccessor="end"
              // style={{
              //   height: "calc( 80rem - 80% )",
              //   margin: "1%",
              // }}
              messages={getMessagesES()}
              onSelectEvent={(v) => onSelectEvent(v)}
              selectable
              popup={true}
              // eventPropGetter={(listAgenda) => {
              //   const backgroundColor = listAgenda.color ? listAgenda.color : "blue";
              //   const color = "white";
              //   return { style: { backgroundColor, color } };
              // }}
              components={{
                event: ({ event }) => {
                  // Intenta analizar event.title como JSON
                  let titleObject;
                  try {
                    titleObject = JSON.parse(event.title);
                  } catch (error) {
                    console.error("Error parsing JSON:", error);
                  }

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
                        <Grid className="info" item xs={12} style={{ transition: "width 0.3s" }}>
                          {/* <p style={{ margin: "auto" }}>Visitante:</p> */}
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
        </Grid>







      </Grid>


    </>

  )
};
export default Estadisticas;


