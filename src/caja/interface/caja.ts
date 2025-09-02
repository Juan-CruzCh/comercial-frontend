export interface CajaI {
    Egresos: number;
    Estado: "ABIERTO" | "CERRADO"
    Fecha: string;
    FechaApertura: string;
    FechaCierre: string;
    Flag: "NUEVO" | "ELIMINADO";
    ID: string;
    MontoFinal: number;
    MontoInicial: number;
    TotalVentas: number;
    Usuario: string;
}
