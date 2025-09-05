import { instanceAxios } from "../../app/config/instanceAxios"
import type { ResponseDataI } from "../../app/interface/responseData"
import type { DetalleVentaI } from "../interface/detalleVenta"
import type { ListarVentaI, RealizarVentaI } from "../interface/ventaInterface"


export async function realizarVenta(data: RealizarVentaI): Promise<{ idVenta: string }> {
    try {
        const reponse = await instanceAxios.post("venta", data)
        return reponse.data
    } catch (error) {
        throw error
    }
}


export async function listarVenta(paginaActual: number, limite: number): Promise<ResponseDataI<ListarVentaI>> {
    try {
        const reponse = await instanceAxios.get("venta", {
            params: {
                pagina: paginaActual,
                limite: limite
            }

        })
        return reponse.data
    } catch (error) {
        throw error
    }
}



export async function detalleVenta(venta: string): Promise<DetalleVentaI[]> {
    try {
        const reponse = await instanceAxios.get(`detalle/venta/${venta}`)
        return reponse.data
    } catch (error) {
        throw error
    }
}