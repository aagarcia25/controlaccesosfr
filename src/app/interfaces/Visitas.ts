export interface Visita {
    id: string
  deleted: string
  UltimaActualizacion: string
  FechaCreacion: string
  ModificadoPor: string
  CreadoPor: string
  FechaVisita: string
  FechaEntrada: any
  FechaSalida: any
  Duracion: number
  IdTipoAcceso: string
  Proveedor: any
  NombreVisitante: string
  ApellidoPVisitante: string
  ApellidoMVisitante: string
  idTipoentidad: string
  idEntidad: string
  NombreReceptor: string
  ApellidoPReceptor: string
  ApellidoMReceptor: string
  IdEntidadReceptor: string
  PisoReceptor: string
  IdEstatus: string
  tiempo: string
  entidadname: string
  color: string
  entidadreceptor: string
  pisoreceptorrr: string
}

export interface agenda { 
 id: string
  title: string
  allDay: boolean
  start: Date
  end: Date
  color?: string
  estatus?:string
}