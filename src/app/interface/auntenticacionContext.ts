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
    loading: boolean
  

}