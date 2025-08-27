import { instanceAxios } from "../../app/config/instanceAxios"
import type { DetalleVentaI } from "../interface/detalleVenta"
import type { ListarVentaI, RealizarVentaI } from "../interface/ventaInterface"


export async function realizarVenta(data: RealizarVentaI) {
    try {
        const reponse = await instanceAxios.post("venta", data)
        return reponse.data
    } catch (error) {
        throw error
    }
}


export async function listarVenta():Promise<ListarVentaI[]> {
    try {
        const reponse = await instanceAxios.get("venta")
        return reponse.data
    } catch (error) {
        throw error
    }
}



export async function detalleVenta(venta:string):Promise<DetalleVentaI[]> {
    try {
        const reponse = await instanceAxios.get(`detalle/venta/${venta}`)
        return reponse.data
    } catch (error) {
        throw error
    }
}