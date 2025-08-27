import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { UnidadManegoPage } from "../../producto/page/UnidadManegoPage";
import type { UnidadManejoI } from "../interface/unidaManejo";
import { crearUndiadManejo } from "../service/unidaManejoService";


export const RegistrarUnidadManejoModal = () => {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UnidadManejoI>();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submitForm = async (data: UnidadManejoI) => {
        data.nombre = data.nombre.toUpperCase()
        try {
            const response = await crearUndiadManejo(data)
            reset();
            handleClose();
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div>
            {/* Botón que abre el modal */}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Registrar unidad de  manejo
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"   // más pequeño que "sm"
                fullWidth={false} // no ocupar todo el ancho permitido

            >
                <DialogTitle>Registrar Unidad de Manejo</DialogTitle>
                <form onSubmit={handleSubmit(submitForm)}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Nombre de la Unidad de Manejo"
                            margin="normal"
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                            error={!!errors.nombre}
                            helperText={errors.nombre ? errors.nombre.message : ""}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Registrar Unidad de Manejo
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div>
    );
};
