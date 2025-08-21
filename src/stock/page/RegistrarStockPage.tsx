import React from "react";
import { ListarProductos } from "../components/ListarProductos";
import { ListarProveedor } from "../components/ListarProveedor";

export const RegistrarStockPage = () => {
    return (
        <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
            {/* Título principal */}
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
                Registrar Stock
            </h1>

            {/* Sección Proveedores */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-3 text-gray-700">Proveedores</h2>
                <ListarProveedor />
            </div>

            {/* Sección Productos */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-3 text-gray-700">Productos</h2>
                <ListarProductos />
            </div>

            {/* Sección Registrar Stock */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Ingreso de Stock</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Cantidad */}
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">Cantidad</label>
                        <input
                            type="number"
                            placeholder="Cantidad"
                            className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Precio Unitario */}
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">Precio Unitario</label>
                        <input
                            type="number"
                            placeholder="Precio Unitario"
                            className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Fecha de Vencimiento */}
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">Fecha de Vencimiento</label>
                        <input
                            type="date"
                            className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Código de Factura */}
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">Código de Factura</label>
                        <input
                            type="text"
                            placeholder="Código Factura"
                            className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Monto Total */}
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">Monto Total</label>
                        <input
                            type="text"
                            placeholder="Monto Total"
                            className="w-full text-xs p-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-all">
                    Ingresar
                </button>
            </div>
        </div>
    );
};
