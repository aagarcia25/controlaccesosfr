import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { Visita } from "../../interfaces/Visitas";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import TitleComponent from "../componentes/TitleComponent";
import { formatFecha } from "../../helpers/FormatDate";

export const VisistasEscaneo = () => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  let params = useParams();
  const navigate = useNavigate();
  const [vrows, setVrows] = useState<Visita | null>(null);
  const [open, setopen] = useState(false);

  const handlesalir = () => {
    navigate("/");
  };

  const handleentrada = () => {
    let data = {
      NUMOPERACION: 13,
      CHID: params.id,
      CHUSER: user.Id,
    };

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        Swal.fire({
          title: "!Exito!",
          icon: "success",
          html: "Se Registro la Fecha de Ingreso",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          background: "EBEBEB",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  const handlesalida = () => {
    let data = {
      NUMOPERACION: 14,
      CHID: params.id,
      CHUSER: user.Id,
    };

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        Swal.fire({
          title: "!Exito!",
          icon: "success",
          html: "Se Registro la Fecha de Salida, el QR ya no es Valido",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          background: "EBEBEB",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
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

  const handleEscaneo = () => {
    setopen(true);

    let data = {
      NUMOPERACION: 8,
      CHID: params.id,
      CHUSER: user.Id,
    };
    CatalogosServices.visita_index(data).then((resultado) => {
      if (resultado.SUCCESS) {
        if (resultado.RESPONSE.length > 0) {
          handleSend();
        } else {
          Swal.fire({
            title: "QR no Valido ",
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
        Swal.fire(resultado.STRMESSAGE, "¡Error!", "info");
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography
                sx={{
                  fontFamily: "sans-serif",
                  fontSize: "30px",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                {vrows?.Indefinido == 1 ? (
                  <>
                    <Typography
                      variant="h5"
                      component="h5"
                      sx={{ fontFamily: "sans-serif", color: "black" }}
                    >
                      QR Sin Vigencia
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontFamily: "sans-serif", color: "black" }}
                    >
                      Permite el Acceso y salida hasta que se confirme la Salida
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h5"
                      component="h5"
                      sx={{ fontFamily: "sans-serif", color: "black" }}
                    >
                      QR de Visita
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontFamily: "sans-serif", color: "black" }}
                    >
                      Valido para Ingreso y salida el mismo dia de la visita
                    </Typography>
                  </>
                )}
              </Typography>
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
                <b>Fecha Visita: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {formatFecha(vrows?.FechaVisita)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              {vrows?.FechaEntrada ? (
                <>
                  <Typography
                    sx={{ fontFamily: "sans-serif", fontSize: "30px" }}
                  >
                    <b>Entrada: </b>
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "sans-serif", fontSize: "30px" }}
                  >
                    {formatFecha(vrows?.FechaEntrada)}
                  </Typography>
                </>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Duración: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {vrows?.Duracion} Horas / {vrows?.pisoreceptorrr}
              </Typography>
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
                <b>Vistante: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {vrows?.NombreVisitante} {vrows?.ApellidoPVisitante}{" "}
                {vrows?.ApellidoMVisitante}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Persona a Visitar: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {vrows?.NombreReceptor} {vrows?.ApellidoMReceptor}{" "}
                {vrows?.ApellidoPReceptor}
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Extensión :</b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {vrows?.Extencion}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Dependencia: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {vrows?.entidadreceptor}
              </Typography>
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
                <b>Observaciones : </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {vrows?.Observaciones}
              </Typography>
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
                <b>Correo : </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {vrows?.EmailNotificacion}
              </Typography>
            </Grid>
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
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  {vrows?.FechaEntrada ? (
                    <>
                      <Button
                        className={"registrar"}
                        onClick={() => handlesalida()}
                      >
                        {"Registrar Salida"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      className={"registrar"}
                      onClick={() => handleentrada()}
                    >
                      {"Registrar Entrada"}
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <Button className={"registrar"} onClick={() => handlesalir()}>
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
