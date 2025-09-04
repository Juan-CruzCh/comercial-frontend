

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
    fechaVencimiento: Date;
    producto: string;
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
    descripcion: string
    precioUnitario: number
}
export interface BuscadorStockProps {
    codigo: string;
    setCodigo: (value: string) => void;
    nombre: string;
    setNombre: (value: string) => void;
    categoriaSeleccionada: string;
    setCategoriaSeleccionada: (value: string) => void;
    unidadSeleccionada: string;
    setUnidadSeleccionada: (value: string) => void;
}