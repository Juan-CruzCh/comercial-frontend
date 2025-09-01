import type { AxiosResponse } from "axios";
import { instanceAxios } from "../../app/config/instanceAxios";
import type { LoginI } from "../interface/autenticacion";

export async function autenticacion(data: LoginI): Promise<AxiosResponse> {
    try {
        const reponse = await instanceAxios.post("autenticacion", data)
        return reponse
    } catch (error) {
        throw error
    }
}
export async function verificarAutenticacion(): Promise<AxiosResponse> {
    try {
        const reponse = await instanceAxios.post("autenticacion/verificar")
        return reponse
    } catch (error) {
        throw error
    }
}