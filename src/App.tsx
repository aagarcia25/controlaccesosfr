import jwt_decode from "jwt-decode";
import { useLayoutEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { HashRouter } from "react-router-dom";
import Swal from "sweetalert2";
import "./Fonts.css";
import "./Globals.css";
import { USUARIORESPONSE, UserLogin } from "./app/interfaces/UserInfo";
import { AppRouter } from "./app/router/AppRouter";
import { UserServices } from "./app/services/UserServices";
import {
  getIdApp,
  getRfToken,
  getToken,
  getUser,
  setIdApp,
  setMenus,
  setPermisos,
  setRfToken,
  setRoles,
  setToken,
  setUser,
} from "./app/services/localStorage";
import { BloqueoSesion } from "./app/views/BloqueoSesion";
import Slider from "./app/views/Progress";
import Validacion from "./app/views/Validacion";

function App() {
  //cambiar a 5 minutos
  const timeout = 960000;
  const urlParams = window.location.search;
  const query = new URLSearchParams(urlParams);
  const jwt = query.get("jwt");
  const refjwt = query.get("rf");
  const idapp = query.get("IdApp");

  const [openSlider, setOpenSlider] = useState(true);
  const [bloqueoStatus, setBloqueoStatus] = useState<boolean>();
  const [login, setlogin] = useState<boolean>(false);
  const [acceso, setAcceso] = useState(false);
  const [contrseñaValida, setContraseñaValida] = useState(true);

  const buscaUsuario = (id: string) => {
    let data = {
      IdUsuario: id,
      IdApp: JSON.parse(String(getIdApp())),
    };

    UserServices.userAppDetail(data).then((res) => {
      if (res?.status === 200) {
        setUser(res.data.data);
        setRoles(res.data.roles[0]);
        setMenus(res.data.menus[0]);
        setPermisos(
          res.data.permisos[0] === undefined ? [] : res.data.permisos[0]
        );

        setBloqueoStatus(false);
        setOpenSlider(false);
        setAcceso(true);
        setlogin(true);
      } else if (res.status === 401) {
        setOpenSlider(false);
        setlogin(false);
        setAcceso(false);
      }
    });
  };

  const verificatoken = (primerInicio: boolean) => {
    UserServices.verify({}).then((res) => {
      if (res?.status === 200) {
        buscaUsuario(res.data.data.IdUsuario);
        setBloqueoStatus(false);
        setOpenSlider(false);
        if (!primerInicio) {
          var ventana = window.self;
          ventana.location.reload();
        }
      } else if (res.status === 401) {
        setOpenSlider(false);
        setlogin(false);
        setAcceso(false);
      }
    });
  };

  const handleOnActive = (password: string, user: string) => {
    const decoded: UserLogin = jwt_decode(String(getToken()));
    const userInfo: USUARIORESPONSE = JSON.parse(String(getUser()));
    let data = {
      NombreUsuario: decoded.NombreUsuario
        ? decoded.NombreUsuario
        : userInfo.NombreUsuario,
      Contrasena: password,
    };
    setOpenSlider(true);
    UserServices.login(data).then((res) => {
      if (res.status === 200) {
        setContraseñaValida(true);
        setToken(res.data.token);
        setRfToken(res.data.refreshToken);
        var ventana = window.self;
        ventana.location.reload();

        if (!getUser() || getUser() === undefined) {
          verificatoken(false);
        }
      } else if (res.status === 401) {
        setContraseñaValida(false);
        Swal.fire({
          title: res.data.msg,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            setAcceso(false);
            localStorage.clear();
            var ventana = window.self;
            ventana.location.replace(
              String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)
            );
          }
        });
      }
    });
  };

  const handleOnIdle = () => {
    setBloqueoStatus(true);
    setAcceso(false);
  };

  const { } = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
  });

  useLayoutEffect(() => {
    if (jwt && refjwt && getToken() && getRfToken()) {
      localStorage.clear();
    }

    if (
      !getToken() &&
      !getRfToken() &&
      jwt !== null &&
      refjwt !== null &&
      !acceso &&
      bloqueoStatus === undefined
    ) {
      const decoded: UserLogin = jwt_decode(String(jwt));
      if ((decoded.exp - Date.now() / 1000) / 60 > 5) {
        setToken(jwt);
        setRfToken(refjwt);
        setIdApp(idapp);
        var ventana = window.self;
        ventana.location.replace(process.env.REACT_APP_APPLICATION_BASE_REDIRECT!);
      } else {
        Swal.fire({
          title: "Token no valido",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            var ventana = window.self;
            ventana.location.replace(
              String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)
            );
          }
        });
      }
    }

    if (
      !jwt &&
      !refjwt &&
      bloqueoStatus === undefined &&
      !acceso &&
      !login &&
      getToken() &&
      getRfToken()
    ) {
      const decoded: UserLogin = jwt_decode(String(getToken()));
      if ((decoded.exp - Date.now() / 1000) / 60 > 5) {
        verificatoken(true);
      } else {
        handleOnIdle();
      }
    } else {
      setOpenSlider(false);
    }
  }, [bloqueoStatus]);

  return (
    <div>
      <Slider open={openSlider}></Slider>
      {bloqueoStatus ? (
        <BloqueoSesion handlePassword={handleOnActive} />
      ) : acceso ? (
        <>
          <HashRouter basename={"/"}>
            <AppRouter login={login} />
          </HashRouter>
        </>
      ) : !contrseñaValida ? (
        <Validacion />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
