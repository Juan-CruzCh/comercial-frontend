import { useEffect, useState } from "react";
import { listarStock } from "../service/sotckService";
import type { ListarStockI } from "../interface/stock";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";

export const ListarStockPage = () => {
    const [data, setData] = useState<ListarStockI[]>([]);

    useEffect(() => {
        listar();
    }, []);

    const listar = async () => {
        try {
            const response = await listarStock();
            setData(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Listar Stock
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Producto</TableCell>

                            <TableCell>Categoría</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Unidad de Manejo</TableCell>
                            <TableCell>Fecha de Vencimiento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.codigo}</TableCell>
                                <TableCell>{item.producto}</TableCell>

                                <TableCell>{item.categoria}</TableCell>
                                <TableCell>{item.cantidad}</TableCell>
                                <TableCell>{item.unidadManejo}</TableCell>
                                <TableCell>{item.fechaVencimiento}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
