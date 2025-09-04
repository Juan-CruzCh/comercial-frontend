import { useState } from "react";
import { ListarProductos } from "../components/ListarProductos";
import { ListarProveedor } from "../components/ListarProveedor";
import type { IngresoStockI, proveedorSeleccionadoI, RegistrarStockData, stockCargadoI } from "../interface/stock";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useForm } from "react-hook-form";
import { registrarStock } from "../service/sotckService";
import { useNavigate } from "react-router-dom";
import { alertConfirmacionStock } from "../modal/alertConfirmacionStock";


export const RegistrarStockPage = () => {
    const navigate = useNavigate()
    const [proveedor, setproveedor] = useState<proveedorSeleccionadoI>()
    const [producto, setproducto] = useState<proveedorSeleccionadoI>()
    const [stock, setStock] = useState<stockCargadoI[]>([])
    const { register, handleSubmit, formState: { errors } } = useForm<IngresoStockI>()
    const [habilitarFecha, setHabilitarFecha] = useState(false);
    const btnIngreso = (data: IngresoStockI) => {
        if (producto && proveedor) {
            const nuevaData: stockCargadoI = {
                factura:data.factura,
                cantidad: Number(data.cantidad),
                descuento: Number(data.descuento),
                montoTotal: Number(data.cantidad) * Number(data.precioUnitario),
                precioUnitario: Number(data.precioUnitario),
                producto: producto.id,
                nombreProducto: producto.data,
                sudTotal: (Number(data.cantidad) * Number(data.precioUnitario)) - Number(data.descuento),
                fechaVencimiento: data.fechaVencimiento
            }
            setStock([...stock, nuevaData])
        }
    }

    const btnRegistrarIngreso = async () => {

        if (stock.length > 0 && proveedor) {
            const confirmar = await alertConfirmacionStock()
            if (!confirmar) {
                return
            }
            const data: RegistrarStockData = {
                proveedor: proveedor.id,
                factura: stock[0].factura,
                montoTotal: stock.reduce((acc, item) => item.montoTotal + acc, 0),
                stock: stock.map((item) => {
                    return {
                        cantidad: item.cantidad,
                        fechaVencimiento: new Date(item.fechaVencimiento),
                        producto: item.producto,
                        precioUnitario: item.precioUnitario,
                        montoTotal: item.montoTotal,
                        descuento: item.descuento,
                        sudTotal: item.sudTotal
                    }
                })
            }
            try {
                const response = await registrarStock(data)
                if (response) {
                    navigate(`/detalle/ingreso/${response.ingreso}`)
                }
            } catch (error) {
                console.log(error);

            }

        }
    }

    return (
        <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
            {/* Título principal */}
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
                Registrar Stock
            </h1>

            {/* Sección Proveedores */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-3 text-gray-700">Proveedores</h2>
                <ListarProveedor setSeleccionado={setproveedor} />
            </div>

            {/* Sección Productos */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-3 text-gray-700">Productos</h2>
                <ListarProductos setSeleccionado={setproducto} />
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-3 text-gray-700">
                    Seleccionados
                </h2>

                <TableContainer sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: "bold" }}>Seleccionado</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {proveedor && (
                                <TableRow hover>
                                    <TableCell>{proveedor.data}</TableCell>
                                    <TableCell>

                                    </TableCell>
                                </TableRow>
                            )}

                            {producto && (
                                <TableRow hover>
                                    <TableCell>{producto.data}</TableCell>
                                    <TableCell>

                                    </TableCell>
                                </TableRow>
                            )}

                            {!proveedor && !producto && (
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Box textAlign="center" color="gray.500" fontStyle="italic">
                                            No hay seleccionados
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/* Sección Registrar Stock */}
            <form className="bg-white p-4 rounded shadow" onSubmit={handleSubmit(btnIngreso)}>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Ingreso de Stock</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Cantidad */}
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">Cantidad</label>
                        <input
                            type="number"
                            {...register("cantidad", {
                                required: true, valueAsNumber: true, min: {
                                    value: 1,
                                    message: "La cantidad debe ser mayor a 1",
                                },
                            })}
                            placeholder="Cantidad"
                            className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.cantidad && <p className="text-sm text-red-500">{errors.cantidad.message}</p>}
                    </div>

                    {/* Precio Unitario */}
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">Precio Unitario</label>
                        <input

                            type="number"
                            {...register("precioUnitario", {
                                required: true, valueAsNumber: true, min: {
                                    value: 1,
                                    message: "El precio unitario debe ser mayor a 1",
                                },
                            })}
                            step="any"
                            placeholder="Precio Unitario"
                            className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.precioUnitario && <p className="text-sm text-red-500">{errors.precioUnitario.message}</p>}
                    </div>

                    {/* Fecha de Vencimiento */}
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">
                            Fecha de Vencimiento
                        </label>

                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            checked={habilitarFecha}
                            onChange={(e) => setHabilitarFecha(e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-xs text-gray-700">Habilitar fecha</span>

                        {/* Input de fecha */}
                        <input
                            {...register("fechaVencimiento")}
                            type="date"
                            disabled={!habilitarFecha} // 🔹 se desactiva si el checkbox no está marcado
                            className={`w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2 ${!habilitarFecha ? "bg-gray-100 cursor-not-allowed" : ""
                                }`}

                        />

                    </div>

                    {/* Código de Factura */}
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">Código de Factura</label>
                        <input
                            {...register("factura", { required: "Ingrese numero de factura" })}
                            type="text"
                            placeholder="Código Factura"
                            className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.factura && <p className="text-sm text-red-500">{errors.factura.message}</p>}
                    </div>


                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-600">Descuento</label>
                        <input
                            type="number"
                            {...register("descuento", {
                                valueAsNumber: true, value: 0, min: {
                                    value: 0,
                                    message: "La cantidad debe ser mayor a 0",
                                },
                            })}
                            placeholder="Descuento"
                            className="w-full text-xs p-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.descuento && <p className="text-sm text-red-500">{errors.descuento.message}</p>}
                    </div>
                </div>

                <button onClick={() => btnIngreso} className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-all">
                    Ingresar
                </button>
            </form>

            {stock.length > 0 && <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-3 text-gray-700">
                    Seleccionados
                </h2>

                <TableContainer sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Cantidad</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>PrecioUnitario</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>MontoTotal</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Descuento</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>SudTotal</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Fecha de Vencimiento</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stock.map((item) => (
                                <TableRow hover>
                                    <TableCell>{item.nombreProducto}</TableCell>
                                    <TableCell>
                                        {item.cantidad}
                                    </TableCell>
                                    <TableCell>
                                        {item.precioUnitario}
                                    </TableCell>
                                    <TableCell>
                                        {item.montoTotal}
                                    </TableCell>
                                    <TableCell>
                                        {item.descuento}
                                    </TableCell>
                                    <TableCell>
                                        {item.sudTotal}
                                    </TableCell>
                                    <TableCell>
                                        {item.fechaVencimiento}
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                    <div className="text-center mt-2">
                        <Button size="small" variant="contained" color="primary"
                            onClick={() => btnRegistrarIngreso()}
                        >Guardar</Button>
                    </div>
                </TableContainer>

            </div>
            }
        </div>
    );
};
