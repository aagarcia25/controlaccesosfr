
import { post } from './apiService';

export class CatalogosServices {

 
    public static async aniosindex(data : any) {
        return await post('aniosindex', data);
    };


        public static async Filesindex(data : any) {
        return await post('Filesindex', data);
    };

    
}
