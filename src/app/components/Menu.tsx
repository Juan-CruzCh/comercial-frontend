import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  Typography,
  Box,
  ListItemIcon,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  ShoppingCart,
  Inventory,
  People,
  AdminPanelSettings,
  Logout,
  Receipt,
  Store,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";

export const Menu = () => {
  const [openVentas, setOpenVentas] = useState(false);
  const [openInventario, setOpenInventario] = useState(false);
  const [openUsuarios, setOpenUsuarios] = useState(false);
  const [openAdministracion, setOpenAdministracion] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleLogout = () => {
    alert("Sesión cerrada");
    setOpenSidebar(false);
  };

  return (
    <div>
      {/* Botón hamburguesa */}
      <IconButton
        color="primary"
        onClick={() => setOpenSidebar(true)}
        sx={{ m: 1 }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
      >
        <div
          style={{
            width: 220,
            background: "#fafafa",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                p: 2,
                textAlign: "center",
                fontWeight: "bold",
                background: "#1976d2",
                color: "#fff",
              }}
            >
              Menú
            </Typography>
            <Divider />

            <List component="nav" sx={{ flex: 1 }}>
              {/* Ventas */}
              <ListItemButton onClick={() => setOpenVentas(!openVentas)}>
                <ListItemIcon>
                  <ShoppingCart />
                </ListItemIcon>
                <ListItemText
                  primary="Ventas"
                  slotProps={{
                    primary: {
                      variant: "body2",
                    },
                  }}
                />
                {openVentas ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openVentas} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    component={Link}
                    to="realizar/venta"
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <Receipt />
                    </ListItemIcon>
                    <ListItemText
                      primary="Realizar Venta"
                      slotProps={{
                        primary: {
                          variant: "body2",
                        },
                      }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Receipt />
                    </ListItemIcon>
                    <ListItemText
                      primary="Resumen Ventas"
                      slotProps={{
                        primary: {
                          variant: "body2",
                        },
                      }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>

              {/* Inventario */}
              <ListItemButton
                onClick={() => setOpenInventario(!openInventario)}
              >
                <ListItemIcon>
                  <Inventory />
                </ListItemIcon>
                <ListItemText
                  primary="Inventario"
                  slotProps={{
                    primary: {
                      variant: "body2",
                    },
                  }}
                />
                {openInventario ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openInventario} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/listar/proveedor"
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <People />
                    </ListItemIcon>
                    <ListItemText
                      primary="Proveedores"
                      slotProps={{
                        primary: {
                          variant: "body2",
                        },
                      }}
                    />
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    to="/realizar/ingreso"
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <Store />
                    </ListItemIcon>
                    <ListItemText
                      primary="Realizar Ingresos"
                      slotProps={{ primary: { variant: "body2" } }}
                    />
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    to="/listar/stock"
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <Inventory />
                    </ListItemIcon>
                    <ListItemText
                      primary="Listar Stock"
                      slotProps={{
                        primary: {
                          variant: "body2",
                        },
                      }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>

              {/* Usuarios */}
              <ListItemButton onClick={() => setOpenUsuarios(!openUsuarios)}>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText
                  primary="Usuarios"
                  slotProps={{
                    primary: {
                      variant: "body2",
                    },
                  }}
                />
                {openUsuarios ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openUsuarios} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <People />
                    </ListItemIcon>
                    <ListItemText
                      primary="Usuario"
                      slotProps={{
                        primary: {
                          variant: "body2",
                        },
                      }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>

              {/* Administración */}
              <ListItemButton
                onClick={() => setOpenAdministracion(!openAdministracion)}
              >
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText
                  primary="Administración"
                  slotProps={{
                    primary: {
                      variant: "body2",
                    },
                  }}
                />
                {openAdministracion ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openAdministracion} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Store />
                    </ListItemIcon>
                    <ListItemText
                      primary="Listar Sucursales"
                      slotProps={{
                        primary: {
                          variant: "body2",
                        },
                      }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Box>

          {/* Cerrar sesión */}
          <Box sx={{ p: 1 }}>
            <Divider />
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Cerrar sesión"
                slotProps={{
                  primary: {
                    variant: "body2",
                  },
                }}
              />
            </ListItemButton>
          </Box>
        </div>
      </Drawer>

      {/* Contenido */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
