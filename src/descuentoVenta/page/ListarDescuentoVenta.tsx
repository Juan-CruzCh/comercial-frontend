import { useEffect, useState } from "react"
import type { descuentoVentaI } from "../interface/descuentoVenta"
import { listarDescuentoVenta } from "../service/descuentoVenta"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DescuentoVentaModal } from "../modal/DescuentoVentaModal"

export const ListarDescuentoVenta = () => {
    const [data, setdata] = useState<descuentoVentaI[]>([])
    useEffect(() => {

        listar()

    }, [])

    const listar = async () => {
        try {
            const response = await listarDescuentoVenta()
            if (response) {
                setdata(response)
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <TableContainer component={Paper}>
            <DescuentoVentaModal />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Alquiler</strong></TableCell>
                        <TableCell><strong>Vendedor</strong></TableCell>
                        <TableCell><strong>Sucursal</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.alquiler} %</TableCell>
                            <TableCell>{row.vendedor} %</TableCell>
                            <TableCell>{row.sucursal}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
