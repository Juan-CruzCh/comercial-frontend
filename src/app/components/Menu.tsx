import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  Avatar,
  Chip,
  useTheme,
  alpha,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  ShoppingCart,
  Inventory,
  People,
  AdminPanelSettings,
  Logout,
  PointOfSale,
  Assessment,
  LocalShipping,
  AddBusiness,
  Category,
  Scale,
  Warehouse,
  Person,
  Business,
  TrendingUp,
  Dashboard,
  Close,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";

import { TopBar } from "./TopBar";



const drawerWidth = 280;

export const Menu: React.FC = () => {
  const theme = useTheme();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openVentas, setOpenVentas] = useState(false);
  const [openInventario, setOpenInventario] = useState(false);
  const [openUsuarios, setOpenUsuarios] = useState(false);
  const [openAdministracion, setOpenAdministracion] = useState(false);


  const handleLogout = () => {
    alert("Sesión cerrada");
    setOpenSidebar(false);
  };

  const closeSidebar = () => {
    setOpenSidebar(false);
  };

 

  // ------------------------------------------

  const menuItemStyle = {
    borderRadius: "12px",
    mx: 1,
    my: 0.5,
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      transform: "translateX(4px)",
      transition: "all 0.2s ease-in-out",
    },
    transition: "all 0.2s ease-in-out",
  };

  const subMenuItemStyle = {
    borderRadius: "8px",
    mx: 1,
    my: 0.3,
    pl: 4,
    "&:hover": {
      backgroundColor: alpha(theme.palette.secondary.main, 0.08),
      transform: "translateX(8px)",
      transition: "all 0.2s ease-in-out",
    },
    transition: "all 0.2s ease-in-out",
  };

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
      }}
    >
      {/* Header mejorado */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          p: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={closeSidebar}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            "&:hover": { backgroundColor: alpha("#fff", 0.1) },
          }}
        >
          <Close />
        </IconButton>

        <Avatar
          sx={{
            bgcolor: "white",
            color: theme.palette.primary.main,
            mb: 1,
            width: 48,
            height: 48,
          }}
        >
          <Dashboard />
        </Avatar>

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
        >
          Sistema POS
        </Typography>

        <Chip
          label="Admin"
          size="small"
          sx={{
            bgcolor: alpha("#fff", 0.2),
            color: "white",
            fontSize: "0.7rem",
          }}
        />
      </Box>

      <Divider />

      {/* Contenido principal del menú */}
      <Box sx={{ flex: 1, py: 1, overflowY: "auto" }}>
        <List component="nav" sx={{ px: 1 }}>
          {/* Ventas */}
          <ListItemButton
            onClick={() => setOpenVentas(!openVentas)}
            sx={menuItemStyle}
          >
            <ListItemIcon sx={{ color: theme.palette.success.main }}>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Ventas" />
            {openVentas ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openVentas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="realizar/venta"
                sx={subMenuItemStyle}
                onClick={closeSidebar}
              >
                <ListItemIcon sx={{ color: theme.palette.success.light }}>
                  <PointOfSale />
                </ListItemIcon>
                <ListItemText primary="Realizar Venta" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="listar/ventas"
                sx={subMenuItemStyle}
              >
                <ListItemIcon sx={{ color: theme.palette.success.light }}>
                  <Assessment />
                </ListItemIcon>
                <ListItemText primary="Resumen Ventas" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Inventario */}
          <ListItemButton
            onClick={() => setOpenInventario(!openInventario)}
            sx={menuItemStyle}
          >
            <ListItemIcon sx={{ color: theme.palette.warning.main }}>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Inventario" />
            {openInventario ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openInventario} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/listar/proveedor"
                sx={subMenuItemStyle}
                onClick={closeSidebar}
              >
                <ListItemIcon sx={{ color: theme.palette.warning.light }}>
                  <LocalShipping />
                </ListItemIcon>
                <ListItemText primary="Proveedores" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/realizar/ingreso"
                sx={subMenuItemStyle}
                onClick={closeSidebar}
              >
                <ListItemIcon sx={{ color: theme.palette.warning.light }}>
                  <AddBusiness />
                </ListItemIcon>
                <ListItemText primary="Realizar Ingresos" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/listar/ingresos"
                sx={subMenuItemStyle}
                onClick={closeSidebar}
              >
                <ListItemIcon sx={{ color: theme.palette.warning.light }}>
                  <TrendingUp />
                </ListItemIcon>
                <ListItemText primary="Listar Ingresos" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/listar/categoria"
                sx={subMenuItemStyle}
                onClick={closeSidebar}
              >
                <ListItemIcon sx={{ color: theme.palette.warning.light }}>
                  <Category />
                </ListItemIcon>
                <ListItemText primary="Listar Categorías" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/listar/unidad/manejo"
                sx={subMenuItemStyle}
                onClick={closeSidebar}
              >
                <ListItemIcon sx={{ color: theme.palette.warning.light }}>
                  <Scale />
                </ListItemIcon>
                <ListItemText primary="Unidades de Manejo" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/listar/stock"
                sx={subMenuItemStyle}
                onClick={closeSidebar}
              >
                <ListItemIcon sx={{ color: theme.palette.warning.light }}>
                  <Warehouse />
                </ListItemIcon>
                <ListItemText primary="Listar Stock" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Usuarios */}
          <ListItemButton
            onClick={() => setOpenUsuarios(!openUsuarios)}
            sx={menuItemStyle}
          >
            <ListItemIcon sx={{ color: theme.palette.info.main }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
            {openUsuarios ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openUsuarios} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/listar/usuarios"
                sx={subMenuItemStyle}
              >
                <ListItemIcon sx={{ color: theme.palette.info.light }}>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Gestionar Usuarios" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Administración */}
          <ListItemButton
            onClick={() => setOpenAdministracion(!openAdministracion)}
            sx={menuItemStyle}
          >
            <ListItemIcon sx={{ color: theme.palette.secondary.main }}>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary="Administración" />
            {openAdministracion ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openAdministracion} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/listar/sucursal"
                sx={subMenuItemStyle}
                onClick={closeSidebar}
              >
                <ListItemIcon sx={{ color: theme.palette.secondary.light }}>
                  <Business />
                </ListItemIcon>
                <ListItemText primary="Listar Sucursales" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.primary.main, 0.02),
        }}
      >
        <ListItemButton
          onClick={handleLogout}
          sx={{
            ...menuItemStyle,
            color: theme.palette.error.main,
            "&:hover": {
              backgroundColor: alpha(theme.palette.error.main, 0.08),
            },
          }}
        >
          <ListItemIcon sx={{ color: theme.palette.error.main }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItemButton>

        <Typography
          variant="caption"
          sx={{
            p: 2,
            textAlign: "center",
            color: theme.palette.text.secondary,
          }}
        >
          Sistema POS v1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box>
      {/* Barra horizontal arriba */}
      <TopBar setOpenSidebar={setOpenSidebar}/>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxShadow: theme.shadows[8],
            borderRight: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flex: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
