import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import type { ListarCajaI } from "../interface/caja"
import { useEffect, useState } from "react"
import { listarCajas } from "../service/cajaService"
import { paginador } from "../../app/hook/paginador"

export const ListarCajaPage = () => {
    const [data, setdata] = useState<ListarCajaI[]>([])
    const { limite, paginaActual, paginas, setPaginaActual, setpaginas } = paginador()
    useEffect(() => {
        listar()
    }, [paginaActual])
    const listar = async () => {
        try {
            const response = await listarCajas(paginaActual, limite)
            if (response && response.Data.length > 0) {
                setdata(response.Data)
                setpaginas(response.Paginas)
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Monto Inicial</TableCell>
                        <TableCell>Total Ventas</TableCell>
                        <TableCell>Monto Final</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Fecha Apertura</TableCell>
                        <TableCell>Fecha Cierre</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((caja) => (
                        <TableRow key={caja._id}>
                            <TableCell>{caja.usuario}</TableCell>
                            <TableCell>{caja.montoInicial.toFixed(2)}</TableCell>
                            <TableCell>{caja.totalVentas.toFixed(2)}</TableCell>
                            <TableCell>{caja.montoFinal.toFixed(2)}</TableCell>
                            <TableCell>{caja.estado}</TableCell>
                            <TableCell>{caja.fechaApertura.replace("T", " ").substring(0, 19)}</TableCell>
                            <TableCell>{caja.fechaCierre.replace("T", " ").substring(0, 19)}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={paginas}
                    page={paginaActual}
                    onChange={(_: React.ChangeEvent<unknown>, value: number) => setPaginaActual(value)}

                    size="small"

                />
            </Box>
        </TableContainer>
    )
}
