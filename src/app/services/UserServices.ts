import axios from "axios";
import { UserLogin } from "../interfaces/UserInfo";
import { get, post, postRefresh, postSingle, putPass } from "./apiServiceExt";
import { getToken, setToken } from "./localStorage";

import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { log } from "node:console";

export class UserServices {
  public static verify(data: any) {
    return post("verify", data);
  }

  public static async userDetail(data: any) {
    return await post("user-detail", data);
  }

  public static async userAppDetail(data: any) {
    return await post("userapp-detail", data);
  }

  public static async login(data: any) {
    return await postSingle("login", data);
  }

  public static async refreshToken() {
    return await postRefresh("refresh-token");
  }

  public static async createsolicitud(data: any) {
    return await post("create-solicitud", data);
  }

  public static async detalleSol(data: string) {
    return await get("detalleSol?" + data);
  }

  public static async solicitudesapp(data: string) {
    return await get("solicitudes-app?" + data);
  }

  public static async changepassword(data: any) {
    return await putPass("change-password", data);
  }

  public static async verificarEntidadEspecial( bandera:"Especial"|"Piso",setState: Function,setState2:Function){
  
  
    const response = await axios.get(process.env.REACT_APP_APPLICATION_BASE_URL + "verificarEntidadEspecial?CHID=" + localStorage.getItem("idEntidad") || "", {
      headers: {
        Authorization: getToken(), // Agregar el token en el header
        "Content-Type": "application/json"
      }
    });
    if (bandera === "Especial")setState(response.data.esEntidadEspecial)
    if (bandera === "Piso"){
      setState(response?.data?.datos?.idPiso||"")
      setState2(response?.data?.datos?.NombrePiso||"")
    }
      //if (bandera === "Piso" && setState2) setState2(response.data.datos.NombrePiso);
    ///if (bandera === "Piso")setState({"id":response.data.datos.idPiso,"nombre":response.data.datos.NombrePiso} )


}
}

export const ValidaSesion = () => {
  const decoded: UserLogin = jwt_decode(String(getToken()));
  if ((decoded.exp - Date.now() / 1000) / 60 < 5) {
    UserServices.refreshToken().then((resAppLogin) => {
      if (resAppLogin.status === 200) {
        setToken(resAppLogin.data?.token);
        // onClickChangePassword();
        return "Sesion Refrescada";
      } else {
        Swal.fire({
          title: "Sesión Demasiado Antigua",
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
        return false;
      }
    });
  } else {
    return "Sesion Valida";
  }
};



// export const 