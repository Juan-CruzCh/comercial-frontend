import { useState, useEffect } from "react";
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
import { CrearUsuarios } from "../modal/CrearUsuarios";
import { listarUsuarios } from "../service/usuarioService";
import type { UsuarioI } from "../interface/usuarioInterface";



export const ListarUsuarioPage = () => {
    const [usuarios, setUsuarios] = useState<UsuarioI[]>([]);


    const handleEditar = (usuario: UsuarioI) => {
        console.log("Editar usuario:", usuario);
    };

    const handleEliminar = (usuario: UsuarioI) => {
        console.log("Eliminar usuario:", usuario);
        setUsuarios((prev) => prev.filter((u) => u.ci !== usuario.ci));
    };
    useEffect(() => {
        listarUsuario()
    }, [])

    const listarUsuario = async () => {
        try {
            const response = await listarUsuarios()
            if (response) {
                setUsuarios(response)
            }
        } catch (error) {

        }
    }
    return (
        <Box sx={{ p: 2 }}>
            <Typography
                variant="h6"
                sx={{ mb: 3, fontWeight: "bold", textAlign: "center", fontSize: 18 }}
            >
                Listado de Usuarios
            </Typography>
            <CrearUsuarios />
            <TableContainer component={Paper}>
                <Table size="small"> 
                    <TableHead sx={{ backgroundColor: "#e0f2fe" }}>
                        <TableRow>
                            <TableCell sx={{ fontSize: 12 }}>CI</TableCell>
                            <TableCell sx={{ fontSize: 12 }}>Nombre</TableCell>
                            <TableCell sx={{ fontSize: 12 }}>Apellidos</TableCell>
                            <TableCell sx={{ fontSize: 12 }}>Usuario</TableCell>
                            <TableCell sx={{ fontSize: 12 }}>Sucursal</TableCell>
                            <TableCell sx={{ fontSize: 12 }}>Rol</TableCell>
                            <TableCell sx={{ fontSize: 12 }} align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuarios.map((usuario, index) => (
                            <TableRow
                                key={index}
                                sx={{ backgroundColor: index % 2 === 0 ? "#f1f5f9" : "#ffffff" }}
                            >
                                <TableCell sx={{ fontSize: 12 }}>{usuario.ci}</TableCell>
                                <TableCell sx={{ fontSize: 12 }}>{usuario.nombre}</TableCell>
                                <TableCell sx={{ fontSize: 12 }}>{usuario.apellidos}</TableCell>
                                <TableCell sx={{ fontSize: 12 }}>{usuario.username}</TableCell>
                                <TableCell sx={{ fontSize: 12 }}>{usuario.sucursal}</TableCell>
                                <TableCell sx={{ fontSize: 12 }}>{usuario.rol}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEditar(usuario)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => handleEliminar(usuario)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {usuarios.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ fontSize: 12 }}>
                                    No hay usuarios registrados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
