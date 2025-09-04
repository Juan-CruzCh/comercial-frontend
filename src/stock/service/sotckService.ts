import { instanceAxios } from "../../app/config/instanceAxios";
import type { ResponseDataI } from "../../app/interface/responseData";
import type { ListarStockI, RegistrarStockData } from "../interface/stock";


export async function registrarStock(data: RegistrarStockData): Promise<{ ingreso: string }> {
    try {
        const reponse = await instanceAxios.post("stock", data)
        return reponse.data
    } catch (error) {
        throw error
    }

}

export async function listarStock(codigo: string, nombre: string, categoria: string, unidadManejo: string, pagina:number, limite:number): Promise<ResponseDataI<ListarStockI>> {
    try {
        const reponse = await instanceAxios.get("stock", {
            params: {
                codigo: codigo,
                nombreProducto: nombre,
                categoria: categoria,
                unidadManejo: unidadManejo,
                pagina:pagina,
                limite:limite

            }
        })
        return reponse.data
    } catch (error) {
        throw error
    }

}