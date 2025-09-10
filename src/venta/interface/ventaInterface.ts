export interface StockSeleccionadoI {
  stock: string
  codigo: string
  nombre: string
  precioUnitario: number
  cantidad: number
  montoTotal: number
}

export interface RealizarVentaI {
  descuento: number
  detalleVenta: DetalleVentaI[]
}

export interface DetalleVentaI {
  stock: string
  cantidad: number
  precioUnitario: number,
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

export interface VentaPorIdI {
  codigo: string;
  usuario: string;
  fechaVenta: string
  detalleVenta: detalleVentaPorIdI[];
  sucursal: string;
  montoTotal: number;
  subTotal: number;
  descuento: number;
}


export interface detalleVentaPorIdI {
  _id: string;
  cantidad: number;
  descripcion: string;
  fecha: string;
  flag: string;
  precioTotal: number;
  precioUnitario: number;
  producto: string;
  stock: string;
  venta: string;
}



export interface BuscadorVentasI {
  sucursal: string
  usuario: string
  codigo: string
  fechaInicio: string
  fechaFin: string
}
export interface ReporteVentasI {
  _id: string
  descuentoAcumulado
  :
  number
  descuentoAlquiller
  :
  number
  descuentoVendedor
  :
  number
  montoTotal
  :
  number
  sucursal
  :
  string
  totalGanancia
  :
  number
  usuario
  :
  number
}