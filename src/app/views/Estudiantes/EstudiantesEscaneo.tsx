import { useNavigate, useParams } from "react-router-dom";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import { useEffect, useState } from "react";
import { Estudiante } from "../../interfaces/Visitas";
import { CatalogosServices } from "../../services/catalogosServices";
import Swal from "sweetalert2";
import { Button, Grid, Typography } from "@mui/material";
import TitleComponent from "../componentes/TitleComponent";


export const EstudiantesEscaneo = () => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  let params = useParams();
  const navigate = useNavigate();
  const [vrows, setVrows] = useState<Estudiante | null>(null);

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

  // const handlesalida = () => {
  //   let data = {
  //     NUMOPERACION: 14,
  //     CHID: params.id,
  //     CHUSER: user.Id,
  //   };

  //   CatalogosServices.visita_index(data).then((res) => {
  //     if (res.SUCCESS) {
  //       Swal.fire({
  //         title: "!Exito!",
  //         icon: "success",
  //         html: "Se Registro la Fecha de Salida, el QR ya no es Valido",
  //         showDenyButton: false,
  //         showCancelButton: false,
  //         confirmButtonText: "Aceptar",
  //         background: "EBEBEB",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           navigate("/");
  //         }
  //       });
  //     } else {
  //       Swal.fire(res.STRMESSAGE, "¡Error!", "info");
  //     }
  //   });
  // };

  const handleSend = () => {
    let data = {
      NUMOPERACION: 4,
      CHID: params.id,
    };

    CatalogosServices.Estudiante(data).then((res) => {
      console.log("res",res);
      
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
      NUMOPERACION: 7, // Operación específica para estudiantes
      CHID: params.id, // ID del QR escaneado
    };

    CatalogosServices.Estudiante(data).then((resultado) => {
      console.log("resultado",resultado);

      if (resultado.SUCCESS) {
        if (resultado.RESPONSE && resultado.RESPONSE.datos) {
          handleSend();

          setVrows(resultado.RESPONSE.datos); // Guarda los datos del estudiante
          setopen(false); // Cierra el estado de "escaneo"
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
              navigate("/"); // Redirige al usuario si el QR no es válido
            }
          });
        }
      } else {
        Swal.fire({
          title: "¡Error!",
          text: resultado.STRMESSAGE,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };


  useEffect(() => {
    console.log("vrows",vrows);
    
    handleEscaneo();
  }, []);

  return (
    <>
      <TitleComponent title={"Estudiante QR"} show={open} />
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
                {/* {vrows?.Indefinido == 1 ? (
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
                )} */}
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
                <b>Periodo: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {/* {formatFecha(vrows?.FechaVisita)} */}
                {(vrows?.FechaInicio)}

              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              {/* {vrows?.FechaEntrada ? (
                <>
                  <Typography
                    sx={{ fontFamily: "sans-serif", fontSize: "30px" }}
                  >
                    <b>Entrada: </b>
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "sans-serif", fontSize: "30px" }}
                  > */}
                    {/* {formatFecha(vrows?.FechaEntrada)} */}
                  {/* </Typography>
                </>
              ) : (
                ""
              )} */}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Horario: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {/* {vrows?.Duracion} Horas / {vrows?.pisoreceptorrr} */}
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
                <b>Estudiante: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {vrows?.Nombre} 
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Unidad Administrativa: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {vrows?.UnidadAdministrativa}
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Persona Responsable:</b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
              {vrows?.PersonaResponsable}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Horas Acumuladas: </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {/* {vrows?.entidadreceptor} */}
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
              {/* <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                <b>Observaciones : </b>
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                {vrows?.Observaciones}
              </Typography> */}
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
                {/* {vrows?.EmailNotificacion} */}
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
                  {/* {vrows?.FechaEntrada ? (
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
                  )} */}
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
