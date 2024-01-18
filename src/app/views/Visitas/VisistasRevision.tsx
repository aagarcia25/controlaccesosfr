import { Button, Grid, Typography } from "@mui/material";
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
    setopen(true);
    let data = {
      NUMOPERACION: 11,
      CHID: params.id,
      EmailNotificacion: vrows?.EmailNotificacion,
    };
    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        setopen(false);
        Swal.fire("Se Envio Correo con el QR de la Visita", "¡Aviso!", "info");
      } else {
        setopen(false);
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
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {params.id !== "" && (
                <Button
                  className="guardar"
                  onClick={viewedit}
                  style={{ margin: 10 }}
                >
                  Editar
                </Button>
              )}
              <Button
                className="guardar"
                onClick={downloadQRCode}
                style={{ margin: 10 }}
              >
                Descargar QR
              </Button>
              <Button
                className="guardar"
                onClick={handleRenviar}
                style={{ margin: 10 }}
              >
                Renviar QR
              </Button>
            </Grid>
          </Grid>
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Fecha de Registro: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b> {vrows?.FechaVisita} </b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Extención : </b>
              </Typography>

              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b> {vrows?.Extencion}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Duración: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>
                  {vrows?.Duracion} Horas / {vrows?.pisoreceptorrr}{" "}
                </b>
              </Typography>
            </Grid>
          </Grid>

          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Vistante: </b>
              </Typography>

              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>
                  {vrows?.NombreVisitante} {vrows?.ApellidoPVisitante}{" "}
                  {vrows?.ApellidoMVisitante}
                </b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Persona a Visitar: </b>
              </Typography>

              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>
                  {vrows?.NombreReceptor} {vrows?.ApellidoMReceptor}{" "}
                  {vrows?.ApellidoPReceptor}
                </b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Dependencia: </b>
              </Typography>

              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>{vrows?.entidadreceptor}</b>
              </Typography>
            </Grid>
          </Grid>

          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Correo : </b>
              </Typography>

              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b> {vrows?.EmailNotificacion}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <QRCode
                id="qr-gen"
                value={qrValue}
                size={200}
                level="H"
                includeMargin={true}
                style={{ display: "block", margin: "auto" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
