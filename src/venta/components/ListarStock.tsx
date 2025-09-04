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
import { BuscadorStock } from "../../stock/components/BuscadorStock";

export const ListarStock = ({
  stock,
  setStock,
  reload
}: {
  stock: StockSeleccionadoI[];
  setStock: (value: StockSeleccionadoI[]) => void;
  reload: boolean,

}) => {
  const [data, setData] = useState<ListarStockI[]>([]);
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [unidadSeleccionada, setUnidadSeleccionada] = useState('');
  console.log(unidadSeleccionada);

  useEffect(() => {
    listar();
  }, [reload, codigo, nombre, categoriaSeleccionada, unidadSeleccionada]);

  const listar = async () => {
    try {
      const response = await listarStock(codigo, nombre, categoriaSeleccionada, unidadSeleccionada);
      if (response && response.Data.length > 0) {
        setData(response.Data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableContainer component={Paper}>
      <BuscadorStock
        categoriaSeleccionada={categoriaSeleccionada}
        codigo={codigo} nombre={nombre}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        setCodigo={setCodigo}
        setNombre={setNombre}
        setUnidadSeleccionada={setUnidadSeleccionada}
        unidadSeleccionada={unidadSeleccionada}
      />
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
              <TableCell sx={{ fontSize: 13 }}>{item.producto} / {item.descripcion}</TableCell>
              <TableCell sx={{ fontSize: 13 }}>{item.categoria}</TableCell>
              <TableCell sx={{ fontSize: 13 }}>{item.cantidad}</TableCell>
              <TableCell sx={{ fontSize: 13 }}>{item.unidadManejo}</TableCell>
              <TableCell sx={{ fontSize: 13 }}>
                {item.precioUnitario} Bs
              </TableCell>

              <TableCell sx={{ fontSize: 13 }}>
                {item.fechaVencimiento && item.fechaVencimiento.split("T")[0]}
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
