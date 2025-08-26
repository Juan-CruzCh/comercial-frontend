import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProveedorPage } from "../../proveedor/page/ProveedorPage";
import { UnidadManegoPage } from "../../producto/page/UnidadManegoPage";
import { RegistrarStockPage } from "../../stock/page/RegistrarStockPage";
import { Menu } from "../components/Menu";
import { ListarStockPage } from "../../stock/page/ListarStockPage";
import { RealizarVentaPage } from "../../venta/page/RealizarVentaPage";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta padre con layout */}
                <Route path="/" element={<Menu />}>
                    {/* Rutas hijas */}
                    <Route path="proveedor" element={<ProveedorPage />} />
                    <Route path="unidad/manejo" element={<UnidadManegoPage />} />
                    <Route path="realizar/ingreso" element={<RegistrarStockPage />} />
                    <Route path="listar/stock" element={<ListarStockPage />} />
                    <Route path="realizar/venta" element={<RealizarVentaPage />} />
                </Route>
            </Routes>
        </Router>
    )
}