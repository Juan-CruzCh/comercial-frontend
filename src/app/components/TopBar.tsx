import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";

import { Divider, Typography, alpha } from "@mui/material";
import { AbrirCajaModal } from "../../caja/modal/AbrirCajaModal";
import { useEffect, useState } from "react";
import {
  cerrarCaja,
  listarCajaPorUsuario,
} from "../../caja/service/cajaService";
import type { AxiosError } from "axios";
import { useCaja } from "../context/CajaProvider";
export const TopBar = ({
  setOpenSidebar,
}: {
  setOpenSidebar: (v: boolean) => void;
}) => {
    const {estadoCaja, actualizarCaja}=useCaja()
  const [montoInicial, setMontoInicial] = useState<number>(0);
  const [totalVentas, setTotalVentas] = useState<number>(0);
  const [montoFinal, setMontoFinal] = useState<number>(0);
  useEffect(() => {
    listar();
  }, [estadoCaja]);

  const cerrar = async () => {
    try {
      const response = await cerrarCaja();

      if (response.status === 200) {
        actualizarCaja()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listar = async () => {
    try {
      const response = await listarCajaPorUsuario();
      if (response) {
            console.log(response.MontoInicial);
            
        setMontoInicial(response.MontoInicial);
        setTotalVentas(response.TotalVentas);
        setMontoFinal(response.MontoFinal);
      }
    } catch (error) {
      const e = error as AxiosError;
      if (e.status == 400) {
        setMontoInicial(0);
        setTotalVentas(0);
        setMontoFinal(0);
      }
    }
  };

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
        boxShadow: (theme) => theme.shadows[1],
        px: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          color="primary"
          onClick={() => setOpenSidebar(true)}
          edge="start"
          size="small"
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {montoInicial > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                bgcolor: "#f7f7f7",
                borderRadius: 1,
                px: 2,
                py: 1,
                alignItems: "center",
                boxShadow: 1,
              }}
            >
              <Typography variant="body2">
                <strong>Monto Inicial:</strong> Bs {montoInicial}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2">
                <strong>Total Ventas:</strong> Bs {totalVentas}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2">
                <strong>Monto Final:</strong> Bs {montoFinal}
              </Typography>
            </Box>
          )}

          {montoInicial <= 0 ? (
            <AbrirCajaModal />
          ) : (
            <Button
              onClick={() => cerrar()}
              variant="outlined"
              color="error"
              size="small"
              sx={{ px: 2, py: 0.5 }}
            >
              Cerrar Caja
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
