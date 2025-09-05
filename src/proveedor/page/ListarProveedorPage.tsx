import { useEffect, useState } from "react";
import type { ProveedorI } from "../interface/proveedor";
import { listarProveedor } from "../service/proveedorService";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    IconButton,
    Box,
    Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProveedorModal } from "../modal/CrearProveedor";
import { BuscadorProveedor } from "../components/BuscadorProveedor";
import { RealoadHook } from "../../app/hook/appHook";
import { paginador } from "../../app/hook/paginador";

export const ListarProveedorPage = () => {
    const [data, setData] = useState<ProveedorI[]>([]);
      const [ci, setci] = useState<string>("");
      const {reload,setReload}=RealoadHook()
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
        <TableContainer component={Paper} sx={{ maxHeight: 300, p: 2 }}>
            <ProveedorModal  reload={reload} setReload={setReload} />
        <BuscadorProveedor empresa={empresa} setEmpresa={setEmpresa} celular={celular} ci={ci} nombre={nombre} setCelular={setCelular} setCi={setci} setNombre={setnombre}  />
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>Apellidos</TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>CI</TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>Celular</TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((proveedor, index) => (
                        <TableRow key={index} hover>
                            <TableCell sx={{ fontSize: "0.75rem" }}>{proveedor.nombre}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem" }}>{proveedor.apellidos}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem" }}>{proveedor.ci}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem" }}>{proveedor.celular}</TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    <IconButton size="small" color="primary">
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="error">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
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
