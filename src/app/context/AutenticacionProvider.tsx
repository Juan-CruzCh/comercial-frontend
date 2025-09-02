import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { AuntenticacionContextI } from "../interface/auntenticacionContext"
import { verificarAutenticacion } from "../../autenticacion/service/autenticacion"

export const AuntenticacionContext = createContext<AuntenticacionContextI>({
    isAutenticacion: false,
    logout() {
    },
    setIsAutenticacion() {
    },


})
export const AutenticacionProvider = ({ children }: { children: ReactNode }) => {
    const [isAutenticacion, setisAutenticacion] = useState<boolean>(false)
    const logout = () => {

    }
    const setIsAutenticacion = (value: boolean) => {
        setisAutenticacion(value)

    }
    useEffect(() => {
        verificarA()
    }, [])

    const verificarA = async () => {
        try {
            const response = await verificarAutenticacion()
            if (response && response.status === 200) {
                setisAutenticacion(true)
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <AuntenticacionContext.Provider value={{ isAutenticacion, logout, setIsAutenticacion }}>
            {children}
        </AuntenticacionContext.Provider>
    )
}
