import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { listarProveedor } from "../../proveedor/service/proveedorService";
import type { ProveedorI } from "../../proveedor/interface/proveedor";
import { ProveedorModal } from "../../proveedor/modal/CrearProveedor";


export const ListarProveedor = () => {
    const [data, setData] = useState<ProveedorI[]>([])
    useEffect(() => {
        listar()
    }, [])
    const listar = async () => {
        try {
            const response = await listarProveedor()
            setData(response)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <ProveedorModal />
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Nombre</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Apellidos</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>CI</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Celular</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Accion</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((proveedor, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>{proveedor.nombre}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>{proveedor.apellidos}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>{proveedor.ci}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>{proveedor.celular}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}><Button>Seleccionar</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
