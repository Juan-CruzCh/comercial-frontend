export interface IngresoI {
  _id: string
  codigo: string
  factura: string
  fecha: string
  proveedorApoellido: string
  proveedorNombre: string
  montoTotal:number,
  totalDescuento:number,
  sudTotal:number,
  usuario:string
}
