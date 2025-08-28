import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { ListarStockI } from "../../stock/interface/stock";
import { useEffect, useState } from "react";
import { listarStock } from "../../stock/service/sotckService";
import type { StockSeleccionadoI } from "../interface/ventaInterface";

export const ListarStock = ({
  stock,
  setStock,
}: {
  stock: StockSeleccionadoI[];
  setStock: (value: StockSeleccionadoI[]) => void;
}) => {
  const [data, setData] = useState<ListarStockI[]>([]);

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      const response = await listarStock();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table size="small" >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1e40af" }}>
            {[
              "Código",
              "Producto",
              "Categoría",
              "Stock",
              "Unidad",
              "Precio unitario",
              "Categoria",
              "Venc.",
              "Acción",
            ].map((head, i) => (
              <TableCell
                key={i}
                sx={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item) => (
            <TableRow hover>
              <TableCell sx={{ fontSize: 13 }}>{item.codigo}</TableCell>
              <TableCell sx={{ fontSize: 13 }}>{item.producto}</TableCell>
              <TableCell sx={{ fontSize: 13 }}>{item.descripcion}</TableCell>
              <TableCell sx={{ fontSize: 13 }}>{item.cantidad}</TableCell>
              <TableCell sx={{ fontSize: 13 }}>{item.unidadManejo}</TableCell>
              <TableCell sx={{ fontSize: 13 }}>
                {item.precioUnitario} Bs
              </TableCell>
              <TableCell sx={{ fontSize: 13 }}>{item.categoria}</TableCell>

              <TableCell sx={{ fontSize: 13 }}>
                {item.fechaVencimiento.split("T")[0]}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  sx={{ fontSize: 12 }}
                  onClick={() => {
                    const data: StockSeleccionadoI = {
                      stock: item._id,
                      codigo: item.codigo,
                      nombre: `${item.producto}/${item.descripcion}`,
                      precioUnitario: item.precioUnitario,
                      cantidad: 1,
                      montoTotal: item.precioUnitario,
                    };
                    const yaExiste = stock.some(
                      (item) => item.stock === data.stock
                    );

                    if (!yaExiste) {
                      setStock([...stock, data]);
                    }
                  }}
                >
                  Añadir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
