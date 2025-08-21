import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProveedorPage } from "../../proveedor/page/ProveedorPage";
import { UnidadManegoPage } from "../../producto/page/UnidadManegoPage";
import { RegistrarStockPage } from "../../stock/page/RegistrarStockPage";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/proveedor" element={<ProveedorPage />} />
                <Route path="/unidad/manejo" element={<UnidadManegoPage />} />
                <Route path="/registrar/stock" element={<RegistrarStockPage />} />
            </Routes>
        </Router>
    );
};
