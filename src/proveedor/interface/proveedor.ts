export interface ProveedorI {
  _id: string;
  ci: string;
  nombre: string;
  apellidos: string;
  celular: string;
  empresa: string;
}

export interface BuscadorProveedorProps {
  nombre: string;
  setNombre: (v: string) => void;
  ci: string;
  setCi: (v: string) => void;
  celular: string;
  setCelular: (v: string) => void;
empresa: string;
  setEmpresa: (v: string) => void;
}
