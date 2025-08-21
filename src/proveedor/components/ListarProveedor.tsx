import { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper
} from "@mui/material";
import { ProveedorModal } from "../modal/CrearProveedor";
import type { ProveedorI } from "../interface/proveedor";
import { listarProveedor } from "../service/proveedorService";



export const ListarProveedor = () => {

    const [proveedores, setProveedores] = useState<ProveedorI[]>([]);
    useEffect(() => {
        listar()
    }, [])
    const listar = async () => {
        try {
            const response = await listarProveedor()
            setProveedores(response)
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <TableContainer component={Paper}>
            <ProveedorModal />
            <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                        <TableCell><strong>CI</strong></TableCell>
                        <TableCell><strong>Nombre</strong></TableCell>
                        <TableCell><strong>Apellidos</strong></TableCell>
                        <TableCell><strong>Empresa</strong></TableCell>
                        <TableCell><strong>Celular</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {proveedores.map((prov, index) => (
                        <TableRow key={index}>
                            <TableCell>{prov.ci}</TableCell>
                            <TableCell>{prov.nombre}</TableCell>
                            <TableCell>{prov.apellidos}</TableCell>
                            <TableCell>{prov.empresa}</TableCell>
                            <TableCell>{prov.celular}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
