import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { Visita } from "../../interfaces/Visitas";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import TitleComponent from "../componentes/TitleComponent";

export const VisistasEscaneo = () => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  let params = useParams();
  const navigate = useNavigate();
  const [vrows, setVrows] = useState<Visita | null>(null);
  const [open, setopen] = useState(false);

  const handlesalir = () => {
    navigate("/");
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

  const handleEscaneo = () => {
    let data = {
      NUMOPERACION: 6,
      CHID: params.id,
      CHUSER: user.Id,
    };

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        let data = {
          NUMOPERACION: 8,
          CHID: params.id,
          CHUSER: user.Id,
        };
        CatalogosServices.visita_index(data).then((resultado) => {
          if (resultado.SUCCESS) {
            if (resultado.RESPONSE[0].Finalizado === 0) {
              if (resultado.RESPONSE[0].Descripcion === "En Visita") {
                handleSend();
                Swal.fire(
                  "Se ha Registrado la Fecha de Entrada de la Visita",
                  "!Aviso!",
                  "info"
                );
              } else if (resultado.RESPONSE[0].Descripcion === "Finalizado") {
                handleSend();
                Swal.fire(
                  "Se ha Registrado la Fecha de Salida de la Visita",
                  "!Aviso!",
                  "info"
                );

                let data = {
                  NUMOPERACION: 10,
                  CHID: params.id,
                  CHUSER: user.Id,
                };

                CatalogosServices.visita_index(data).then((res) => {
                  if (res.SUCCESS) {
                  } else {
                    Swal.fire(res.STRMESSAGE, "¡Error!", "info");
                  }
                });
              }
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
                  navigate("/");
                }
              });
            }
          } else {
            Swal.fire(res.STRMESSAGE, "¡Error!", "info");
          }
        });
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  useEffect(() => {
    handleEscaneo();
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
              {vrows?.NombreReceptor} {vrows?.ApellidoMReceptor}{" "}
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
            <Grid item xs={12} sm={4} md={4} lg={4}></Grid>

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
                <Grid item xs={12} sm={12} md={12} lg={4}></Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <Button className={"guardar"} onClick={() => handlesalir()}>
                    {"Salir"}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
