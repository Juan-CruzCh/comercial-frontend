import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../app/config/instanceAxios"
import type { CajaI } from "../interface/caja"


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