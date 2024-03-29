import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import TitleComponent from "../componentes/TitleComponent";

const VEscanear = () => {
  const navigate = useNavigate();

  const handleScan = (scanData: any) => {
    if (scanData && scanData !== "") {
      navigate("/inicio/VisistasEscaneo/" + scanData.text);
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
