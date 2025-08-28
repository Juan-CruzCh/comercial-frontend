import { instanceAxios } from "../../app/config/instanceAxios"
import type { detalleIngresoI } from "../interface/detalleIngreso"
import type { IngresoI } from "../interface/ingresoInterface"

export async function listarInresos(): Promise<IngresoI[]> {
    try {
        const reponse = await instanceAxios.get("ingreso")
        return reponse.data
    } catch (error) {
        throw error
    }
}

export async function listarDetalleIngreso(id: string): Promise<detalleIngresoI[]> {
    try {
        const reponse = await instanceAxios.get(`detalle/ingreso/${id}`)
        return reponse.data
    } catch (error) {
        throw error
    }
}