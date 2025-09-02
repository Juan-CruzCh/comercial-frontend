import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
} from "@mui/material";
import { abrirCaja } from "../service/cajaService";

export const AbrirCajaModal = () => {
    const [open, setOpen] = useState(false);
    const [montoInicial, setMontoInicial] = useState<number>(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleGuardar = async () => {
        try {
            const response = await abrirCaja(montoInicial)
            if (response.status == 201) {
                handleClose();
            }
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <Box>

            <Button variant="contained" color="primary" onClick={handleOpen}>
                Abrir Caja
            </Button>


            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>Abrir Caja</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Monto Inicial"
                        type="number"

                        fullWidth
                        defaultValue={montoInicial}
                        onChange={(e) => setMontoInicial(Number(e.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleGuardar} variant="contained" color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
