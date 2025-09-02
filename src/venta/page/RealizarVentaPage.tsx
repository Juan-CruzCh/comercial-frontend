import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Stack,
  Divider,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ListarStock } from "../components/ListarStock";
import { useState } from "react";
import type {
  RealizarVentaI,
  StockSeleccionadoI,
} from "../interface/ventaInterface";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { realizarVenta } from "../service/VentaService";

export const RealizarVentaPage = () => {
  const [stockSeleccionado, setStockSeleccionado] = useState<
    StockSeleccionadoI[]
  >([]);
  const [total, setTotal] = useState<number>(0);
  const [sudTotal, setSubTotal] = useState<number>(0);
  const [descuento, setDescuento] = useState<number>(0);
  const [btnVentaDisable, setBtnVentaDisable] = useState<boolean>(false);

  const btnIncrementarCantidad = (i: number) => {
    const nuevoStock = [...stockSeleccionado];
    nuevoStock[i].cantidad += 1;
    nuevoStock[i].montoTotal = Number(
      (nuevoStock[i].cantidad * nuevoStock[i].precioUnitario).toFixed(2)
    );
    setStockSeleccionado(nuevoStock);
  };

  const btnDecrementarCantidad = (i: number) => {
    const nuevoStock = [...stockSeleccionado];
    if (nuevoStock[i].cantidad > 1) {
      nuevoStock[i].cantidad -= 1;
      nuevoStock[i].montoTotal = Number(
        (nuevoStock[i].cantidad * nuevoStock[i].precioUnitario).toFixed(2)
      );
      setStockSeleccionado(nuevoStock);
    }
  };

  const btnEliminarVentaCarrito = (idStock: string) => {
    const nuevoCarrito = stockSeleccionado.filter((item) => item.stock !== idStock)
    setStockSeleccionado(nuevoCarrito)

  }

  const btnRealizarVenta = async () => {
    if (stockSeleccionado.length > 0) {
      const montoTotal =
        Number(
          stockSeleccionado
            .reduce((acc, item) => item.montoTotal + acc, 0)
            .toFixed(2)
        ) - descuento;
      const sudTotal = Number(
        stockSeleccionado
          .reduce((acc, item) => item.montoTotal + acc, 0)
          .toFixed(2)
      );

      const venta: RealizarVentaI = {
        descuento: descuento,
        montoTotal: montoTotal,
        sudTotal: sudTotal,
        detalleVenta: stockSeleccionado.map((item) => {
          return {
            cantidad: item.cantidad,
            descripcionProducto: item.nombre,
            stock: item.stock,
            precioUnitario: item.precioUnitario,
            precioTotal: item.montoTotal,
          };
        }),
      };
      try {
        const response = await realizarVenta(venta);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={{ p: 2, mx: "auto" }}>
      {/* Título */}
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#1e40af",
          textAlign: "center",
          fontSize: 22,
        }}
      >
        Realizar Venta
      </Typography>

      {/* Contenedor principal: columna siempre */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // tabla arriba, carrito abajo
          gap: 2,
        }}
      >
        {/* Tabla de Stock */}
        <Box>
          <ListarStock
            setStock={setStockSeleccionado}
            stock={stockSeleccionado}
          />
        </Box>

        {/* Carrito */}
        <Paper
          sx={{
            p: 2,
            backgroundColor: "#f8fafc",
            borderRadius: 2,
            boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              color: "#0f172a",
              fontWeight: "bold",
              fontSize: 18,
              borderBottom: "2px solid #3b82f6",
              pb: 1,
            }}
          >
            🛒 Carrito de Compras
          </Typography>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e0f2fe" }}>
                  <TableCell>Código</TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell>Precio Unitario</TableCell>
                  <TableCell>Precio Total</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="center">Agregar / Quitar</TableCell>
                  <TableCell align="center">Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockSeleccionado.map((item, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      backgroundColor: i % 2 === 0 ? "#f1f5f9" : "#ffffff",
                    }}
                  >
                    <TableCell>{item.codigo}</TableCell>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>{item.precioUnitario} Bs</TableCell>
                    <TableCell>{item.montoTotal} Bs</TableCell>
                    <TableCell align="center">{item.cantidad}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => btnDecrementarCantidad(i)}>
                        <RemoveIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => btnIncrementarCantidad(i)}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="error" size="small" onClick={() => btnEliminarVentaCarrito(item.stock)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2 }}>
            <TextField
              label="Descuento (Bs.)"
              variant="outlined"
              size="small"
              type="number"
              onChange={(e) => setDescuento(Number(e.target.value))}
              fullWidth
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                mt: 1,
              }}
            >
              <Typography>Subtotal</Typography>
              <Typography>
                {stockSeleccionado.reduce((acc, item) => acc + item.montoTotal, 0).toFixed(2)} Bs
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <Typography>Descuento</Typography>
              <Typography>{descuento}</Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <Typography>Total</Typography>
              <Typography>
                {Math.max(
                  0,
                  stockSeleccionado.reduce((acc, item) => acc + item.montoTotal, 0) - descuento
                ).toFixed(2)}
              </Typography>
            </Box>

            <Button
              onClick={btnRealizarVenta}
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#10b981", "&:hover": { backgroundColor: "#059669" } }}
            >
              Realizar Venta
            </Button>
          </Box>
        </Paper>

      </Box>
    </Box>
  );
};
