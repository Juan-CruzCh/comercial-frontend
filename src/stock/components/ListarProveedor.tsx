import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

// Ejemplo de datos de proveedores
const proveedores = [
    { nombre: "Juan", apellidos: "Chocllu", ci: "123456", celular: "78901234" },
    { nombre: "María", apellidos: "Perez", ci: "654321", celular: "98765432" },
    { nombre: "Carlos", apellidos: "Lopez", ci: "112233", celular: "55667788" },
];

export const ListarProveedor = () => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Button>nuevo</Button>
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
                    {proveedores.map((proveedor, index) => (
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
