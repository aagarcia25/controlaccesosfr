import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import VisitasModal from "../Visitas/VisitasModal";
import ModalForm from "../componentes/ModalForm";

const VEscanear = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  const [id, setId] = useState("");
  const [startScan, setStartScan] = useState(false);
  const [openModal, setopenModal] = useState(false);

  const handleSend = () => {
    setStartScan(!startScan);
  };

  const handleScan = (scanData: any) => {
    if (scanData && scanData !== "") {
      setStartScan(false);
      setId(scanData.text);
      setopenModal(true);
    }
  };

  return (
    <>
      <ModalForm title={"Escanear QR"} handleClose={handleClose}>
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
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={5} lg={5}></Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <Button className={"guardar"} onClick={() => handleSend()}>
                  {startScan ? "Detener " : "Escanear QR"}
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={3}></Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"center"}>
                {startScan ? (
                  <>
                    <Typography variant="h6">
                      <b>Acerque el QR a la Camara</b>
                    </Typography>

                    <QrReader
                      scanDelay={300}
                      constraints={{ facingMode: "environment" }}
                      onResult={handleScan}
                    />
                  </>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ModalForm>
      {openModal ? (
        <VisitasModal handleClose={handleClose} id={id} tipo={1} />
      ) : (
        ""
      )}
    </>
  );
};

export default VEscanear;
