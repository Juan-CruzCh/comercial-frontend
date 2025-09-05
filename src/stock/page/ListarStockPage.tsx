import { useEffect, useState } from "react";
import { listarStock } from "../service/sotckService";
import type { ListarStockI } from "../interface/stock";
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
  Pagination,
} from "@mui/material";
import { BuscadorStock } from "../components/BuscadorStock";
import { paginador } from "../../app/hook/paginador";

export const ListarStockPage = () => {
  const [data, setData] = useState<ListarStockI[]>([]);
  const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [unidadSeleccionada, setUnidadSeleccionada] = useState("");
    const {limite,paginaActual,paginas,setPaginaActual,setpaginas}=paginador()
  useEffect(() => {
    listar();
  }, [codigo, nombre, categoriaSeleccionada, unidadSeleccionada, paginaActual]);

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
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Listar Stock
      </Typography>
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
     
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Producto</TableCell>

              <TableCell>Categoría</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio unitario</TableCell>
              <TableCell>Unidad de Manejo</TableCell>
              <TableCell>Fecha de Vencimiento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.codigo}</TableCell>
                <TableCell>{item.producto}</TableCell>

                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
                <TableCell>{item.precioUnitario}</TableCell>
                <TableCell>{item.unidadManejo}</TableCell>
                <TableCell>{item.fechaVencimiento}</TableCell>
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
    </div>
  );
};
