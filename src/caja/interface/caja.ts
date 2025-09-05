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

export interface ListarCajaI {
    _id: string
    fechaApertura: string;
    montoInicial: number;
    montoFinal: number;
    totalVentas: number;
    estado: string;
    fechaCierre: string;
    usuario: string;
}