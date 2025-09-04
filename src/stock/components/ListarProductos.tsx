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
    Pagination,          // Importa Pagination
} from "@mui/material";

import { RegistrarUnidadManejoModal } from "../../unidadManejo/modal/RegistrarUnidadManejoModal";
import { RegistrarCategoriaModal } from "../../categoria/modal/RegistrarCategoriaModal";

import { useEffect, useState } from "react";
import { listarProducto } from "../../producto/service/productoService";
import type { ProductoI } from "../../producto/interface/producto";
import type { proveedorPropsI } from "../interface/stock";
import { RegistrarProductoModal } from "../../producto/modal/RegistrarProductoModal";
import { BuscadorProducto } from "../../producto/components/BuscadorProducto";
import { paginador } from "../../app/hook/paginador";

export const ListarProductos = ({ setSeleccionado }: proveedorPropsI) => {
    const [productos, setproductos] = useState<ProductoI[]>([]);
    const [reload, setreload] = useState<boolean>(false);
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [unidadSeleccionada, setUnidadSeleccionada] = useState("");
    const { limite, paginas,  setpaginas ,paginaActual,setPaginaActual} = paginador();


    useEffect(() => {
        listar();
    }, [reload, codigo, nombre, categoriaSeleccionada, unidadSeleccionada, paginaActual]);

    const listar = async () => {
        try {
            const response = await listarProducto(
                codigo,
                nombre,
                categoriaSeleccionada,
                unidadSeleccionada,
                paginaActual,
                limite
            );
            if (response && response.Data.length > 0) {
                setproductos(response.Data);
                setpaginas(response.Paginas); 
            } else {
                setproductos([]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 800, p: 2 }}>
            <BuscadorProducto
                categoriaSeleccionada={categoriaSeleccionada}
                codigo={codigo}
                setCategoriaSeleccionada={setCategoriaSeleccionada}
                nombre={nombre}
                setCodigo={setCodigo}
                setNombre={setNombre}
                setUnidadSeleccionada={setUnidadSeleccionada}
                unidadSeleccionada={unidadSeleccionada}
            />
            <Box display="flex" gap={2} mb={2}>
                <RegistrarProductoModal setReload={setreload} reload={reload} />
                <RegistrarUnidadManejoModal />
                <RegistrarCategoriaModal />
            </Box>

        
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "6px 8px" }}>Código de producto</TableCell>
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
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        if (producto._id) {
                                            setSeleccionado({
                                                id: producto._id,
                                                data: `${producto.codigo} ${producto.nombre} ${producto.categoria} ${producto.unidadManejo}`,
                                            });
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
