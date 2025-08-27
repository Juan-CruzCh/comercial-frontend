export interface StockSeleccionadoI {
    stock:string
    codigo:string
    nombre:string
    precioUnitario:number
    cantidad:number
    montoTotal:number
}

export interface RealizarVentaI {
  sudTotal: number
  descuento: number
  montoTotal:number
  detalleVenta: DetalleVentaI[]
}

export interface DetalleVentaI {
  stock: string
  cantidad: number
  precioTotal: number
  precioUnitario:number,
  descripcionProducto: string
}


export interface ListarVentaI {
  _id: string;
  codigo: string;
  descuento: number;
  fechaVenta: string;
  montoTotal: number;
  subTotal: number;
  vendedor: string;
  sucursal: string;
}