import {
    Box,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Stack,
    Divider,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const RealizarVentaPage = () => {
    return (
        <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto" }}>
            {/* Título */}
            <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: "bold", color: "#1e40af", textAlign: "center", fontSize: 22 }}
            >
                Realizar Venta
            </Typography>

            {/* Contenedor principal */}
            <Box sx={{ display: "flex", gap: 2 }}>
                {/* Carrito */}
                <Paper
                    sx={{
                        flex: 1.5,
                        p: 3,
                        boxShadow: 3,
                        borderRadius: 2,
                        maxHeight: 700,
                        minWidth: 350,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ mb: 2, color: "#1e40af", fontWeight: "bold", fontSize: 16 }}
                    >
                        Carrito de Compras
                    </Typography>

                    <Stack spacing={2}>
                        {["Producto A", "Producto B", "Producto C", "Producto D", "Producto E"].map((prod, i) => (
                            <Box key={i}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography variant="body2">{prod}</Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <TextField type="number" size="small" defaultValue={1} sx={{ width: 50 }} />
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

                        <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: 13, mt: 1 }}>
                            <Typography variant="body2">Subtotal</Typography>
                            <Typography variant="body2">3</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: 13 }}>
                            <Typography variant="body2">Descuento</Typography>
                            <Typography variant="body2">0 Bs.</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: 13 }}>
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

                {/* Tabla de Stock */}
                <TableContainer
                    component={Paper}
                    sx={{
                        flex: 3,
                        boxShadow: 3,
                        borderRadius: 2,
                        maxHeight: 700,
                        minWidth: 700,
                    }}
                >
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#1e40af" }}>
                                {["Código", "Producto", "Categoría", "Stock", "Unidad", "Venc.", "Acción"].map((head, i) => (
                                    <TableCell key={i} sx={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>

                            {/* Fila de filtros */}
                            <TableRow>
                                {["Filtrar Código", "Filtrar Nombre", "Filtrar Categoría", "", "Filtrar Unidad", "", ""].map(
                                    (placeholder, i) => (
                                        <TableCell key={i}>
                                            {placeholder ? (
                                                <TextField
                                                    size="small"
                                                    placeholder={placeholder}
                                                    variant="outlined"
                                                    sx={{
                                                        width: "100%",
                                                        fontSize: 12,
                                                        backgroundColor: "#e0f2fe", // azul claro Tailwind
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: 1,
                                                            fontSize: 12,
                                                            "&:hover fieldset": {
                                                                borderColor: "#3b82f6", // azul más vivo al hover
                                                            },
                                                            "&.Mui-focused fieldset": {
                                                                borderColor: "#2563eb", // azul al enfocar
                                                            },
                                                        },
                                                    }}
                                                />
                                            ) : null}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow hover>
                                <TableCell sx={{ fontSize: 13 }}>001</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>Producto A</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>Categoría 1</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>10</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>Unidad</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>01/12/2025</TableCell>
                                <TableCell>
                                    <Button variant="contained" size="small" color="primary" sx={{ fontSize: 12 }}>
                                        Añadir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};
