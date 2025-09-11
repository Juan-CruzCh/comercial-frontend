import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import InventoryIcon from '@mui/icons-material/Inventory';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CategoryIcon from '@mui/icons-material/Category';



export const InicioPage = () => {
  const data = {
    dia: {
      total: 1250,
      ventas: 18,
      productosVendidos: 42,
      ticketPromedio: 69.44,
    },
    semana: {
      total: 8450,
      ventas: 112,
      productosVendidos: 320,
    },
    mes: {
      total: 21700,
      ventas: 275,
      productosVendidos: 765,
      ticketPromedio: 78.91,
    },
    stock: {
      bajoStock: 4,
      sinStock: 2,
      totalProductos: 120,
    },
    topProducto: 'Café Expreso 250g',
    topCategoria: 'Bebidas Calientes',
  };

  const ventasMensuales = [
    { nombre: 'Ene', ventas: 5000 },
    { nombre: 'Feb', ventas: 7200 },
    { nombre: 'Mar', ventas: 6300 },
    { nombre: 'Abr', ventas: 8200 },
    { nombre: 'May', ventas: 9100 },
    { nombre: 'Jun', ventas: 10000 },
    { nombre: 'Jul', ventas: 9750 },
    { nombre: 'Ago', ventas: 8700 },
    { nombre: 'Sep', ventas: 9300 },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Ventas
      </Typography>

      <Grid container spacing={3}>
        {/* Tarjetas resumen */}
        <Grid >
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ShoppingCartIcon sx={{ fontSize: 40, mr: 2, color: '#1976d2' }} />
              <Typography variant="h6">Ventas del Día</Typography>
            </Box>
            <Divider />
            <CardContent>
              <Typography variant="subtitle2">Total: ${data.dia.total}</Typography>
              <Typography variant="subtitle2">Ventas: {data.dia.ventas}</Typography>
              <Typography variant="subtitle2">Productos: {data.dia.productosVendidos}</Typography>
              <Typography variant="subtitle2">Ticket promedio: ${data.dia.ticketPromedio.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid >
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarViewWeekIcon sx={{ fontSize: 40, mr: 2, color: '#388e3c' }} />
              <Typography variant="h6">Ventas de la Semana</Typography>
            </Box>
            <Divider />
            <CardContent>
              <Typography variant="subtitle2">Total: ${data.semana.total}</Typography>
              <Typography variant="subtitle2">Ventas: {data.semana.ventas}</Typography>
              <Typography variant="subtitle2">Productos: {data.semana.productosVendidos}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid >
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 40, mr: 2, color: '#f57c00' }} />
              <Typography variant="h6">Ventas del Mes</Typography>
            </Box>
            <Divider />
            <CardContent>
              <Typography variant="subtitle2">Total: ${data.mes.total}</Typography>
              <Typography variant="subtitle2">Ventas: {data.mes.ventas}</Typography>
              <Typography variant="subtitle2">Productos: {data.mes.productosVendidos}</Typography>
              <Typography variant="subtitle2">Ticket promedio: ${data.mes.ticketPromedio.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Inventario */}
        <Grid >
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <InventoryIcon sx={{ fontSize: 40, mr: 2, color: '#d32f2f' }} />
              <Typography variant="h6">Inventario</Typography>
            </Box>
            <Divider />
            <CardContent>
              <Typography variant="subtitle2">Bajo stock: {data.stock.bajoStock}</Typography>
              <Typography variant="subtitle2">Sin stock: {data.stock.sinStock}</Typography>
              <Typography variant="subtitle2">Total productos: {data.stock.totalProductos}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Producto y categoría top */}
        <Grid>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LeaderboardIcon sx={{ fontSize: 40, mr: 2, color: '#512da8' }} />
              <Typography variant="h6">Top Productos</Typography>
            </Box>
            <Divider />
            <CardContent>
              <Typography variant="subtitle2">Más vendido:</Typography>
              <Typography variant="h6">{data.topProducto}</Typography>
            </CardContent>
          </Card>
        </Grid>     
      </Grid>
    </Box>
  );
};
