import { instanceAxios } from "../../app/config/instanceAxios"
import type { CategoriaI } from "../interface/categoria"

export async function crearCategoria(data: CategoriaI) {
    try {
        const response = await instanceAxios.post('categoria', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function listarCategoria(): Promise<CategoriaI[]> {
    try {
        const response = await instanceAxios.get('categoria')
        return response.data
    } catch (error) {
        throw error
    }
}
