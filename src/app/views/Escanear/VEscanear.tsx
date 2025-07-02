import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import TitleComponent from "../componentes/TitleComponent";
import { CatalogosServices } from "../../services/catalogosServices";

const VEscanear = () => {
  const navigate = useNavigate();

  // const handleScan = (scanData: any) => {
  //   console.log("scanData",JSON.stringify(scanData));
    
  //   if (scanData && scanData !== "") {
  //   console.log("scanData2",JSON.stringify(scanData));

  //     navigate("/inicio/VisistasEscaneo/" + scanData.text);
  //   }
  // };

  // const EsEstudiante = (v: string) =>{
  //   let data = {
  //     Destinatario: v,
  //     NUMOPERACION: 7,
  //   };
  // }

  const handleScan = (scanData: any) => {
    console.log("scanData", JSON.stringify(scanData));

    if (scanData && scanData !== "") {
      const identificador = scanData.text;

      let data = {
        CHID: identificador,
        NUMOPERACION: 7,
      };

      // Llamar al servicio con el objeto de datos
      CatalogosServices.Estudiante(data).then((res) => {
        if (res.SUCCESS) {
          const response = res.RESPONSE; // Accede a RESPONSE
          if (response.tabla === "Visitas") {
            navigate(`/inicio/VisistasEscaneo/${identificador}`);
          } else if (response.tabla === "Estudiantes") {
            navigate(`/inicio/EstudiantesEscaneo/${identificador}`);
          } else {
            alert("El ID no pertenece a ninguna tabla.");
          }
        } else {
          console.error("Error al consultar el servicio:", res.STRMESSAGE);
          alert("Hubo un error al consultar el servicio.");
        }
      }).catch((error) => {
        console.error("Error en la solicitud:", error);
        alert("Error en la solicitud al servidor.");
      });
    }
  };

  return (
    <>
      <TitleComponent title={"Acerque el QR a la Cámara"} show={false} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
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
            item
            xs={12}
            sm={12}
            md={12}
            lg={3}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"center"}>
              <>
                <QrReader
                  scanDelay={300}
                  constraints={{ facingMode: "environment" }}
                  onResult={handleScan}
                />
              </>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default VEscanear;
