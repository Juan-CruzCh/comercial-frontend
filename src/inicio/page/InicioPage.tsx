
import {
  Box,
  Typography,

} from '@mui/material';
import { GraficoReporteMensual } from '../components/GraficoReporteMensual';



export const InicioPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Ventas
      </Typography>
      <GraficoReporteMensual/>
    </Box>
  );
};
