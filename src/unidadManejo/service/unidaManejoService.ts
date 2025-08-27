import { instanceAxios } from "../../app/config/instanceAxios"
import type { UnidadManejoI } from "../interface/unidaManejo"

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