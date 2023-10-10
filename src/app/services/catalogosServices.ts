import { post } from "./apiService";

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
}
