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
    (acc: Record<string, number>, venta) => {
      if (!acc[venta.vendedor]) {
        acc[venta.vendedor] = 0;
      }
      acc[venta.vendedor] += venta.descuentoVendedor;
      return acc;
    },
    {}
  );

  const descuentoAcumuladoVenededor = Object.entries(descuentoAcumuladoPorVendedor).map(
    ([vendedor, totalDescuento]) => ({
      vendedor,
      totalDescuento,
    })
  );

 const descuentoAcumuladoSucursal=  ventas.reduce((acc:Record<string, number>, venta)=>{
        if(!acc[venta.sucursal]){
            acc[venta.sucursal] = 0
        }
        acc[venta.sucursal] += venta.descuentoAlquiller
    return acc
  },{})
  const acumuladoSucursal =Object.entries(descuentoAcumuladoSucursal).map(([sucursal, totalAcumulado])=>({sucursal, totalAcumulado}))
  
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Totales de Ventas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>Descuento</TableCell>
              <TableCell>Monto Total</TableCell>
              <TableCell>Total Alquiler</TableCell>
              <TableCell>Total Vendedor</TableCell>
              <TableCell>Total Acumulado</TableCell>
              <TableCell>Total Ganancia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {ventas.reduce((acc, i) => i.subTotal + acc, 0).toFixed(2)} Bs
              </TableCell>
              <TableCell>
                {ventas.reduce((acc, i) => i.descuento + acc, 0).toFixed(2)} Bs
              </TableCell>
              <TableCell>
                {ventas.reduce((acc, i) => i.montoTotal + acc, 0).toFixed(2)} Bs
              </TableCell>
              <TableCell>
                {ventas
                  .reduce((acc, i) => i.descuentoAlquiller + acc, 0)
                  .toFixed(2)}{" "}
                Bs
              </TableCell>
              <TableCell>
                {ventas
                  .reduce((acc, i) => i.descuentoVendedor + acc, 0)
                  .toFixed(2)}{" "}
                Bs
              </TableCell>
              <TableCell>
                {ventas
                  .reduce((acc, i) => i.descuentoAcumulado + acc, 0)
                  .toFixed(2)}{" "}
                Bs
              </TableCell>
              <TableCell>
                {ventas.reduce((acc, i) => i.totalGanancia + acc, 0).toFixed(2)}{" "}
                Bs
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Descuento acumulado por sucursal
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vendedor</TableCell>
                <TableCell>Descuento Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Ejemplo de fila, puedes repetir según el número de vendedores */}
               {acumuladoSucursal.map((item) => (
                <TableRow>
                  <TableCell>{item.sucursal}</TableCell>
                  <TableCell>{item.totalAcumulado.toFixed(2)}</TableCell>
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
                <TableCell>Descuento acumulado Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {descuentoAcumuladoVenededor.map((item) => (
                <TableRow>
                  <TableCell>{item.vendedor}</TableCell>
                  <TableCell>{item.totalDescuento.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
