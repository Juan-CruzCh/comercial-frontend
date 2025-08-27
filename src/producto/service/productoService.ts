import { instanceAxios } from "../../app/config/instanceAxios"
import type { ProductoI} from "../interface/producto"



export async function crearProducto(data: ProductoI): Promise<ProductoI> {
    try {
        const response = await instanceAxios.post('producto', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function listarProducto(): Promise<ProductoI[]> {
    try {
        const response = await instanceAxios.get('producto')
        return response.data
    } catch (error) {
        throw error
    }
}


