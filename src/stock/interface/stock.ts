

export interface proveedorSeleccionadoI {
    id: string
    data: string
}
export interface ProductoSeleccionadoI {
    id: string
    data: string
}

export interface proveedorPropsI {
    seleccionado?: proveedorSeleccionadoI
    setSeleccionado: (data: proveedorSeleccionadoI) => void
}

export interface ProductoPropsI {
    seleccionado?: ProductoSeleccionadoI
    setSeleccionado: (data: ProductoSeleccionadoI) => void
}



export interface IngresoStockI {
    proveedor: string
    factura: string
    montoTotal: number
    cantidad: number
    fechaVencimiento: string
    producto: string
    precioUnitario: number,

    descuento: number,
    sudTotal: number
}


export interface stockCargadoI {
    cantidad: number
    fechaVencimiento: string
    producto: string
    precioUnitario: number,
    montoTotal: number
    descuento: number,
    sudTotal: number,
    nombreProducto: string

}

interface StockItem {
    cantidad: number;
    fechaVencimiento: Date; // puede ser Date si manejas objetos Date
    producto: string; // si usas ObjectId u otro tipo, lo ajustas
    precioUnitario: number;
    montoTotal: number;
    descuento: number;
    sudTotal: number;
}

// Interface para el objeto data principal
export interface RegistrarStockData {
    proveedor: string; // id del proveedor
    factura: string;
    montoTotal: number;
    stock: StockItem[];
}


export interface ListarStockI {
    _id: string
    cantidad: string
    categoria: string
    codigo: string
    fechaVencimiento: string
    producto: string
    unidadManejo: string
}