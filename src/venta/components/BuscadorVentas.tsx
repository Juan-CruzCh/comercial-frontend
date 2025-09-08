import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, MenuItem, Button } from "@mui/material";
import type { UsuarioI } from "../../usuario/interface/usuarioInterface";
import { listarUsuarios } from "../../usuario/service/usuarioService";
import type { SucursalI } from "../../sucursal/interface/sucursal";
import { listarSucursal } from "../../sucursal/service/sucursalService";
import type { BuscadorVentasI } from "../interface/ventaInterface";

export const BuscadorVentas = ({setFiltro}:{setFiltro:(v:BuscadorVentasI)=>void}) => {
  const date = new Date();
  console.log(date.toDateString().split("T")[0]);

  const [codido, setcodido] = useState<string>("");
  const [usuarios, setUsuarios] = useState<UsuarioI[]>([]);
   const [usuario, setUsuario] = useState<string>("");
  const [sucursales, setSucursales] = useState<SucursalI[]>([]);
  const [sucursal, setSucursal] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>(
    date.toISOString().split("T")[0]
  );
  const [fechaFin, setFechaFin] = useState<string>(
    date.toISOString().split("T")[0]
  );
  const btnBuscar = () => {
    const filtro:BuscadorVentasI = {
      codigo:codido,
      fechaFin:fechaFin,
      fechaInicio:fechaInicio,
      sucursal:sucursal,
      usuario:usuario
    }
    setFiltro(filtro)
    
  };

  useEffect(() => {
    listar()
  }, [])
  
  const listar =async ()=>{
    try {
        const [usuarios, sucursal]= await Promise.all([
          listarUsuarios(),
          listarSucursal()
        ])
        setSucursales(sucursal)
        setUsuarios(usuarios)
    } catch (error) {
      console.log(error);
      
    }
  }
  
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid width={180}>
          <TextField label="Sucursal" fullWidth select defaultValue="" onChange={(e)=> setSucursal(e.target.value)}>
            <MenuItem value="">Seleccionar</MenuItem>
                   {sucursales.map((item)=>  <MenuItem value={item._id}>{item.nombre}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid width={250}>
          <TextField label="Vendedor" fullWidth select defaultValue="" onChange={(e)=> setUsuario(e.target.value)}>
            <MenuItem value="">Seleccionar</MenuItem>
          {usuarios.map((item)=>  <MenuItem value={item._id}>{item.nombre} {item.apellidos}</MenuItem>)}
           
          </TextField>
        </Grid>

        <Grid width={180}>
          <TextField
            label="Codigo de venta"
            fullWidth
            type="txt"
            onChange={(e) => setcodido(e.target.value)}
          ></TextField>
        </Grid>

        {/* Fecha Inicio */}
        <Grid>
          <TextField
            value={fechaInicio}
            type="date"
            fullWidth
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </Grid>

        {/* Fecha Fin */}
        <Grid>
          <TextField
            value={fechaFin}
            type="date"
            fullWidth
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </Grid>

        {/* Botón de búsqueda */}
        <Grid alignSelf="flex-end">
          <Button
            onClick={btnBuscar}
            variant="contained"
            color="primary"
            fullWidth
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
