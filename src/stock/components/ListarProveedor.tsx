import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import { listarProveedor } from "../../proveedor/service/proveedorService";
import type { ProveedorI } from "../../proveedor/interface/proveedor";
import { ProveedorModal } from "../../proveedor/modal/CrearProveedor";
import type { proveedorPropsI } from "../interface/stock";
import { RealoadHook } from "../../app/hook/appHook";
import { BuscadorProveedor } from "../../proveedor/components/BuscadorProveedor";
import { paginador } from "../../app/hook/paginador";
export const ListarProveedor = ({ setSeleccionado }: proveedorPropsI) => {
  const [data, setData] = useState<ProveedorI[]>([]);
  const { reload, setReload } = RealoadHook();
  const [ci, setci] = useState<string>("");
  const [nombre, setnombre] = useState<string>("");
  const [celular, setCelular] = useState<string>("");
   const [empresa, setEmpresa] = useState<string>("");
  const {limite,paginaActual,paginas,setPaginaActual,setpaginas }=paginador()

  useEffect(() => {
    listar();
  }, [reload, nombre, ci, celular, empresa, paginaActual]);
  const listar = async () => {
    try {
      const response = await listarProveedor(ci, nombre, celular, empresa,  paginaActual, limite);
      if (response && response.Data.length > 0) {
        setData(response.Data);
        setpaginas(response.Paginas)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
      <ProveedorModal reload={reload} setReload={setReload} />
      <BuscadorProveedor empresa={empresa} setEmpresa={setEmpresa} celular={celular} ci={ci} nombre={nombre} setCelular={setCelular} setCi={setci} setNombre={setnombre}  />
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
              CI
            </TableCell>
            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
              Nombre
            </TableCell>
            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
              Apellidos
            </TableCell>

            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
              Celular
            </TableCell>  <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
              Empresa
            </TableCell>
            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
              Accion
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((proveedor, index) => (
            <TableRow key={index}>
              <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
                {proveedor.ci}
              </TableCell>
              <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
                {proveedor.nombre}
              </TableCell>
              <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
                {proveedor.apellidos}
              </TableCell>
              <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
                {proveedor.celular}
              </TableCell>
               <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
                {proveedor.empresa}
              </TableCell>
              <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSeleccionado({
                      id: proveedor._id,
                      data: `${proveedor.nombre} ${proveedor.apellidos}`,
                    });
                  }}
                >
                  Seleccionar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={paginas}
                    page={paginaActual}
                    onChange={(_: React.ChangeEvent<unknown>, value: number)=> setPaginaActual(value)}
                
                    size="small"
           
                />
            </Box>
    </TableContainer>
  );
};
