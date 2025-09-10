import { useEffect, useState } from "react";
import { reporteVentas } from "../service/VentaService";
import type { ReporteVentasI } from "../interface/ventaInterface";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

export const ReporteVentasPage = () => {
    const [data, setData] = useState<ReporteVentasI[]>([]);

    useEffect(() => {
        reporte();
    }, []);

    const reporte = async () => {
        try {
            const response = await reporteVentas();
            if (response) {
                setData(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Usuario</strong></TableCell>
                        <TableCell><strong>Sucursal</strong></TableCell>
                        <TableCell><strong>Monto Total</strong></TableCell>
                        <TableCell><strong>Total Ganancia</strong></TableCell>
                        <TableCell><strong>Descuento Alquiler</strong></TableCell>
                        <TableCell><strong>Descuento Vendedor</strong></TableCell>
                        <TableCell><strong>Descuento Acumulado</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.usuario}</TableCell>
                            <TableCell>{row.sucursal}</TableCell>
                            <TableCell>{row.montoTotal.toFixed(2)}</TableCell>
                            <TableCell>{row.totalGanancia.toFixed(2)}</TableCell>
                            <TableCell>{row.descuentoAlquiller.toFixed(2)}</TableCell>
                            <TableCell>{row.descuentoVendedor.toFixed(2)}</TableCell>
                            <TableCell>{row.descuentoAcumulado.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
