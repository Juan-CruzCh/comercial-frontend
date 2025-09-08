import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import type { UsuarioI } from "../../usuario/interface/usuarioInterface";
import { listarUsuarios } from "../../usuario/service/usuarioService";
import type { SucursalI } from "../../sucursal/interface/sucursal";
import { listarSucursal } from "../../sucursal/service/sucursalService";
import type { BuscadorVentasI } from "../interface/ventaInterface";

export const BuscadorVentas = ({
  setFiltro,
}: {
  setFiltro: (v: BuscadorVentasI) => void;
}) => {
  const date = new Date();

  const [usarCodigo, setUsarCodigo] = useState<boolean>(false);
  const [usarFechas, setUsarFechas] = useState<boolean>(true);

  const [codigo, setCodigo] = useState<string>("");
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
    const filtro: BuscadorVentasI = {
      codigo: usarCodigo ? codigo : "",
      fechaFin: usarFechas ? fechaFin : "",
      fechaInicio: usarFechas ? fechaInicio : "",
      sucursal: sucursal,
      usuario: usuario,
    };
    setFiltro(filtro);
  };

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      const [usuarios, sucursal] = await Promise.all([
        listarUsuarios(),
        listarSucursal(),
      ]);
      setSucursales(sucursal);
      setUsuarios(usuarios);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Sucursal */}
        <Grid width={250}>
          <TextField
            fullWidth
            select
            label="Sucursal"
            value={sucursal}
            onChange={(e) => setSucursal(e.target.value)}
          >
            <MenuItem value="">Seleccionar</MenuItem>
            {sucursales.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Usuario */}
        <Grid display="flex" alignItems="center" width={300}>
          <TextField
            fullWidth
            select
            label="Vendedor"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          >
            <MenuItem value="">Seleccionar</MenuItem>
            {usuarios.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.nombre} {item.apellidos}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Código de venta */}
        <Grid display="flex" alignItems="center" width={250}>
          <FormControlLabel
            control={
              <Checkbox
                checked={usarCodigo}
                onChange={(e) => setUsarCodigo(e.target.checked)}
              />
            }
            label=""
          />
          <TextField
            fullWidth
            type="text"
            placeholder="Codigo de venta"
            disabled={!usarCodigo}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </Grid>

        {/* Fechas */}
        <Grid display="flex" alignItems="center" width={300}>
          <FormControlLabel
            control={
              <Checkbox
                checked={usarFechas}
                onChange={(e) => setUsarFechas(e.target.checked)}
              />
            }
            label=""
          />
          <TextField
            type="date"
            disabled={!usarFechas}
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            type="date"
            disabled={!usarFechas}
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </Grid>

        {/* Botón Buscar */}
        <Grid width={150}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={btnBuscar}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
