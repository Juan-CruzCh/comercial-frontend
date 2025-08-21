import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import type { ProveedorI } from "../interface/proveedor";
import { createProveedor } from "../service/proveedorService";

export const ProveedorModal = () => {
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProveedorI>();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const onSubmit = async (data: ProveedorI) => {
        try {
            const reponse = await createProveedor(data)
            handleClose();
        } catch (error) {

        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Nuevo Proveedor
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 700, // más ancho
                        bgcolor: "white",
                        borderRadius: "12px",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Registrar Proveedor
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr", // dos columnas
                                gap: "20px", // espacio entre columnas y filas
                                marginBottom: "20px"
                            }}
                        >
                            <div>
                                <label>CI</label>
                                <input
                                    {...register("ci", { required: "El CI es obligatorio" })}
                                    type="text"
                                    placeholder="Ingrese CI"
                                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                                />
                                {errors.ci && (
                                    <span style={{ color: "red", fontSize: "12px" }}>
                                        {errors.ci.message}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label>Nombre</label>
                                <input
                                    {...register("nombre", { required: "El nombre es obligatorio" })}
                                    type="text"
                                    placeholder="Ingrese nombre"
                                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                                />
                                {errors.nombre && (
                                    <span style={{ color: "red", fontSize: "12px" }}>
                                        {errors.nombre.message}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label>Apellidos</label>
                                <input
                                    {...register("apellidos", { required: "Los apellidos son obligatorios" })}
                                    type="text"
                                    placeholder="Ingrese apellidos"
                                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                                />
                                {errors.apellidos && (
                                    <span style={{ color: "red", fontSize: "12px" }}>
                                        {errors.apellidos.message}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label>Empresa</label>
                                <input
                                    {...register("empresa", { required: "La empresa es obligatoria" })}
                                    type="text"
                                    placeholder="Ingrese empresa"
                                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                                />
                                {errors.empresa && (
                                    <span style={{ color: "red", fontSize: "12px" }}>
                                        {errors.empresa.message}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label>Celular</label>
                                <input
                                    {...register("celular", { required: "El celular es obligatorio" })}
                                    type="text"
                                    placeholder="Ingrese celular"
                                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                                />
                                {errors.celular && (
                                    <span style={{ color: "red", fontSize: "12px" }}>
                                        {errors.celular.message}
                                    </span>
                                )}
                            </div>

                            <div>
                                {/* Puedes dejar un espacio vacío para mantener la cuadrícula */}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                            <Button variant="outlined" color="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};
