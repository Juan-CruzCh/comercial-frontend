import { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { SucursalI } from "../interface/sucursal";
import { crearSucursal } from "../service/sucursalService";


export const RegistrarSucursalModal = () => {
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm<SucursalI>();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const onSubmit = async (data: SucursalI) => {
        try {
            console.log("Nueva sucursal:", data);
            const response = await crearSucursal(data)
            console.log(response);

            handleClose();
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <Box>
            {/* Botón para abrir modal */}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Registrar Sucursal
            </Button>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Registrar Sucursal</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <TextField
                            label="Nombre de la Sucursal"
                            fullWidth
                            size="small"
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            label="Dirección"
                            fullWidth
                            size="small"
                            {...register("direccion", { required: "La dirección es obligatoria" })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="inherit">
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="success">
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </Box>
    );
};
