import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../app/config/instanceAxios"
import type { ProductoI} from "../interface/producto"
import type { ResponseDataI } from "../../app/interface/responseData"



export async function crearProducto(data: ProductoI): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post('producto', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function listarProducto(codigo: string, nombre: string, categoria: string, unidadManejo: string, pagina:number, limite:number): Promise<ResponseDataI<ProductoI>> {
    try {
        const response = await instanceAxios.get('producto', {
            params:{
                codigo:codigo,
                categoria:categoria,
                nombreProducto: nombre,
                unidadManejo:unidadManejo,
                pagina:pagina,
                limite:limite
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}


