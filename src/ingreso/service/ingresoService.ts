import { instanceAxios } from "../../app/config/instanceAxios"
import type { IngresoI } from "../interface/ingresoInterface"

export async function listarInresos():Promise<IngresoI[]> {
    try {
        const reponse = await instanceAxios.get("ingreso")
        return reponse.data
    } catch (error) {
        throw error
    }
}