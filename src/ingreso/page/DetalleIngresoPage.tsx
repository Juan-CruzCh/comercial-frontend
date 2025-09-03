import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { listarDetalleIngreso } from "../service/ingresoService";
import type { detalleIngresoI } from "../interface/detalleIngreso";
import { useReactToPrint } from "react-to-print";
import { QrDetalleIngreso } from "../components/QrDetalleIngreso";

export const DetalleIngresoPage = () => {
  const [data, setData] = useState<detalleIngresoI[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      if (id) {
        const response = await listarDetalleIngreso(id);
        setData(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

const contentRef = useRef<HTMLDivElement>(null);
const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
      >
        📦 Detalle de Ingreso
      </Typography>
      <Button onClick={reactToPrintFn }>Generar qr de productos</Button>
        <div style={{ display: "none" }}>
      <div ref={contentRef}>
        <QrDetalleIngreso data={data} />
      </div>
    </div>
      <TableContainer component={Paper}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Código</b>
              </TableCell>
              <TableCell>
                <b>Producto</b>
              </TableCell>
              <TableCell>
                <b>Descripción</b>
              </TableCell>
              <TableCell>
                <b>Categoría</b>
              </TableCell>
              <TableCell>
                <b>Unidad</b>
              </TableCell>
              <TableCell>
                <b>Cantidad</b>
              </TableCell>
              <TableCell>
                <b>Precio Unitario</b>
              </TableCell>
              <TableCell>
                <b>Sub total</b>
              </TableCell>
              <TableCell>
                <b>Descuento</b>
              </TableCell>
              <TableCell>
                <b>Total</b>
              </TableCell>
              <TableCell>
                <b>Fecha Vencimiento</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id} hover>
                <TableCell>{item.codigo}</TableCell>
                <TableCell>{item.producto}</TableCell>
                <TableCell>{item.descripcion}</TableCell>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.unidadManejo}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
                <TableCell>{item.precioUnitario}</TableCell>
                <TableCell>{item.sudTotal}</TableCell>
                <TableCell>{item.descuento}</TableCell>

                <TableCell>{item.montoTotal}</TableCell>
                <TableCell>
                  {item.fechaVencimiento && item.fechaVencimiento}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
