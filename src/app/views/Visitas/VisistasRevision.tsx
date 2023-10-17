import { Button, Grid } from "@mui/material";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { base64ToArrayBuffer } from "../../helpers/Files";
import { Visita } from "../../interfaces/Visitas";
import { CatalogosServices } from "../../services/catalogosServices";
import TitleComponent from "../componentes/TitleComponent";

export const VisistasRevision = () => {
  const navigate = useNavigate();
  let params = useParams();
  const [vrows, setVrows] = useState<Visita | null>(null);
  const [open, setopen] = useState(false);
  const [qrValue, setQrValue] = useState("");

  const downloadQRCode = () => {
    setopen(true);
    let data = {
      NUMOPERACION: 12,
      CHID: params.id,
    };

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE));
        var blobStore = new Blob([bufferArray], {
          type: "application/pdf",
        });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = data;
        link.download = "QR.pdf";
        link.click();
        window.URL.revokeObjectURL(data);
        link.remove();
        setopen(false);
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        setopen(false);
      }
    });
  };

  const viewedit = () => {
    navigate("/inicio/visitas/" + params.id);
  };

  const handleRenviar = () => {
    let data = {
      NUMOPERACION: 11,
      CHID: params.id,
      EmailNotificacion: vrows?.EmailNotificacion,
    };
    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        Swal.fire("Se Envio Correo con el QR de la Visita", "¡Aviso!", "info");
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  const handleSend = () => {
    let data = {
      NUMOPERACION: 5,
      CHID: params.id,
    };

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        if (res.RESPONSE[0]) {
          setVrows(res.RESPONSE[0]);
          setopen(false);
        } else {
          Swal.fire({
            title: "QR no Valido",
            icon: "error",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Aceptar",
            background: "EBEBEB",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Por Favor, Verifique el QR", "¡Atención!", "info");
            }
          });
        }
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  useEffect(() => {
    setopen(true);
    setQrValue(params.id || "");
    handleSend();
  }, []);
  return (
    <>
      <TitleComponent title={"Visita Generada QR"} show={open} />
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
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <b>Fecha: </b>
              {vrows?.FechaVisita}
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <b>Entrada: </b>
              {vrows?.FechaVisita}
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <b>Duración: </b>
              {vrows?.Duracion} Horas / {vrows?.pisoreceptorrr}
            </Grid>
          </Grid>

          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <b>Vistante: </b>
              {vrows?.NombreVisitante} {vrows?.ApellidoPVisitante}{" "}
              {vrows?.ApellidoMVisitante}
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <b>Persona a Visitar: </b>
              {vrows?.NombreReceptor} {vrows?.ApellidoMReceptor}
              {vrows?.ApellidoPReceptor}
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <b>Dependencia: </b>
              {vrows?.entidadreceptor}
            </Grid>
          </Grid>

          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <b>Correo : </b>
              {vrows?.EmailNotificacion}
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}></Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}></Grid>
          </Grid>

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
            <Grid item xs={12} sm={4} md={4} lg={4}></Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <QRCode
                id="qr-gen"
                value={qrValue}
                size={200}
                level={"H"}
                includeMargin={true}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
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
                <Grid item xs={12} sm={12} md={12} lg={2}>
                  {params.id !== "" ? (
                    <Button className={"guardar"} onClick={() => viewedit()}>
                      {"Editar"}
                    </Button>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2}>
                  <Button
                    className={"guardar"}
                    onClick={() => downloadQRCode()}
                  >
                    {"Descargar QR"}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2}>
                  <Button className={"guardar"} onClick={() => handleRenviar()}>
                    {"Renviar QR"}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
                <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
