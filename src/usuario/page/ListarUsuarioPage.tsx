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
import { eliminarUsuario, listarUsuarios } from "../service/usuarioService";
import type { UsuarioI } from "../interface/usuarioInterface";
import { alertConfirmacionEliminacion } from "../../app/modal/sweetalert";
import { modalHook, RealoadHook } from "../../app/hook/appHook";
import { EditarUsuario } from "../modal/EditarUsuario";



export const ListarUsuarioPage = () => {
    const {reload,setReload}= RealoadHook()
    const [usuarios, setUsuarios] = useState<UsuarioI[]>([]);
    const [usuario, setUsuario] = useState<UsuarioI>();
    const {abrirModal,open, cerrarModal}=modalHook()

    const btnEditar = (usuario: UsuarioI) => {
       abrirModal()
       setUsuario(usuario)
    };

    const btnEliminar =async (usuario: string) => {
       try {
         const confirmacion = await alertConfirmacionEliminacion()  
        if(confirmacion){
          const response=  await eliminarUsuario(usuario)
    
          
          if(response.status == 200){
            setReload(!reload)
          }
        }
       } catch (error) {
            console.log(error);
            
       }
       
    };
    useEffect(() => {
        listarUsuario()
    }, [reload])

    const listarUsuario = async () => {
        try {
            const response = await listarUsuarios()
            console.log(response);
            
            if (response) {
                setUsuarios(response)
            }
        } catch (error) {
            console.log(error);
            
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
                                        onClick={() => btnEditar(usuario)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => usuario._id && btnEliminar(usuario._id)}
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
            {open && usuario && <EditarUsuario handleClose={cerrarModal}  setReloat={setReload} reload={reload}  open={open} usuario={usuario} /> }
        </Box>
    );
};
