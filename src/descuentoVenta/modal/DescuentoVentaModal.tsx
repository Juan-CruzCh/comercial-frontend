import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";
import type { descuentoVentaI } from "../interface/descuentoVenta";
import { Controller, useForm } from "react-hook-form";
import { listarSucursal } from "../../sucursal/service/sucursalService";
import type { SucursalI } from "../../sucursal/interface/sucursal";
import { CrearDescuentoVenta } from "../service/descuentoVenta";

export const DescuentoVentaModal = () => {
    const [open, setOpen] = useState(false);
    const [sucursales, setsucursales] = useState<SucursalI[]>([])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<descuentoVentaI>();

    const handleFormSubmit = async (data: descuentoVentaI) => {
        try {
            console.log(data);

            const response = await CrearDescuentoVenta(data)
            if (response.status == 201) {
                reset();
                setOpen(false)
            }
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        listar()
    }, [open])
    const listar = async () => {
        try {
            const response = await listarSucursal()
            if (response) {
                setsucursales(response)
            }
        } catch (error) {

        }
    }

    return (
        <>
            {/* Botón que abre el modal */}
            <Button variant="contained" onClick={() => setOpen(true)}>
                Nuevo Descuento
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="xs"         // más angosto
                fullWidth             // ocupa todo el ancho permitido por xs
                PaperProps={{
                    sx: { borderRadius: 3, p: 1 }, // opcional: esquinas redondeadas y padding
                }}
            >
                <DialogTitle>Crear Descuento</DialogTitle>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <DialogContent dividers>
                        <TextField
                            margin="dense"
                            fullWidth
                            size="small"
                            type="number"
                            label="Alquiler"
                            {...register("alquiler", { required: "El alquiler es obligatorio", valueAsNumber: true })}
                            error={!!errors.alquiler}
                            helperText={errors.alquiler?.message}
                        />

                        <TextField
                            margin="dense"
                            fullWidth
                            size="small"
                            label="Vendedor"
                            type="number"
                            {...register("vendedor", { required: "El vendedor es obligatorio", valueAsNumber: true })}
                            error={!!errors.vendedor}
                            helperText={errors.vendedor?.message}
                        />
                        <TextField
                            fullWidth
                            select
                            label="Vendedor"
                            {...register("sucursal")}
                            error={!!errors.sucursal}
                            helperText={errors.sucursal?.message}
                        >
                            <MenuItem value="">Seleccionar</MenuItem>
                            {sucursales.map((item) => (
                                <MenuItem key={item._id} value={item._id}>
                                    {item.nombre}
                                </MenuItem>
                            ))}

                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="secondary">
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
