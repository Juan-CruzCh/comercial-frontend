export interface AuntenticacionContextI {
    isAutenticacion: boolean
    setIsAutenticacion: (value: boolean) => void
    logout: () => void
    sucursal:string,
    username:string
    nombres:string
    apellidos:string
    sucursalId:string,
    rol:string
    setApellidos?: (value: string) => void
    setNombres?: (value: string) => void
    setSucursal?: (value: string) => void
    setUsername?: (value: string) => void
    setRol?: (value: string) => void
    setSucursalID?:(v:string)=> void
}