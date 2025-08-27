import { useEffect, useState } from "react";
import type { IngresoI } from "../interface/ingresoInterface";
import { listarInresos } from "../service/ingresoService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from "@mui/material";

export const ListarIngresoPage = () => {
  const [data, setData] = useState<IngresoI[]>([]);

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      const response = await listarInresos();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        Lista de Ingresos
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Código</strong></TableCell>
              <TableCell><strong>Factura</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Proveedor Apellido</strong></TableCell>
              <TableCell><strong>Proveedor Nombre</strong></TableCell>
              <TableCell><strong>Detalle</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ingreso) => (
              <TableRow key={ingreso._id}>
                <TableCell>{ingreso.codigo}</TableCell>
                <TableCell>{ingreso.factura}</TableCell>
                <TableCell>{ingreso.fecha}</TableCell>
                <TableCell>{ingreso.proveedorApoellido}</TableCell>
                <TableCell>{ingreso.proveedorNombre}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" color="primary">
                    Detalle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
