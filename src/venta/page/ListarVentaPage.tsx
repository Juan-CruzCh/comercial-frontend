import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { listarVenta } from "../service/VentaService";
import type { ListarVentaI } from "../interface/ventaInterface";
import { useNavigate } from "react-router-dom";

export const ListarVentaPage = () => {
  const navigate = useNavigate();
  const [ventas, setVentas] = useState<ListarVentaI[]>([]);

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      const response = await listarVenta();
      if (response) {
        setVentas(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Listado de Ventas
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Código</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sucursal</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Vendedor</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Subtotal</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Descuento</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Monto Total</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Acción</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ventas.map((venta, index) => (
              <TableRow
                key={venta._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  "&:hover": {
                    backgroundColor: "#e0f7fa",
                  },
                }}
              >
                <TableCell>{venta.codigo}</TableCell>
                <TableCell>falta</TableCell>
                <TableCell>falta</TableCell>
                <TableCell>{venta.subTotal.toFixed(2)}</TableCell>
                <TableCell>{venta.descuento.toFixed(2)}</TableCell>
                <TableCell>{venta.montoTotal.toFixed(2)}</TableCell>
                <TableCell>
                  {venta.fechaVenta.replace("T", " ").substring(0, 19)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/detalle/venta/${venta._id}`)}
                  >
                    Detalle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
