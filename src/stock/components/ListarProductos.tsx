import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { RegistrarUnidadManejoModal } from "../../producto/modal/RegistrarUnidadManejoModal";
import { RegistrarCategoriaModal } from "../../categoria/modal/RegistrarCategoriaModal";
import { RegistrarProductoModal } from "../modal/RegistrarProductoModal";
import { useEffect, useState } from "react";
import { listarProducto } from "../../producto/service/productoService";
import type { ProductoI } from "../../producto/interface/producto";



export const ListarProductos = () => {
    const [productos, setproductos] = useState<ProductoI[]>([]);
    useEffect(() => {
        listar()
    }, [])

    const listar = async () => {
        try {
            const response = await listarProducto()
            setproductos(response)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <RegistrarProductoModal />
            <RegistrarUnidadManejoModal />
            <RegistrarCategoriaModal />
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Código</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Nombre</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Descripción</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Categeoria</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Unidad de Manejo</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Accion</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productos.map((producto, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>{producto.codigo}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>{producto.nombre}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>{producto.descripcion}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>{producto.categoria}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>{producto.unidadManejo}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}><Button>Seleccionar</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
