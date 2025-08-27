import { instanceAxios } from "../../app/config/instanceAxios"
import type { SucursalI } from "../interface/sucursal"



export async function crearSucursal(data: SucursalI) {
    try {
        const reponse = await instanceAxios.post("sucursal", data)
        return reponse.data
    } catch (error) {
        throw error
    }
}

export async function listarSucursal(): Promise<SucursalI[]> {
    try {
        const reponse = await instanceAxios.get("sucursal")
        return reponse.data
    } catch (error) {
        throw error
    }
}