export interface User {
  name?: string;
  email: string;
  password: string;
  repeatPassword?: string;
}

export interface UserLogin {
  IdUsuario: string;
  NombreUsuario: string;
  exp: number;
  iat: number;
}

export interface imagen {
  CreadoPor: string;
  Descripcion: string;
  FechaCreacion: string;
  FechaFin: string;
  FechaInicio: string;
  Imagen: string;
  ModificadoPor: string;
  Nombre: string;
  UltimaActualizacion: string;
  deleted: string;
  id: string;
}

export interface ROLE {
  Nombre: string;
  Descripcion: string;
}

export interface MENU {
  Menu: string;
  Descripcion: string;
  ControlInterno: string;
  items: any;
}

export interface PERMISO {
  ControlInterno: string;
  Referencia: string;
  Menu: string;
}

export interface ITEMS {
  Id: string;
  deleted: string;
  UltimaActualizacion: string;
  FechaCreacion: string;
  ModificadoPor: string;
  CreadoPor: string;
  Menu: string;
  Descripcion: string;
  MenuPadre: string;
  Icon: string;
  Path: string;
  Nivel: number;
  Orden: number;
  ControlInterno: string;
  subitems: any[];
}

export interface RESPONSESTORAGE {
  NOMBRE: string;
  TIPO: string;
  SIZE: number;
  FILE: string;
}

export interface RESPONSEVIDEOS {
  NombreOriginalVideo: string;
  RutaVideo: string;
}

export interface RESPONSEPREGUNTASFRECUENTES {
  id: string;
  Pregunta: string;
  Texto: string;
}

export interface RESPONSEGUIARAPIDA {
  id: string;
  Pregunta: string;
  RutaGuia: string;
}

export interface USUARIORESPONSE {
  Id: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  NombreUsuario: string;
  CorreoElectronico: string;
  Puesto: string;
  CURP: string;
  RFC: string;
  Telefono: string;
  Ext: string;
  Celular: string;
  IdTipoUsuario: string;
  TipoUsuario: string;
  EstaActivo: number;
  PuedeFirmar: number;
  UltimoInicioDeSesion: string;
  Deleted: number;
  IdApp: string;
  Aplicacion: string;
  IdEntidad: string;
  Entidad: string;
  ControlInternoEntidad: any;
  IdEntidadPerteneceA: any;
  EntidadPerteneceA: any;
  IdTipoEntidad: string;
  TipoEntidad: string;
  RutaFoto: string;
}

export interface UserInfo {
  NUMCODE: number;
  STRMESSAGE: string;
  RESPONSE: USUARIORESPONSE;
  SUCCESS: boolean;
}
