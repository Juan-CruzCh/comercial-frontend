import { instanceAxios } from "../../app/config/instanceAxios";
import type { RegistrarStockData } from "../interface/stock";


export async function registrarStock(data: RegistrarStockData) {
    try {
        const reponse = await instanceAxios.post("stock", data)
        return reponse.data
    } catch (error) {
        throw error
    }

}