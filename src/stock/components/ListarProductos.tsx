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
} from "@mui/material";
import { RegistrarUnidadManejoModal } from "../../unidadManejo/modal/RegistrarUnidadManejoModal";
import { RegistrarCategoriaModal } from "../../categoria/modal/RegistrarCategoriaModal";
import { RegistrarProductoModal } from "../modal/RegistrarProductoModal";
import { useEffect, useState } from "react";
import { listarProducto } from "../../producto/service/productoService";
import type { ProductoI } from "../../producto/interface/producto";
import type { proveedorPropsI } from "../interface/stock";

export const ListarProductos = ({ setSeleccionado }: proveedorPropsI) => {
    const [productos, setproductos] = useState<ProductoI[]>([]);

    useEffect(() => {
        listar();
    }, []);

    const listar = async () => {
        try {
            const response = await listarProducto();
            setproductos(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 400, p: 2 }}>
            {/* Botones en fila */}
            <Box display="flex" gap={2} mb={2}>
                <RegistrarProductoModal />
                <RegistrarUnidadManejoModal />
                <RegistrarCategoriaModal />
            </Box>

            {/* Tabla */}
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>Código</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>Nombre</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>Descripción</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>Categoría</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>Unidad de Manejo</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>Acción</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productos.map((producto, index) => (
                        <TableRow key={index} hover>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>
                                {producto.codigo}
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>
                                {producto.nombre}
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>
                                {producto.descripcion}
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>
                                {producto.categoria}
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>
                                {producto.unidadManejo}
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>
                                <Button size="small" variant="contained" color="primary"
                                    onClick={() => {
                                        if (producto._id) {
                                            setSeleccionado({
                                                id: producto._id,
                                                data: `${producto.codigo} ${producto.nombre} ${producto.categoria} ${producto.unidadManejo}`
                                            })
                                        }
                                    }}
                                >

                                    Seleccionar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
