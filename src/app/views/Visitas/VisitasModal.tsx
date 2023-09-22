import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { Visita } from "../../interfaces/Visitas";
import { CatalogosServices } from "../../services/catalogosServices";
import Progress from "../Progress";
import ModalForm from "../componentes/ModalForm";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
import Visitas from "./Visitas";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";

const VisitasModal = ({
  handleClose,
  id,
  tipo,
}: {
  handleClose: Function;
  id: string;
  tipo: number;
}) => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const navigate = useNavigate();
  const [vrows, setVrows] = useState<Visita | null>(null);
  const [open, setopen] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [openview, setopenview] = useState(false);
  const [openedit, setopenedit] = useState(false);

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

  const viewedit = () => {
    setopenedit(true);
  };

  const handleEscaneo = () => {
    let data = {
      NUMOPERACION: 6,
      CHID: id,
      CHUSER: user.Id,
    };

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        let data = {
          NUMOPERACION: 8,
          CHID: id,
          CHUSER: user.Id,
        };
        CatalogosServices.visita_index(data).then((resultado) => {
          if (resultado.SUCCESS) {
            if (resultado.RESPONSE[0].Finalizado == 0) {
              setopenview(true);
              if (resultado.RESPONSE[0].Descripcion == "En Visita") {
                Swal.fire(
                  "Se ha Registrado la Fecha de Entrada de la Visita",
                  "!Aviso!",
                  "info"
                );
              } else if (resultado.RESPONSE[0].Descripcion == "Finalizado") {
                Swal.fire(
                  "Se ha Registrado la Fecha de Salida de la Visita",
                  "!Aviso!",
                  "info"
                );

                let data = {
                  NUMOPERACION: 10,
                  CHID: id,
                  CHUSER: user.Id,
                };
                console.log(data);

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

  const handleSend = () => {
    let data = {
      NUMOPERACION: 5,
      CHID: id,
    };
    console.log(data);

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        if (res.RESPONSE[0]) {
          setVrows(res.RESPONSE[0]);
          if (tipo == 1) {
            setopenview(false);
            handleEscaneo();
          } else {
            setopenview(true);
            setopen(false);
          }
        } else {
          setopenview(false);
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
        setopenview(false);
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
      {openedit ? <Visitas editid={id}></Visitas> : ""}
      {openview ? (
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
                      <Grid item xs={12} sm={12} md={12} lg={2}>
                        {id !== "" ? (
                          <Button
                            className={"guardar"}
                            onClick={() => viewedit()}
                          >
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
                  {vrows?.ApellidoPReceptor}
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  {vrows?.entidadreceptor}
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  {vrows?.pisoreceptorrr}
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <b>Fecha y Hora elaboración:</b>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  {vrows?.FechaCreacion}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ModalForm>
      ) : (
        ""
      )}
    </>
  );
};

export default VisitasModal;
