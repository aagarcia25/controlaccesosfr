export interface Visita {
  id: string;
  deleted: string;
  UltimaActualizacion: string;
  FechaCreacion: string;
  ModificadoPor: string;
  CreadoPor: string;
  FechaVisita: string;
  FechaEntrada: any;
  FechaSalida: any;
  Duracion: number;
  IdTipoAcceso: string;
  Proveedor: any;
  NombreVisitante: string;
  ApellidoPVisitante: string;
  ApellidoMVisitante: string;
  idTipoentidad: string;
  idEntidad: string;
  NombreReceptor: string;
  ApellidoPReceptor: string;
  ApellidoMReceptor: string;
  IdEntidadReceptor: string;
  PisoReceptor: string;
  IdEstatus: string;
  tiempo: string;
  entidadname: string;
  color: string;
  entidadreceptor: string;
  pisoreceptorrr: string;
  EmailNotificacion: string;
  Extencion: string;
  Indefinido: number;
  Observaciones: string;
}

export interface agenda {
  id?: string;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  color?: string;
  estatus?: string;
}

export interface Estudiante {
  Escolaridad: string;
  EstadoQR: string;
  FechaCreacion: string;
  FechaFin: string;
  FechaInicio: string;
  InstitucionEducativa: string;
  NoGaffete: string;
  Nombre: string;
  PersonaResponsable: string;
  Sexo: string;
  Telefono: string;
  TipoEstudiante: string;
  UltimaActualizacion: string;
  UnidadAdministrativa: string;
  creado: string;
  deleted: string;
  id: string;
  modi: string;
}
export const newEstudiante: Estudiante = {
  Escolaridad: "",
  EstadoQR: "",
  FechaCreacion: "",
  FechaFin: "",
  FechaInicio: "",
  InstitucionEducativa: "",
  NoGaffete: "",
  Nombre: "",
  PersonaResponsable: "",
  Sexo: "",
  Telefono: "",
  TipoEstudiante: "",
  UltimaActualizacion: "",
  UnidadAdministrativa: "",
  creado: "",
  deleted: "",
  id: "",
  modi: "",
};
