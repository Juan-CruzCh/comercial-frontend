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
import type { CategoriaI } from "../interface/categoria";
import { crearCategoria } from "../service/categoriaService";

export const RegistrarCategoriaModal = () => {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoriaI>();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submitForm = async (data: CategoriaI) => {
        data.nombre = data.nombre.toUpperCase()
        try {
            const response = await crearCategoria(data)
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
                Registrar categoria
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"   // más pequeño que "sm"
                fullWidth={false} // no ocupar todo el ancho permitido

            >
                <DialogTitle>Registrar Categoria</DialogTitle>
                <form onSubmit={handleSubmit(submitForm)}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Nombre de la categoria"
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
                            Registrar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div>
    );
};
