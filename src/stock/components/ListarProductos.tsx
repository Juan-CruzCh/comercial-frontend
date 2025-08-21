import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const productos = [
    { codigo: "P001", nombre: "Producto 1", descripcion: "Descripción del producto 1", unidad: "Caja" },
    { codigo: "P002", nombre: "Producto 2", descripcion: "Descripción del producto 2", unidad: "Unidad" },
    { codigo: "P003", nombre: "Producto 3", descripcion: "Descripción del producto 3", unidad: "Paquete" },
];

export const ListarProductos = () => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Button>nuevo</Button>
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Código</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Nombre</TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>Descripción</TableCell>
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
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}>{producto.unidad}</TableCell>
                            <TableCell sx={{ fontSize: "0.75rem", padding: "4px 8px" }}><Button>Seleccionar</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
