import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Itrazabilidadvisita } from "../../interfaces/Share";
import { CatalogosServices } from "../../services/catalogosServices";
import Progress from "../Progress";
import ModalForm from "./ModalForm";

const Trazabilidad = ({
  handleFunction,
  obj,
}: {
  handleFunction: Function;
  obj: any;
}) => {
  const [openSlider, setOpenSlider] = useState(true);
  const [data, setdata] = useState<Itrazabilidadvisita[]>([]);
  const consulta = () => {
    let data = {
      NUMOPERACION: 7,
      CHID: obj.id,
    };
    CatalogosServices.bitacora(data).then((res) => {
      if (res.SUCCESS) {
        const obj: Itrazabilidadvisita[] = res.RESPONSE;
        setdata(obj);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
      }
    });
  };

  useEffect(() => {
    consulta();
  }, [obj]);

  return (
    <div>
      <ModalForm
        title={"Trazabilidad de la Operación"}
        handleClose={handleFunction}
      >
        <Progress open={openSlider}></Progress>

        <Timeline position="alternate">
          {data.map((it) => {
            return (
              <TimelineItem key={Math.random()}>
                <TimelineOppositeContent key={Math.random()}>
                  <Typography variant="body2" component="span">
                    {it.FechaCreacion}
                  </Typography>
                </TimelineOppositeContent>

                <TimelineSeparator key={Math.random()}>
                  <TimelineDot sx={{ bgcolor: "rgb(175, 140, 85)" }} />
                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent sx={{ py: "12px", px: 2 }} key={Math.random()}>
                  <Typography variant="h6" component="span">
                    {it.usuario}
                  </Typography>
                  <br />
                  <Typography variant="body2" component="span">
                    {it.estatus}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </ModalForm>
    </div>
  );
};

export default Trazabilidad;
