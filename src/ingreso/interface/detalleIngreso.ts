
export interface detalleIngresoI {
    _id: string
    cantidad: number;
    precioUnitario: number;
    precioUnitarioTotal: number;
    precioUnitarioCompra: number;
    precioUnitarioTotalCompra: number;
    descuento: number;
    subTotal: number;
    fechaVencimiento: string;
    producto: string;
    descripcion: string;
    codigoStock: string;
    categoria: string;
    unidadManejo: string;
}