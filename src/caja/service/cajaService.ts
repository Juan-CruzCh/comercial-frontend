import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../app/config/instanceAxios"
import type { CajaI, ListarCajaI } from "../interface/caja"
import type { ResponseDataI } from "../../app/interface/responseData"


export async function abrirCaja(montoInicial: number): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post("abrir/caja", {
            montoInicial: Number(montoInicial)
        })
        return response.data
    } catch (error) {
        throw error
    }

}

export async function listarCajaPorUsuario(): Promise<CajaI> {
    try {
        const response = await instanceAxios.get("listar/caja/usuario")
        return response.data
    } catch (error) {
        throw error
    }

}
export async function cerrarCaja(): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post("cerrar/caja")
        return response.data
    } catch (error) {
        throw error
    }

}

export async function listarCajas(pagina: number, limite: number): Promise<ResponseDataI<ListarCajaI>> {
    try {
        const response = await instanceAxios.get("/listar/caja", {
            params: {
                limite: limite,
                pagina: pagina
            }
        })
        return response.data
    } catch (error) {
        throw error

    }
}