import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { RegistrarSucursalModal } from "../modal/RegistrarSucursalModal";
import type { SucursalI } from "../interface/sucursal";
import { listarSucursal } from "../service/sucursalService";



export const ListarSucursalPage = () => {
    const [sucursales, setSucursales] = useState<SucursalI[]>([]);

    useEffect(() => {
        listar()
    }, [])

    const listar = async () => {
        try {
            const response = await listarSucursal()
            if (response) {
                setSucursales(response)
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
            <Typography variant="h5" gutterBottom textAlign="center">
                Listado de Sucursales
            </Typography>
            <RegistrarSucursalModal />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Nombre</b></TableCell>
                            <TableCell><b>Direccion</b></TableCell>
                            <TableCell align="center"><b>Acciones</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sucursales.map((sucursal) => (
                            <TableRow key={sucursal._id}>
                                <TableCell>{sucursal.nombre}</TableCell>
                                <TableCell>{sucursal.direccion}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"

                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"

                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
