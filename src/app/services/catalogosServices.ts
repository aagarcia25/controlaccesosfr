import { post, postDocument } from "./apiService";

export class CatalogosServices {
  public static async aniosindex(data: any) {
    return await post("aniosindex", data);
  }

  public static async visita_index(data: any) {
    return await post("visita_index", data);
  }

  public static async Filesindex(data: any) {
    return await post("Filesindex", data);
  }

  public static async Edificio_index(data: any) {
    return await post("Edificio_index", data);
  }
  public static async deleteVideoTutorial(data: any) {
    return await post("deleteVideoTutorial", data);
  }
  public static async bitacora(data: any) {
    return await post("bitacora", data);
  }
  public static async graficas(data: any) {
    return await post("graficas", data);
  }
  public static async Estudiante(data: any) {
    return await post("Estudiante", data);
  }
  public static async PersonalIndex(data: any) {
    return await post("PersonalIndex", data);
  }
  public static async migraData(data: any) {
    return await postDocument("migraData", data);
  }
}
