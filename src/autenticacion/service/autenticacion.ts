import type { AxiosResponse } from "axios";
import { instanceAxios } from "../../app/config/instanceAxios";
import type { LoginI } from "../interface/autenticacion";
import type { UsuarioI } from "../../usuario/interface/usuarioInterface";

export async function autenticacion(data: LoginI): Promise<AxiosResponse> {
    try {
        const reponse = await instanceAxios.post("autenticacion", data)
        return reponse
    } catch (error) {
        throw error
    }
}
export async function verificarAutenticacion(): Promise<UsuarioI> {
    try {
        const reponse = await instanceAxios.get("usuario/verificar")
        return reponse.data
    } catch (error) {
        throw error
    }
}