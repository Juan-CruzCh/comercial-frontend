export interface AuntenticacionContextI {
    isAutenticacion: boolean
    setIsAutenticacion: (value: boolean) => void
    logout: () => void
}