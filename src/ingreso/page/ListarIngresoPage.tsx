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
import { useNavigate } from "react-router-dom";

export const ListarIngresoPage = () => {
  const navigate = useNavigate()
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
              <TableCell><strong>Usuario</strong></TableCell>

              <TableCell><strong>Factura</strong></TableCell>
              <TableCell><strong>Cantidad</strong></TableCell>
              <TableCell><strong>precio Unitario venta</strong></TableCell>
              <TableCell><strong>precio Unitario compra</strong></TableCell>
              <TableCell><strong>descuento</strong></TableCell>
              <TableCell><strong>subTotal</strong></TableCell>
              <TableCell><strong>Proveedor</strong></TableCell>
              <TableCell><strong>Detalle</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ingreso) => (
              <TableRow key={ingreso._id}>
                <TableCell>{ingreso.codigo}</TableCell>
                <TableCell>{ingreso.usuario}</TableCell>
                <TableCell>{ingreso.factura}</TableCell>
                <TableCell>{ingreso.cantidadTotal}</TableCell>
                <TableCell>{ingreso.precioUnitarioTotal}</TableCell>
                <TableCell>{ingreso.precioUnitarioTotalCompra}</TableCell>
                <TableCell>{ingreso.totalDescuento}</TableCell>
                <TableCell>{ingreso.sudTotal}</TableCell>
                <TableCell> {ingreso.proveedorNombre} {ingreso.proveedorApoellido} </TableCell>

                <TableCell>
                  <Button onClick={() => {
                    navigate(`/detalle/ingreso/${ingreso._id}`)
                  }} variant="outlined" size="small" color="primary">
                    Detalle
                  </Button>
                </TableCell>
                <TableCell>{ingreso.fecha}</TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
