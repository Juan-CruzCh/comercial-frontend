import {
    Box,
    Typography,
    TextField,
    Paper,
    Button,
    Stack,
    Divider,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ListarStock } from "../components/ListarStock";
import { useState } from "react";
import type { StockSeleccionadoI } from "../interface/ventaInterface";

export const RealizarVentaPage = () => {
    const [stockSeleccionado, setStockSeleccionado]=useState<StockSeleccionadoI[]>([])
    console.log(stockSeleccionado);
    
    return (
        <Box sx={{ p: 2, mx: "auto" }}>
            {/* Título */}
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    fontWeight: "bold",
                    color: "#1e40af",
                    textAlign: "center",
                    fontSize: 22,
                }}
            >
                Realizar Venta
            </Typography>

            {/* Contenedor principal */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column", // móvil
                        sm: "row",    // desde 600px en adelante
                    },
                    gap: 2,
                }}
            >
                {/* Tabla de Stock (encima en móviles, más ancha en desktop) */}
                <Box sx={{ flex: { xs: "unset", sm: 2 } }}>
                    <ListarStock setStock={setStockSeleccionado} stock={stockSeleccionado} />
                </Box>

                {/* Carrito */}
                <Paper sx={{ p: 2, flex: { xs: "unset", sm: 1 } }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            mb: 2,
                            color: "#1e40af",
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >
                        Carrito de Compras
                    </Typography>

                    <Stack spacing={2}>
                        {stockSeleccionado.map((item, i) => (
                            <Box key={i}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography variant="body2">{item.nombre}</Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <TextField
                                            type="number"
                                            size="small"
                                            defaultValue={1}
                                            sx={{ width: 50 }}
                                        />
                                        <IconButton color="primary" size="small">
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                {i < 4 && <Divider />}
                            </Box>
                        ))}

                        <TextField
                            label="Descuento (Bs.)"
                            variant="outlined"
                            size="small"
                            type="number"
                            sx={{ width: "100%", mt: 1 }}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "bold",
                                fontSize: 13,
                                mt: 1,
                            }}
                        >
                            <Typography variant="body2">Subtotal</Typography>
                            <Typography variant="body2">3</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "bold",
                                fontSize: 13,
                            }}
                        >
                            <Typography variant="body2">Descuento</Typography>
                            <Typography variant="body2">0 Bs.</Typography>
                        </Box>
                        <Divider />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "bold",
                                fontSize: 13,
                            }}
                        >
                            <Typography variant="body2">Total</Typography>
                            <Typography variant="body2">3</Typography>
                        </Box>

                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Realizar Venta
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
};
