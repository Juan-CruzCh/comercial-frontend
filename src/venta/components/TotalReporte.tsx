import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import type { ListarVentaI } from "../interface/ventaInterface";
export const TotalReporte = ({ ventas }: { ventas: ListarVentaI[] }) => {
  const descuentoAcumuladoPorVendedor = ventas.reduce(
    (
      acc: Record<
        string,
        {
          totalDescuento: number;
          totalGanancia: number;
          montoTotal: number;
          descuento: number;
          subTotal: number;
          totalDescuentoVendedor: number;
          descuentoAcumulado: number
        }
      >,
      venta
    ) => {
      if (!acc[venta.vendedor]) {
        acc[venta.vendedor] = {
          descuento: 0,
          montoTotal: 0,
          subTotal: 0,
          totalDescuento: 0,
          totalGanancia: 0,
          totalDescuentoVendedor: 0,
          descuentoAcumulado: 0
        };
      }
      acc[venta.vendedor].totalDescuento += venta.descuentoVendedor;
      acc[venta.vendedor].subTotal += venta.subTotal;
      acc[venta.vendedor].descuento += venta.descuento;
      acc[venta.vendedor].montoTotal += venta.montoTotal;
      acc[venta.vendedor].totalGanancia += venta.totalGanancia;
      acc[venta.vendedor].totalDescuentoVendedor += venta.descuentoVendedor;
      acc[venta.vendedor].descuentoAcumulado += venta.descuentoAcumulado
      return acc;
    },
    {}
  );

  const descuentoAcumuladoVenededor = Object.entries(
    descuentoAcumuladoPorVendedor
  ).map(([vendedor, value]) => ({
    vendedor,
    totalDescuentoVendedor: value.totalDescuentoVendedor,
    montoTotal: value.montoTotal,
    descuento: value.descuento,
    subTotal: value.subTotal,
    totalGanacia: value.totalGanancia,
    descuentoAcumulado: value.descuentoAcumulado,

  }));

  const descuentoAcumuladoSucursal = ventas.reduce(
    (
      acc: Record<
        string,
        {
          totalAlquiler: number;
          totalGanancia: number;
          montoTotal: number;
          descuento: number;
          subTotal: number;
          totalDescuentoVendedor: number;
          descuentoAcumulado: number

        }
      >,
      venta
    ) => {
      if (!acc[venta.sucursal]) {
        acc[venta.sucursal] = {
          totalAlquiler: 0,
          totalGanancia: 0,
          montoTotal: 0,
          descuento: 0,
          subTotal: 0,
          totalDescuentoVendedor: 0,
          descuentoAcumulado: 0
        };
      }
      acc[venta.sucursal].totalAlquiler += venta.descuentoAlquiller;
      acc[venta.sucursal].totalGanancia += venta.totalGanancia;
      acc[venta.sucursal].montoTotal += venta.montoTotal;
      acc[venta.sucursal].descuento += venta.descuento;
      acc[venta.sucursal].subTotal += venta.subTotal;
      acc[venta.sucursal].totalDescuentoVendedor += venta.descuentoVendedor;
      acc[venta.sucursal].descuentoAcumulado += venta.descuentoAcumulado;

      return acc;
    },
    {}
  );
  const acumuladoSucursal = Object.entries(descuentoAcumuladoSucursal).map(
    ([sucursal, value]) => ({
      sucursal,
      totalAlquiller: value.totalAlquiler,
      totalGanacia: value.totalGanancia,
      montoTotal: value.montoTotal,
      descuento: value.descuento,
      subTotal: value.subTotal,
      totalDescuentoVendedor: value.totalDescuentoVendedor,
      descuentoAcumulado: value.descuentoAcumulado
    })
  );

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Totales de Ventas
      </Typography>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Descuento acumulado por sucursal
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sucursal</TableCell>
                <TableCell>SudTotal</TableCell>
                <TableCell>descuento</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>acumulado vendedor</TableCell>
                <TableCell>acumulado alquiler</TableCell>
                <TableCell>Total acumulado</TableCell>
                <TableCell>Total Ganancia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Ejemplo de fila, puedes repetir según el número de vendedores */}
              {acumuladoSucursal.map((item) => (
                <TableRow>
                  <TableCell>{item.sucursal}</TableCell>
                  <TableCell>
                    {item.subTotal.toFixed(2)} Bs
                  </TableCell>
                  <TableCell>{item.descuento.toFixed(2)} Bs</TableCell>
                  <TableCell>{item.montoTotal.toFixed(2)} Bs</TableCell>
                  <TableCell>{item.totalDescuentoVendedor.toFixed(2)} Bs</TableCell>
                  <TableCell>{item.totalAlquiller.toFixed(2)} Bs</TableCell>
                  <TableCell>{item.descuentoAcumulado.toFixed(2)} Bs</TableCell>
                  <TableCell>{item.totalGanacia.toFixed(2)} Bs</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Descuento acumulado por Vendedor
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vendedor</TableCell>
                <TableCell>SubTotal</TableCell>
                <TableCell>descuento</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>acumulado para vendedor</TableCell>

                <TableCell>Total Ganancia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {descuentoAcumuladoVenededor.map((item) => (
                <TableRow>
                  <TableCell>{item.vendedor}</TableCell>
                  <TableCell>{item.subTotal.toFixed(2)} Bs</TableCell>
                  <TableCell>{item.descuento.toFixed(2)} Bs</TableCell>
                  <TableCell>{item.montoTotal.toFixed(2)} Bs</TableCell>
                  <TableCell>{item.totalDescuentoVendedor.toFixed(2)} Bs</TableCell>

                  <TableCell>{item.totalGanacia.toFixed(2)} Bs</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
