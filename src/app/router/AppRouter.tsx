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
import AdminAyudas from "../views/AdminVideosTutoriales/AdminAyudas";
import { VisistasRevision } from "../views/Visitas/VisistasRevision";
import { VisistasEscaneo } from "../views/Visitas/VisistasEscaneo";
import VisitasExpress from "../views/Visitas/VisitasExpress";

export const AppRouter = ({ login }: { login: boolean }) => {
  const log = login;
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const handleChangeImg = () => {};
  const handleCloseModal = () => {};
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
        <Route
          path="/inicio/ayuda"
          element={
            log ? (
              <AdminAyudas
                IdMenu={""}
                modo={""}
                tipo={0}
                handleClose={handleCloseModal}
                dt={undefined}
              />
            ) : (
              <AuthRouter />
            )
          }
        />
        {/* SECCION DE VISITAS */}
        <Route
          path="/inicio/visitasexpress"
          element={log ? <VisitasExpress /> : <AuthRouter />}
        />

        <Route
          path="/inicio/visitas"
          element={log ? <Visitas /> : <AuthRouter />}
        />
        <Route
          path="/inicio/VisistasEscaneo/:id"
          element={log ? <VisistasEscaneo /> : <AuthRouter />}
        />

        <Route
          path="/inicio/visitas/:id"
          element={log ? <Visitas /> : <AuthRouter />}
        />
        <Route
          path="/inicio/visitasGNRL"
          element={log ? <VisitasGeneral /> : <AuthRouter />}
        />
        <Route
          path="/inicio/view/:id"
          element={log ? <VisistasRevision /> : <AuthRouter />}
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
