import type { AxiosResponse } from "axios";
import { instanceAxios } from "../../app/config/instanceAxios";
import type { UsuarioI } from "../interface/usuarioInterface";


export async function crearUsuario(data: UsuarioI): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post("usuario", data)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function listarUsuarios(): Promise<UsuarioI[]> {
    try {
        const response = await instanceAxios.get("usuario")
        return response.data
    } catch (error) {
        throw error
    }
}
export async function usuarioLoguot(): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.get("usuario/logout")
        return response.data
    } catch (error) {
        throw error
    }
}

export async function eliminarUsuario(id:string): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.delete(`usuario/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function editarUsuario(data: UsuarioI, id :string): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.patch(`usuario/${id}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}