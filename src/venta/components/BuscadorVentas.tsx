import React from 'react';
import { Box, Grid, TextField, MenuItem, Button } from '@mui/material';

export const BuscadorVentas = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {/* Ventana */}
        

        {/* Sucursal */}
        <Grid  width={180}>
          <TextField
            label="Sucursal"
            fullWidth
            select
            defaultValue=""
          >
            <MenuItem value="">Seleccionar</MenuItem>
            <MenuItem value="sucursal1">Sucursal 1</MenuItem>
            <MenuItem value="sucursal2">Sucursal 2</MenuItem>
          </TextField>
        </Grid>

        {/* Vendedor */}
        <Grid width={250}>
          <TextField
            label="Vendedor"
            fullWidth
            select
            defaultValue=""
          >
            <MenuItem value="">Seleccionar</MenuItem>
            <MenuItem value="vendedor1">Vendedor 1</MenuItem>
            <MenuItem value="vendedor2">Vendedor 2</MenuItem>
          </TextField>
        </Grid> 

        <Grid  width={180}>
          <TextField
            label="Codigo de venta"
            fullWidth
            type='txt'
           
          >
            
          </TextField>
        </Grid>

        {/* Fecha Inicio */}
        <Grid >
          <TextField
   
            type="date"
            fullWidth
        
          />
        </Grid>

        {/* Fecha Fin */}
        <Grid >
          <TextField
         
            type="date"
            fullWidth
          
          />
        </Grid>

        {/* Botón de búsqueda */}
        <Grid  alignSelf="flex-end">
          <Button variant="contained" color="primary" fullWidth>
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
