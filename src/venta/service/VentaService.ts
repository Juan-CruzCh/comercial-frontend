import { instanceAxios } from "../../app/config/instanceAxios"
import type { RealizarVentaI } from "../interface/ventaInterface"


export async function realizarVenta(data: RealizarVentaI) {
    try {
        const reponse = await instanceAxios.post("venta", data)
        return reponse.data
    } catch (error) {
        throw error
    }
}