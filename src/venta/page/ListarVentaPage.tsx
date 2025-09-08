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
  Pagination,
} from "@mui/material";
import { listarVenta } from "../service/VentaService";
import type { BuscadorVentasI, ListarVentaI } from "../interface/ventaInterface";
import { useNavigate } from "react-router-dom";
import { paginador } from "../../app/hook/paginador";
import { BuscadorVentas } from "../components/BuscadorVentas";

export const ListarVentaPage = () => {
  const navigate = useNavigate();
    const date = new Date();
  const [ventas, setVentas] = useState<ListarVentaI[]>([]);
  const [filtro, setFiltro]=useState<BuscadorVentasI>({
    codigo:"",
    fechaFin:  "",
    fechaInicio: "",
    sucursal:"",
    usuario:""
  })
  console.log(filtro);
  
  const { limite, paginaActual, paginas, setPaginaActual, setpaginas } = paginador()
  useEffect(() => {
    listar();
  }, [paginaActual,filtro]);

  const listar = async () => {
    try {
      const response = await listarVenta(filtro,paginaActual, limite);
      if (response && response.Data.length > 0) {
        setVentas(response.Data);
        setpaginas(response.Paginas)
      }
    } catch (error) {
      console.log(error);
           setVentas([])
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Listado de Ventas
      </Typography>
    <BuscadorVentas setFiltro={setFiltro}/>
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
                <TableCell>{venta.sucursal}</TableCell>
                <TableCell>{venta.vendedor}</TableCell>
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
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={paginas}
            page={paginaActual}
            onChange={(_: React.ChangeEvent<unknown>, value: number) => setPaginaActual(value)}

            size="small"

          />
        </Box>
      </TableContainer>
    </Box>
  );
};
