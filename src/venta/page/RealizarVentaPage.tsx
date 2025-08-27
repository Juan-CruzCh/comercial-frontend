import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Stack,
  Divider,
  IconButton,
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
        const response = await realizarVenta(venta)
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

      {/* Contenedor principal */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column", // móvil
            sm: "row", // desde 600px en adelante
          },
          gap: 2,
        }}
      >
        {/* Tabla de Stock (encima en móviles, más ancha en desktop) */}
        <Box sx={{ flex: { xs: "unset", sm: 2 } }}>
          <ListarStock
            setStock={setStockSeleccionado}
            stock={stockSeleccionado}
          />
        </Box>

        {/* Carrito */}
      <Paper
  sx={{
    p: 2,
    flex: { xs: "unset", sm: 1 },
    backgroundColor: "#f8fafc", // fondo suave
    borderRadius: 2,
    boxShadow: "0px 2px 10px rgba(0,0,0,0.05)", // sombra sutil
  }}
>
  <Typography
    variant="subtitle1"
    sx={{
      mb: 2,
      color: "#0f172a", // texto más oscuro
      fontWeight: "bold",
      fontSize: 18,
      borderBottom: "2px solid #3b82f6", // línea azul bajo el título
      pb: 1,
    }}
  >
    🛒 Carrito de Compras
  </Typography>

  <Stack spacing={2}>
    <Box>
      {/* Encabezado de columnas */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
          fontWeight: "bold",
          backgroundColor: "#e0f2fe",
          p: 1,
          borderRadius: 1,
        }}
      >
        <Typography variant="body2" sx={{ width: "15%", color: "#0c4a6e" }}>
          Código
        </Typography>
        <Typography variant="body2" sx={{ width: "25%", color: "#0c4a6e" }}>
          Producto
        </Typography>
        <Typography variant="body2" sx={{ width: "20%", color: "#0c4a6e" }}>
          Precio Unitario
        </Typography>
        <Typography variant="body2" sx={{ width: "20%", color: "#0c4a6e" }}>
          Precio Total
        </Typography>
        <Typography
          variant="body2"
          sx={{ width: "30%", textAlign: "center", color: "#0c4a6e" }}
        >
          Cantidad / Agregar
        </Typography>
        <Typography
          variant="body2"
          sx={{ width: "10%", textAlign: "center", color: "#0c4a6e" }}
        >
          Eliminar
        </Typography>
      </Box>

      {/* Lista de productos */}
      {stockSeleccionado.map((item, i) => (
        <Box key={i}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
              backgroundColor: i % 2 === 0 ? "#f1f5f9" : "#ffffff", // alternancia de color
              p: 1,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" sx={{ width: "15%" }}>
              {item.codigo}
            </Typography>
            <Typography variant="body2" sx={{ width: "25%" }}>
              {item.nombre}
            </Typography>
            <Typography variant="body2" sx={{ width: "20%" }}>
              {item.precioUnitario} Bs
            </Typography>
            <Typography variant="body2" sx={{ width: "20%" }}>
              {item.montoTotal} Bs
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "30%",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" sx={{ width: "20%" }}>
                {item.cantidad}
              </Typography>
              <IconButton
                color="primary"
                size="small"
                onClick={() => btnDecrementarCantidad(i)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                color="primary"
                size="small"
                onClick={() => btnIncrementarCantidad(i)}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Box sx={{ width: "10%", textAlign: "center" }}>
              <IconButton color="error" size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>

    <TextField
      label="Descuento (Bs.)"
      variant="outlined"
      size="small"
      type="number"
      onChange={(e) => {
        const value = e.target.value;
        setDescuento(Number(value));
      }}
      sx={{ width: "100%", mt: 1 }}
    />

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold",
        fontSize: 13,
        mt: 1,
        color: "#0f172a",
      }}
    >
      <Typography variant="body2">Subtotal</Typography>
      <Typography variant="body2">
        {stockSeleccionado
          .reduce((acc, item) => item.montoTotal + acc, 0)
          .toFixed(2)}
        Bs
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold",
        fontSize: 13,
        color: "#0f172a",
      }}
    >
      <Typography variant="body2">Descuento</Typography>
      <Typography variant="body2">{descuento}</Typography>
    </Box>

    <Divider />

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold",
        fontSize: 13,
        color: "#0f172a",
      }}
    >
      <Typography variant="body2">Total</Typography>
      <Typography variant="body2">
        {(() => {
          const total = stockSeleccionado.reduce(
            (acc, item) => item.montoTotal + acc,
            0
          );

          if (descuento > total) {
            return "El descuento no puede ser mayor al monto total.";
          }

          return (total - descuento).toFixed(2);
        })()}
      </Typography>
    </Box>

    <Button
      onClick={() => btnRealizarVenta()}
      variant="contained"
      fullWidth
      sx={{
        mt: 2,
        backgroundColor: "#10b981", // verde esmeralda
        "&:hover": {
          backgroundColor: "#059669",
        },
        color: "#fff",
        fontWeight: "bold",
      }}
    >
      Realizar Venta
    </Button>
  </Stack>
</Paper>

      </Box>
    </Box>
  );
};
