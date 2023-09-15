import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { Visita } from "../../interfaces/Visitas";
import { CatalogosServices } from "../../services/catalogosServices";
import Progress from "../Progress";
import ModalForm from "../componentes/ModalForm";
import QRCode from "qrcode.react";

const VisitasModal = ({
  handleClose,
  id,
  tipo,
}: {
  handleClose: Function;
  id: string;
  tipo: number;
}) => {
  const [vrows, setVrows] = useState<Visita | null>(null);
  const [open, setopen] = useState(false);
  const [qrValue, setQrValue] = useState("");

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas: any = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleEscaneo = () => {
    let data = {
      NUMOPERACION: 6,
      CHID: id,
    };

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        console.log("Escaneo Correcto");
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  const handleSend = () => {
    setopen(true);

    let data = {
      NUMOPERACION: 5,
      CHID: id,
    };
    console.log(data);

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
        console.log(res.RESPONSE[0]);
        setVrows(res.RESPONSE[0]);
        setopen(false);
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  useEffect(() => {
    setQrValue(id);
    handleSend();
  }, []);
  return (
    <>
      <Progress open={open}></Progress>
      <ModalForm title={"Visita Generada QR"} handleClose={handleClose}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            item
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2%" }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
            >
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <b>Fecha</b>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <b>Entrada</b>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <b>Duración</b>
              </Grid>
            </Grid>

            <Grid container item xs={12} sm={12} md={12} lg={12}>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                {vrows?.FechaVisita}
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                {vrows?.FechaVisita}
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                {vrows?.Duracion} Horas
              </Grid>
            </Grid>

            <Grid container item xs={12} sm={12} md={12} lg={12}>
              <Grid item xs={4} sm={4} md={4} lg={4}></Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <b>Vistante</b>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}></Grid>
            </Grid>

            <Grid container item xs={12} sm={12} md={12} lg={12}>
              <Grid item xs={4} sm={4} md={4} lg={4}></Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                {vrows?.NombreVisitante} {vrows?.ApellidoPVisitante}{" "}
                {vrows?.ApellidoMVisitante}
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}></Grid>
            </Grid>

            {tipo == 0 ? (
              <Grid
                direction="column"
                justifyContent="center"
                alignItems="center"
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  "text-align": "center",
                }}
              >
                <Grid item xs={4} sm={4} md={4} lg={4}></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <QRCode
                    id="qr-gen"
                    value={qrValue}
                    size={200}
                    level={"H"}
                    includeMargin={true}
                  />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    spacing={2}
                    sx={{
                      "text-align": "center",
                    }}
                  >
                    <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
                    <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
                    <Grid item xs={12} sm={12} md={12} lg={2}>
                      <Button
                        className={"guardar"}
                        onClick={() => downloadQRCode()}
                      >
                        {"Descargar QR"}
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={2}>
                      <Button
                        className={"guardar"}
                        onClick={() => handleSend()}
                      >
                        {"Enviar QR"}
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
                    <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              ""
            )}

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{
                "text-align": "center",
              }}
            >
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <b>Elaborado por:</b>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                {vrows?.NombreReceptor} {vrows?.ApellidoMReceptor}{" "}
                {vrows?.ApellidoMReceptor}
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                {vrows?.entidadname} {vrows?.PisoReceptor}
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <b>Fecha y Hora elaboración:</b> {vrows?.FechaCreacion}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ModalForm>
    </>
  );
};

export default VisitasModal;
