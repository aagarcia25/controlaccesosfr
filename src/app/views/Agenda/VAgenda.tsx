import { useEffect, useMemo, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesES } from "../../helpers/getMessages";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { agenda } from "../../interfaces/Visitas";
import { CatalogosServices } from "../../services/catalogosServices";
import { getMenus, getRoles, getUser } from "../../services/localStorage";
import TitleComponent from "../componentes/TitleComponent";
import { Iroles, menus } from "../../interfaces/menu";
import { Grid } from "@mui/material";

interface EventData {
  id: number;
  estatus: number;
  title: {
    visitante: {
      nombre: string;
      apellidoP: string;
      apellidoM: string;
    };
    receptor: {
      nombre: string;
      apellidoP: string;
      apellidoM: string;
    };
    evento: string;
  };
  start: string; // Ajusta el tipo según tu estructura de datos
  end: string; // Ajusta el tipo según tu estructura de datos
  color: string;
}

const VAgenda = () => {
  const navigate = useNavigate();
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [open, setopen] = useState(false);
  const [listAgenda, setlistAgenda] = useState<agenda[]>([]);
  const list: Iroles[] = JSON.parse(String(getRoles()));
  const listMenus: menus[] = JSON.parse(String(getMenus()));
  function verificarEscanearEnMenus(menusList: Iroles[]): boolean {
    for (const menu of menusList) {
      if (menu.ControlInterno === "ESCANEAR") {
        return true;
      }
    }
    return false;
  }

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

  const handleSend = () => {
    setopen(true);
    let data = {
      NUMOPERACION: 7,
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

        setlistAgenda(eveitem);
        setopen(false);
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        setopen(false);
      }
    });
  };

  useEffect(() => {
    handleSend();
  }, []);
  return (
    <div style={{ height: 500, width: "100%" }}>
      <TitleComponent title={"Agenda de Visitas"} show={open} />
      <Calendar
        culture="es"
        localizer={localizer}
        events={listAgenda}
        showAllEvents
        defaultView={"agenda"}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: "calc( 80rem - 80% )",
          margin: "1%",
        }}
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
              <div>
                <Grid
                  container
                  spacing={1} // Ajusta el espacio entre los elementos
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <p style={{ margin: "auto" }}>Visitante:</p>
                    <p style={{ margin: "auto" }}>
                      {titleObject?.visitante?.nombre}{" "}
                      {titleObject?.visitante?.apellidoP}{" "}
                      {titleObject?.visitante?.apellidoM}
                    </p>
                    <p style={{ margin: "auto" }}>Origen:</p>
                    <p style={{ margin: "auto" }}>
                      {titleObject?.visitante?.origen}
                    </p>
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{ margin: "auto" }}>Receptor:</p>
                    <p style={{ margin: "auto" }}>
                      {titleObject?.receptor?.nombre}{" "}
                      {titleObject?.receptor?.apellidoP}{" "}
                      {titleObject?.receptor?.apellidoM}
                    </p>
                    <p style={{ margin: "auto" }}>Unidad Operativa:</p>
                    <p style={{ margin: "auto" }}>
                      {titleObject?.receptor?.UnidadOperativa}
                    </p>
                  </Grid>
                </Grid>
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default VAgenda;
