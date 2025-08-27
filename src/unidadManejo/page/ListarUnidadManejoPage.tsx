import { useEffect, useState } from "react";

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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { RegistrarUnidadManejoModal } from "../modal/RegistrarUnidadManejoModal";
import type { UnidadManejoI } from "../interface/unidaManejo";
import { listarUndiadManejo } from "../service/unidaManejoService";
export const ListarUnidadManejoPage = () => {
  const [data, setdata] = useState<UnidadManejoI[]>([]);
  useEffect(() => {
    listar();
  }, []);
  const listar = async () => {
    try {
      const response = await listarUndiadManejo();
      setdata(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Listado de undiad de manejo
      </Typography>
      <RegistrarUnidadManejoModal />
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
