import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../app/config/instanceAxios"
import type { descuentoVentaI } from "../interface/descuentoVenta"


export async function listarDescuentoVenta(): Promise<descuentoVentaI[]> {
    try {
        const response = await instanceAxios.get("/descuento/venta")
        return response.data
    } catch (error) {
        throw error
    }

}
export async function CrearDescuentoVenta(data: descuentoVentaI): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post("/descuento/venta", data)
        return response.data
    } catch (error) {
        throw error
    }

}