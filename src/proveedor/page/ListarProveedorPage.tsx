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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProveedorModal } from "../modal/CrearProveedor";

export const ListarProveedorPage = () => {
    const [data, setData] = useState<ProveedorI[]>([]);

    useEffect(() => {
        listar();
    }, []);

    const listar = async () => {
        try {
            const response = await listarProveedor();
            if (response) {
                setData(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 300, p: 2 }}>
            <ProveedorModal />
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
        </TableContainer>
    );
};
