import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { USUARIORESPONSE } from "../interfaces/UserInfo";
import { getUser } from "../services/localStorage";
import VAgenda from "../views/Agenda/VAgenda";
import Bienvenido from "../views/Bienvenido";
import { Eo404 } from "../views/Eo404";
import Inicio from "../views/Inicio";
import Visitas from "../views/Visitas/Visitas";
import { Perfil } from "../views/perfil/Perfil";
import { AuthRouter } from "./AuthRouter";
import VEscanear from "../views/Escanear/VEscanear";
import VisitasGeneral from "../views/Visitas/VisitasGeneral";
import { Edificio } from "../views/Edificio/Edificio";

export const AppRouter = ({ login }: { login: boolean }) => {
  const log = login;
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const handleChangeImg = () => {};

  useEffect(() => {
    handleChangeImg();
  }, []);

  return (
    <Inicio user={user} imgData={String("")} imgTipo={String("")}>
      <Routes>
        <Route path="/*" element={log ? <Eo404 /> : <AuthRouter />} />
        <Route
          path="/"
          element={log ? <Bienvenido user={user} /> : <AuthRouter />}
        />

        {/* SECCION DE VISITAS */}
        <Route
          path="/inicio/visitas"
          element={log ? <Visitas editid={""} /> : <AuthRouter />}
        />
        <Route
          path="/inicio/visitasGNRL"
          element={log ? <VisitasGeneral /> : <AuthRouter />}
        />
        <Route
          path="/inicio/edificio"
          element={log ? <Edificio /> : <AuthRouter />}
        />

        {/* SECCION DE VISITAS */}

        {/* SECCION DE ESCANEO */}
        <Route
          path="/inicio/es"
          element={log ? <VEscanear /> : <AuthRouter />}
        />
        {/* FIN SECCION DE ESCANEO */}

        {/* SECCION DE AGENDA */}
        <Route
          path="/inicio/agenda"
          element={log ? <VAgenda /> : <AuthRouter />}
        />
        {/* FIN SECCION DE AGENDA */}

        {/* SECCION DE CATALOGOS */}

        {/* SECCION DE PERFIL */}
        <Route
          path="/perfil"
          element={
            <Perfil
              handleChangeImg={handleChangeImg}
              imgData={""}
              imgTipo={""}
            />
          }
        />
        {/* FIN SECCION DE PERFIL */}
      </Routes>
    </Inicio>
  );
};
