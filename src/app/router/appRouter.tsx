import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ListarProveedorPage } from "../../proveedor/page/ListarProveedorPage";
import { UnidadManegoPage } from "../../producto/page/UnidadManegoPage";
import { RegistrarStockPage } from "../../stock/page/RegistrarStockPage";
import { Menu } from "../components/Menu";
import { ListarStockPage } from "../../stock/page/ListarStockPage";
import { RealizarVentaPage } from "../../venta/page/RealizarVentaPage";
import { ListarSucursalPage } from "../../sucursal/page/ListarSucursalPage";
import { ListarIngresoPage } from "../../ingreso/page/ListarIngresoPage";
import { ListarVentaPage } from "../../venta/page/ListarVentaPage";
import { DetalleVentaPage } from "../../venta/page/DetalleVentaPage";
import { ListarCategoriaPage } from "../../categoria/page/ListarCategoriaPage";
import { ListarUnidadManejoPage } from "../../unidadManejo/page/ListarUnidadManejoPage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta padre con layout */}
        <Route path="/" element={<Menu />}>
          {/* Rutas hijas */}
          <Route path="listar/proveedor" element={<ListarProveedorPage />} />
          <Route path="unidad/manejo" element={<UnidadManegoPage />} />
          <Route path="realizar/ingreso" element={<RegistrarStockPage />} />
          <Route path="listar/stock" element={<ListarStockPage />} />
          <Route path="realizar/venta" element={<RealizarVentaPage />} />
          <Route path="listar/sucursal" element={<ListarSucursalPage />} />
          <Route path="listar/ingresos" element={<ListarIngresoPage />} />
          <Route path="listar/ventas" element={<ListarVentaPage />} />
          <Route path="detalle/venta/:id" element={<DetalleVentaPage />} />
          <Route path="listar/categoria" element={<ListarCategoriaPage />} />
          <Route
            path="listar/unidad/manejo"
            element={<ListarUnidadManejoPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
