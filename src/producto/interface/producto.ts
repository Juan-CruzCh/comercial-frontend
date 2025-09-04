export interface ProductoI {
    _id?: string
    nombre: string
    categoria: string
    unidadManejo: string
    descripcion: string
    codigo?: string
}


export interface BuscadorProductoProps {
    codigo: string;
    setCodigo: (value: string) => void;
    nombre: string;
    setNombre: (value: string) => void;
    categoriaSeleccionada: string;
    setCategoriaSeleccionada: (value: string) => void;
    unidadSeleccionada: string;
    setUnidadSeleccionada: (value: string) => void;
}