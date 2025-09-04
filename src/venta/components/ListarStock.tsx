import {
  Box,
  Button,
  Pagination,
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
import { QRScanner } from "./QRScanner";
import { paginador } from "../../app/hook/paginador";

export const ListarStock = ({
  stock,
  setStock,
  reload,
}: {
  stock: StockSeleccionadoI[];
  setStock: (value: StockSeleccionadoI[]) => void;
  reload: boolean;
}) => {
  const [data, setData] = useState<ListarStockI[]>([]);
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [unidadSeleccionada, setUnidadSeleccionada] = useState("");
  const {limite,paginaActual,paginas,setPaginaActual,setpaginas}=paginador()

  useEffect(() => {
    listar();
  }, [reload, codigo, nombre, categoriaSeleccionada, unidadSeleccionada, paginaActual]);

  useEffect(() => {
    if (codigo && data.length > 0) {
      const item = data.find((d) => d.codigo === codigo);
      if (item) {
        const yaExiste = stock.some((s) => s.stock === item._id);
        if (!yaExiste) {
          const nuevo: StockSeleccionadoI = {
            stock: item._id,
            codigo: item.codigo,
            nombre: `${item.producto}/${item.descripcion}`,
            precioUnitario: item.precioUnitario,
            cantidad: 1,
            montoTotal: item.precioUnitario,
          };
          setStock([...stock, nuevo]);
        }
        setCodigo("");
      }
    }
  }, [data]);
  const listar = async () => {
    try {
      const response = await listarStock(
        codigo,
        nombre,
        categoriaSeleccionada,
        unidadSeleccionada,
        paginaActual,
        limite
      );
      if (response && response.Data.length > 0) {
        setData(response.Data);
        setpaginas(response.Paginas)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableContainer component={Paper}>
      <QRScanner setCodigo={setCodigo} />
      <BuscadorStock
        categoriaSeleccionada={categoriaSeleccionada}
        codigo={codigo}
        nombre={nombre}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        setCodigo={setCodigo}
        setNombre={setNombre}
        setUnidadSeleccionada={setUnidadSeleccionada}
        unidadSeleccionada={unidadSeleccionada}
      />

      <Table size="small">
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
            <TableRow hover key={item._id}>
              <TableCell sx={{ fontSize: 13 }}>{item.codigo}</TableCell>
              <TableCell sx={{ fontSize: 13 }}>
                {item.producto} / {item.descripcion}
              </TableCell>
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
        <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={paginas}
                    page={paginaActual}
                    onChange={(_: React.ChangeEvent<unknown>, value: number)=> setPaginaActual(value)}
                
                    size="small"
           
                />
            </Box>
    </TableContainer>
  );
};
