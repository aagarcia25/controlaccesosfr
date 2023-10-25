/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, Typography } from "@mui/material";
import imgGobEst from "../assets/img/logo1.svg";

const Validacion = () => {
  const onClickLogin = () => {
    localStorage.clear();
    var ventana = window.self;
    ventana.opener = window.self;
    ventana.close();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "3vw",
              fontWeight: "bold",
            }}
          >
            Error 401: Autorización Requerida
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.6vw",
            }}
          >
            Favor de Validar sus Accesos con el Personal correspondiente
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "75%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img style={{ width: "30vw", height: "90vh" }} src={imgGobEst} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "15vw",
              height: "5vh",
            }}
          >
            <Button
              onClick={() => onClickLogin()}
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                borderColor: "#5048E5",
                borderRadius: 1,
                color: "#5048E5",
                "&:hover": {
                  color: "#5048E5",
                  backgroundColor: "#eeebf5",
                },
              }}
            >
              Volver al inicio de sesión
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Validacion;
