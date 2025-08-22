import { instanceAxios } from "../../app/config/instanceAxios"
import type { ProductoI, UnidadManejoI } from "../interface/producto"



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
export async function crearUndiadManejo(data: UnidadManejoI) {
    try {
        const response = await instanceAxios.post('unidad/manejo', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function listarUndiadManejo(): Promise<UnidadManejoI[]> {
    try {
        const response = await instanceAxios.get('unidad/manejo')
        return response.data
    } catch (error) {
        throw error
    }
}

