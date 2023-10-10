import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesES } from "../../helpers/getMessages";
import { localizer } from "../../helpers/calendarLocalizer";
import { Calendar } from "react-big-calendar";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import Swal from "sweetalert2";
import Progress from "../Progress";
import { getUser } from "../../services/localStorage";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { agenda } from "../../interfaces/Visitas";
import VisitasModal from "../Visitas/VisitasModal";
import { useNavigate } from "react-router-dom";
import TitleComponent from "../componentes/TitleComponent";

const VAgenda = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [open, setopen] = useState(false);
  const [listAgenda, setlistAgenda] = useState<agenda[]>([]);
  const [openModal, setopenModal] = useState(false);

  const handleClose = () => {
    navigate("/");
  };

  const onSelectEvent = (v: any) => {
    if (v.estatus == "0779435b-5718-11ee-b06d-3cd92b4d9bf4") {
      Swal.fire("Cita Finalizada, no se puede modificar", "¡Error!", "info");
    } else {
      if (v.color != "#EC7063") {
        setId(v.id);
        setopenModal(true);
      } else {
        Swal.fire("Cita Vencida, no se puede modificar", "¡Error!", "info");
      }
    }
  };

  const handleSend = () => {
    setopen(true);
    let data = {
      NUMOPERACION: 7,
      CHID: user.Id,
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
        eventPropGetter={(listAgenda) => {
          const backgroundColor = listAgenda.color ? listAgenda.color : "blue";
          const color = "white";
          return { style: { backgroundColor, color } };
        }}
      />
      {openModal ? (
        <VisitasModal handleClose={handleClose} id={id} tipo={0} />
      ) : (
        ""
      )}
    </div>
  );
};

export default VAgenda;
