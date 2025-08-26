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
import type { StockSeleccionadoI } from "../interface/ventaInterface";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";

export const RealizarVentaPage = () => {
  const [stockSeleccionado, setStockSeleccionado] = useState<
    StockSeleccionadoI[]
  >([]);
  console.log(stockSeleccionado);

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
        <Paper sx={{ p: 2, flex: { xs: "unset", sm: 1 } }}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              color: "#1e40af",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Carrito de Compras
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
                }}
              >
                <Typography variant="body2" sx={{ width: "15%" }}>
                  Código
                </Typography>
                <Typography variant="body2" sx={{ width: "25%" }}>
                  Producto
                </Typography>
                <Typography variant="body2" sx={{ width: "20%" }}>
                  Precio Unitario
                </Typography>
                <Typography variant="body2" sx={{ width: "20%" }}>
                  Precio Total
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ width: "30%", textAlign: "center" }}
                >
                  Cantidad / Agregar
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ width: "10%", textAlign: "center" }}
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
                        onClick={() => {
                          const nuevoStock = [...stockSeleccionado];
                          if (nuevoStock[i].cantidad > 1) {
                            nuevoStock[i].cantidad -= 1;
                            nuevoStock[i].montoTotal = Number(
                              (
                                  nuevoStock[i].cantidad *nuevoStock[i].precioUnitario 
                              
                              ).toFixed(2)
                            );
                            console.log(nuevoStock);

                            setStockSeleccionado(nuevoStock);
                          }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => {
                          const nuevoStock = [...stockSeleccionado];
                          nuevoStock[i].cantidad += 1;
                          nuevoStock[i].montoTotal = Number(
                            (
                            nuevoStock[i].cantidad*  nuevoStock[i].precioUnitario 
                            ).toFixed(2)
                          );

                          setStockSeleccionado(nuevoStock);
                        }}
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
                  {i < 4 && <Divider />}
                </Box>
              ))}
            </Box>

            <TextField
              label="Descuento (Bs.)"
              variant="outlined"
              size="small"
              type="number"
              sx={{ width: "100%", mt: 1 }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: 13,
                mt: 1,
              }}
            >
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">
                {stockSeleccionado.reduce(
                  (acc, item) => item.montoTotal + acc,
                  0
                ).toFixed(2)}
                Bs
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              <Typography variant="body2">Descuento</Typography>
              <Typography variant="body2">0 Bs.</Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              <Typography variant="body2">Total</Typography>
              <Typography variant="body2">3</Typography>
            </Box>

            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
            >
              Realizar Venta
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};
