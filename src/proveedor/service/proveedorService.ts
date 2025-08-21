import { instanceAxios } from "../../app/config/instanceAxios"
import type { ProveedorI } from "../interface/proveedor"


export async function createProveedor(data: ProveedorI) {
    try {
        const response = await instanceAxios.post('proveedor', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function listarProveedor(): Promise<ProveedorI[]> {
    try {
        const response = await instanceAxios.get('proveedor')
        return response.data
    } catch (error) {
        throw error
    }
}