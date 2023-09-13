import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesES } from "../../helpers/getMessages";
import { localizer } from "../../helpers/calendarLocalizer";
import { Calendar } from "react-big-calendar";

const VAgenda = () => {
  const today = new Date();

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Calendar
        culture="es"
        localizer={localizer}
        events={[
          {
            id: 0,
            title: "All Day Event very long title",
            allDay: true,
            start: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              9
            ),
            end: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ),
          },
        ]}
        showAllEvents
        defaultView={"agenda"}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: "calc( 80rem - 80% )",
          margin: "1%",
        }}
        messages={getMessagesES()}
        //  onSelectSlot={(v) => SelectSlot(v)}
        selectable
        popup={true}
        // min={
        //   new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9)
        // }
        // max={
        //   new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18)
        // }
      />
    </div>
  );
};

export default VAgenda;
