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
