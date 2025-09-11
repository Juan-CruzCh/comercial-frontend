export interface IngresoI {
  _id: string
  codigo: string
  factura: string
  fecha: string
  proveedorApoellido: string
  proveedorNombre: string
  precioUnitarioTotal: number,
  precioUnitarioTotalCompra: number
  totalDescuento: number,
  cantidadTotal: number
  sudTotal: number,
  usuario: string
}

