import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  Chip,
  Paper,
  TableContainer,
} from "@mui/material";
import { detalleVenta } from "../service/VentaService";
import type { DetalleVentaI } from "../interface/detalleVenta";

export const DetalleVentaPage = () => {
  const [data, setData] = useState<DetalleVentaI[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    detalle();
  }, []);

  const detalle = async () => {
    try {
      if (id) {
        const response = await detalleVenta(id);
        setData(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        🧾 Detalle de Venta
      </Typography>

      {data.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No hay detalles disponibles.
        </Typography>
      ) : (

          <CardContent>
           
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "primary.main" }}>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Descripción</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Cantidad</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Precio Unitario</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Precio Total</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{
                        transition: "background-color 0.3s",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <TableCell>{item.descripcion}</TableCell>
                      <TableCell>{item.cantidad}</TableCell>
                      <TableCell>
                        <Typography color="success.main" fontWeight="500">
                          {item.precioUnitario.toFixed(2)} Bs
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="success.main" fontWeight="500">
                          {item.precioTotal.toFixed(2)} Bs
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {item.fecha}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.flag}
                          color={item.flag === "NUEVO" ? "success" : "warning"}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        
      )}
    </Box>
  );
};
