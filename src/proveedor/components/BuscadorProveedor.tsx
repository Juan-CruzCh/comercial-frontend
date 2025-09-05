import {
  Box,
  TextField,

} from "@mui/material";
import type { BuscadorProveedorProps } from "../interface/proveedor";

export const BuscadorProveedor = ({empresa,setEmpresa,celular,ci,nombre,setCelular,setCi,setNombre}:BuscadorProveedorProps) => {
  return (
    <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" p={2}>
      <TextField
        label="CI"
        variant="outlined"
        size="small"
        value={ci}
        onChange={(e) => setCi(e.target.value)} 
      />

      <TextField
        label="Nombre"
        variant="outlined"
        size="small"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)} 
      />

      <TextField
        label="Celular"
        variant="outlined"
        size="small"
        value={celular}
        onChange={(e) => setCelular(e.target.value)} // Captura cada letra
      />
      <TextField
        label="Empresa"
        variant="outlined"
        size="small"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)} // Captura cada letra
      />
    </Box>
  );
};
