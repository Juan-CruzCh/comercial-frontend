import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { ProductoI,  } from "../../producto/interface/producto";
import type { CategoriaI } from "../../categoria/interface/categoria";
import { listarCategoria } from "../../categoria/service/categoriaService";
import { crearProducto  } from "../../producto/service/productoService";
import type { UnidadManejoI } from "../../unidadManejo/interface/unidaManejo";
import { listarUndiadManejo } from "../../unidadManejo/service/unidaManejoService";


export const RegistrarProductoModal = () => {
    const [open, setOpen] = useState(false);
    const [categoria, setcategoria] = useState<CategoriaI[]>([])
    const [unidadManejo, setunidadManejo] = useState<UnidadManejoI[]>([])
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductoI>();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        categoriaListar()
        unidadListar()
    }, [])

    const categoriaListar = async () => {
        try {
            const response = await listarCategoria()
            setcategoria(response)
        } catch (error) {

        }
    }
    const unidadListar = async () => {
        try {
            const response = await listarUndiadManejo()
            setunidadManejo(response)
        } catch (error) {

        }
    }
    const submitForm = async (data: ProductoI) => {

        try {
            const response = await crearProducto(data)
            reset()
            handleClose()
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div>
            {/* Botón que abre el modal */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{ borderRadius: 3 }}
            >
                Registrar Producto
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"

            >
                <DialogTitle
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                    }}
                >
                    Registrar Producto
                </DialogTitle>

                <form onSubmit={handleSubmit(submitForm)}>
                    <DialogContent sx={{ pt: 0 }}>
                        {/* Nombre */}
                        <TextField
                            fullWidth
                            label="Nombre"
                            size="small"
                            margin="dense"
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                            error={!!errors.nombre}
                            helperText={errors.nombre?.message}
                        />

                        {/* Descripción */}
                        <TextField
                            fullWidth
                            label="Descripción"
                            size="small"
                            margin="dense"
                            multiline
                            rows={2}
                            {...register("descripcion", { required: "La descripción es obligatoria" })}
                            error={!!errors.descripcion}
                            helperText={errors.descripcion?.message}
                        />

                        {/* Categoría */}
                        <TextField
                            select
                            fullWidth
                            label="Categoría"
                            size="small"
                            margin="dense"
                            {...register("categoria", { required: "La categoría es obligatoria" })}
                            error={!!errors.categoria}
                            helperText={errors.categoria?.message}
                        >
                            {
                                categoria.map((item) => <MenuItem value={item._id}>{item.nombre}</MenuItem>)
                            }

                        </TextField>

                        {/* Unidad de Manejo */}
                        <TextField
                            select
                            fullWidth
                            label="Unidad de Manejo"
                            size="small"
                            margin="dense"
                            {...register("unidadManejo", { required: "La unidad de manejo es obligatoria" })}
                            error={!!errors.unidadManejo}
                            helperText={errors.unidadManejo?.message}
                        >


                            {

                                unidadManejo.map((item) => <MenuItem value={item._id}>{item.nombre}</MenuItem>)
                            }

                        </TextField>
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: "center", gap: 1 }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            color="secondary"
                            sx={{ borderRadius: 3 }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ borderRadius: 3 }}
                        >
                            Registrar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};
