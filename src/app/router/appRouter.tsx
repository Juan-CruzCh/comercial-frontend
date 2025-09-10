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
import { DetalleIngresoPage } from "../../ingreso/page/DetalleIngresoPage";
import { ListarUsuarioPage } from "../../usuario/page/ListarUsuarioPage";
import { AutenticacionPage } from "../../autenticacion/page/AutenticacionPage";
import { useContext } from "react";
import { AuntenticacionContext } from "../context/AutenticacionProvider";
import { InicioPage } from "../../inicio/page/InicioPage";
import { CajaProvider } from "../context/CajaProvider";
import { ListarCajaPage } from "../../caja/page/ListarCajaPage";
import { ListarDescuentoVenta } from "../../descuentoVenta/page/ListarDescuentoVenta";
import { ReporteVentasPage } from "../../venta/page/ReporteVentasPage";

export const AppRouter = () => {
  const { isAutenticacion } = useContext(AuntenticacionContext);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAutenticacion ? (
              <CajaProvider><Menu /></CajaProvider>
            ) : (
              <AutenticacionPage />
            )
          }
        >
          <Route path="inicio" element={<InicioPage />} />
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
          <Route path="detalle/ingreso/:id" element={<DetalleIngresoPage />} />
          <Route path="listar/usuarios" element={<ListarUsuarioPage />} />
          <Route path="listar/caja" element={<ListarCajaPage />} />
          <Route path="listar/descuento/venta" element={<ListarDescuentoVenta />} />
          <Route path="reporte/ventas" element={<ReporteVentasPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
