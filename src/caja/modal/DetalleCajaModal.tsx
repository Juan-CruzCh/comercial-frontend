import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
} from '@mui/material';
import { listarCajaPorUsuario } from '../service/cajaService';
import type { AxiosError } from 'axios';





export const DetalleCajaModal = () => {
    const [open, setOpen] = useState(false);
    const [montoInicial, setMontoInicial] = useState<number>(0);
    const [totalVentas, setTotalVentas] = useState<number>(0);
    const [montoFinal, setMontoFinal] = useState<number>(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        listarCaja();
    }, [open]);

    const listarCaja = async () => {
        try {
            const response = await listarCajaPorUsuario();
            if (response) {
                setTotalVentas(response.TotalVentas);
                setMontoInicial(response.MontoInicial);
                setMontoFinal(response.MontoFinal)
            }
        } catch (error) {
            const e = error as AxiosError;
            if (e.status == 400) {
                setTotalVentas(0);
                setMontoInicial(0);
                setMontoFinal(0)
            }
        }
    };
    return (
        <>
            {/* Botón para abrir el modal */}
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Ver Detalle
            </Button>

            {/* Modal */}
          <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-detalle-caja"
    aria-describedby="modal-detalle-caja-desc"
>
    <Box
        sx={{
            position: 'absolute',
            top: '20%',
            right: '0',
            transform: 'translateY(-50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '1px solid #ccc',
            boxShadow: 24,
            p: 4,
        }}
    >
        <Typography id="modal-detalle-caja" variant="h6" component="h2" gutterBottom>
            Detalle de Caja
        </Typography>
        <Typography variant="body1"><strong>Monto Inicial:</strong> Bs {montoInicial.toFixed(2)}</Typography>
        <Typography variant="body1"><strong>Total Ventas:</strong> Bs {totalVentas.toFixed(2)}</Typography>
        <Typography variant="body1"><strong>Monto Final:</strong> Bs {montoFinal.toFixed(2)}</Typography>

        <Box mt={3} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} variant="contained" color="secondary">
                Cerrar
            </Button>
        </Box>
    </Box>
</Modal>

        </>
    );
};
