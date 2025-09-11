import { useEffect, useState } from "react";
import { reporteVentas } from "../service/VentaService";
import type {
  BuscadorVentasI,
  ListarVentaI,
  ReporteVentasI,
} from "../interface/ventaInterface";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BuscadorReporteVentas } from "../components/BuscadorVentaReporte";
import { TotalReporte } from "../components/TotalReporte";

export const ReporteVentasPage = () => {
  const date = new Date();
  date.setHours(date.getHours() - 4);
  const [filtro, setFiltro] = useState<BuscadorVentasI>({
    codigo: "",
    fechaFin: date.toISOString().split("T")[0],
    fechaInicio: date.toISOString().split("T")[0],
    sucursal: "",
    usuario: "",
  });
  const [data, setData] = useState<ListarVentaI[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    reporte();
  }, [filtro]);

  const reporte = async () => {
    try {
      const response = await reporteVentas(filtro);
      if (response && response.Data.length > 0) {
        setData(response.Data);
      }
    } catch (error) {
      setData([]);
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        reporte de Ventas
      </Typography>
      <BuscadorReporteVentas setFiltro={setFiltro} />
      <TotalReporte ventas={data} />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Código
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Sucursal
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Vendedor
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Subtotal
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Descuento
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Monto Total
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                descuento alquiler
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                descuento vendedor
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                descuento acumulado
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Total ganancia
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Fecha
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Acción
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((venta, index) => (
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
                <TableCell>{venta.sucursal}</TableCell>
                <TableCell>{venta.vendedor}</TableCell>
                <TableCell>{venta.subTotal.toFixed(2)}</TableCell>
                <TableCell>{venta.descuento.toFixed(2)}</TableCell>
                <TableCell>{venta.montoTotal.toFixed(2)}</TableCell>
                <TableCell>{venta.descuentoAlquiller.toFixed(2)}</TableCell>
                <TableCell>{venta.descuentoVendedor.toFixed(2)}</TableCell>
                <TableCell>{venta.descuentoAcumulado.toFixed(2)}</TableCell>
                <TableCell>{venta.totalGanancia.toFixed(2)}</TableCell>

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
