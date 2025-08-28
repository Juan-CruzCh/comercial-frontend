import { instanceAxios } from "../../app/config/instanceAxios";
import type { ListarStockI, RegistrarStockData } from "../interface/stock";


export async function registrarStock(data: RegistrarStockData): Promise<{ ingreso: string }> {
    try {
        const reponse = await instanceAxios.post("stock", data)
        return reponse.data
    } catch (error) {
        throw error
    }

}

export async function listarStock(): Promise<ListarStockI[]> {
    try {
        const reponse = await instanceAxios.get("stock")
        return reponse.data
    } catch (error) {
        throw error
    }

}