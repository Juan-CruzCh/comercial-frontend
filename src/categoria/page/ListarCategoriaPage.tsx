import { useEffect, useState } from "react";
import { listarCategoria } from "../service/categoriaService";
import type { CategoriaI } from "../interface/categoria";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { RegistrarCategoriaModal } from "../modal/RegistrarCategoriaModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export const ListarCategoriaPage = () => {
  const [data, setdata] = useState<CategoriaI[]>([]);
  useEffect(() => {
    listar();
  }, []);
  const listar = async () => {
    try {
      const response = await listarCategoria();
      setdata(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Listado de Categorias
      </Typography>
      <RegistrarCategoriaModal />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Nombre</b>
              </TableCell>

              <TableCell align="center">
                <b>Acciones</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.nombre}</TableCell>

                <TableCell align="center">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
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
