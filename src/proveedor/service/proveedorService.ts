import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../app/config/instanceAxios"
import type { ProveedorI } from "../interface/proveedor"
import type { ResponseDataI } from "../../app/interface/responseData"


export async function createProveedor(data: ProveedorI):Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post('proveedor', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function listarProveedor(ci:string, nombre:string, celular:string, empresa:string, pagina:number, limite:number): Promise<ResponseDataI<ProveedorI>> {
    try {
        const response = await instanceAxios.get('proveedor', {
            params:{
                ci:ci,
                nombre:nombre,
                celular:celular,
                empresa:empresa,
                pagina:pagina,
                limite:limite
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}