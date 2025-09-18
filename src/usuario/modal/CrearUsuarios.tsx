import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { UsuarioI } from "../interface/usuarioInterface";
import { listarSucursal } from "../../sucursal/service/sucursalService";
import type { SucursalI } from "../../sucursal/interface/sucursal";
import { crearUsuario } from "../service/usuarioService";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export const CrearUsuarios = () => {
  const [open, setOpen] = useState(false);
  const [sucursales, setsucursales] = useState<SucursalI[]>([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UsuarioI>();

  const onSubmit = async (data: UsuarioI) => {
    try {
      const response = await crearUsuario(data);
      console.log(response);

      handleClose();
      reset();
    } catch (error) {
      const e = error as AxiosError<any>;
      if (e.status === 400) {
        toast.error(e.response?.data.error);
      }
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    ListarSucursal();
  }, []);

  const ListarSucursal = async () => {
    try {
      const response = await listarSucursal();
      setsucursales(response);
    } catch (error) {}
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Crear Usuario
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Crear Usuario</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Controller
              name="ci"
              control={control}
              rules={{ required: "El ci es obligatorio" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ci"
                  variant="outlined"
                  size="small"
                  error={!!errors.ci}
                  helperText={errors.ci?.message}
                />
              )}
            />
            <Controller
              name="nombre"
              control={control}
              rules={{ required: "El nombre es obligatorio" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  variant="outlined"
                  size="small"
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message}
                />
              )}
            />

            <Controller
              name="apellidos"
              control={control}
              rules={{ required: "Los apellidos son obligatorios" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apellidos"
                  variant="outlined"
                  size="small"
                  error={!!errors.apellidos}
                  helperText={errors.apellidos?.message}
                />
              )}
            />

            <Controller
              name="username"
              control={control}
              rules={{ required: "El usuario es obligatorio" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Usuario"
                  variant="outlined"
                  size="small"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: "La contraseña es obligatoria" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Controller
              name="sucursal"
              control={control}
              rules={{ required: "La sucursal es obligatoria" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Sucursal"
                  variant="outlined"
                  size="small"
                  error={!!errors.sucursal}
                  helperText={errors.sucursal?.message}
                >
                  {sucursales.map((sucursal) => (
                    <MenuItem key={sucursal._id} value={sucursal._id}>
                      {sucursal.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="rol"
              control={control}
              rules={{ required: "La rol es obligatoria" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Rol"
                  variant="outlined"
                  size="small"
                  error={!!errors.rol}
                  helperText={errors.rol?.message}
                >
                  <MenuItem key={1} value="ADMINISTRADOR">
                    ADMINISTRADOR
                  </MenuItem>
                  <MenuItem key={2} value="VENDEDOR">
                    VENDEDOR
                  </MenuItem>
                </TextField>
              )}
            />

            <DialogActions sx={{ px: 0 }}>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit" variant="contained" color="primary">
                Crear
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
