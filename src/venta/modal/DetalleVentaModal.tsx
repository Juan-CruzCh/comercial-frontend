import {
    Modal,
    Box,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
    Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { buscarVentaPorId } from "../service/VentaService";
import type { VentaPorIdI } from "../interface/ventaInterface";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 500,
    maxHeight: "85vh",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
};

export const DetalleVentaModal = ({
    idVenta,
    open,
    setOpen,
}: {
    idVenta: string;
    open: boolean;
    setOpen: (v: boolean) => void;
}) => {
    const [venta, setVenta] = useState<VentaPorIdI>({
        codigo: "",
        detalleVenta: [],
        usuario: "",
        descuento: 0,
        fechaVenta: "",
        montoTotal: 0,
        subTotal: 0,
        sucursal: "",
    });

    useEffect(() => {
        if (open) {
            detalle();
        }
    }, [open]);

    const detalle = async () => {
        try {
            const response = await buscarVentaPorId(idVenta);
            setVenta(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
                {/* Encabezado */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="1px dashed #999"
                    px={2}
                    py={1}
                    bgcolor="grey.100"
                >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        🧾 Detalle de Venta
                    </Typography>
                    <IconButton size="small" onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Contenido con scroll */}
                <Box flex={1} overflow="auto" px={2} py={2}>
                    {/* Datos principales */}
                    <Box mb={2}>
                        <Grid container spacing={1}>
                            <Grid>
                                <Typography variant="body2">
                                    <strong>Sucursal:</strong> {venta.sucursal}
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography variant="body2">
                                    <strong>Código:</strong> {venta.codigo}
                                </Typography>
                            </Grid>
                            <Grid >
                                <Typography variant="body2">
                                    <strong>Fecha:</strong>{" "}
                                    {venta.fechaVenta
                                        ? venta.fechaVenta.replace("T", " ").substring(0, 19)
                                        : ""}
                                </Typography>
                            </Grid>
                            <Grid >
                                <Typography variant="body2">
                                    <strong>Vendedor:</strong> {venta.usuario}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Tabla de productos */}
                    <TableContainer
                        component={Paper}
                        sx={{
                            borderRadius: 1,
                            boxShadow: "none",
                            maxHeight: "45vh",
                        }}
                    >
                        <Table size="small" stickyHeader>
                            <TableHead>
                                <TableRow sx={{ borderBottom: "1px dashed #999" }}>
                                    <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                        Cant
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                        Total
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {venta.detalleVenta.map((prod, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{prod.descripcion}</TableCell>
                                        <TableCell align="center">{prod.cantidad}</TableCell>
                                        <TableCell align="right">{prod.precioTotal.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Totales */}
                    <Box mt={2} borderTop="1px dashed #999" pt={2}>
                        <Typography variant="body2">
                            subTotal: <strong>{venta.subTotal.toFixed(2)} Bs</strong>
                        </Typography>
                        <Typography variant="body2">
                            Descuento: <strong>{venta.descuento.toFixed(2)} Bs</strong>
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="h6" sx={{ textAlign: "right" }}>
                            Total: <strong>{venta.montoTotal.toFixed(2)} Bs</strong>
                        </Typography>
                        <Typography
                            variant="caption"
                            display="block"
                            textAlign="center"
                            mt={1}
                            color="text.secondary"
                        >
                            ¡Gracias por su compra!
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};
