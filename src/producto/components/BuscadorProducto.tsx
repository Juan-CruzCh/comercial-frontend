import { useEffect, useState } from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { listarUndiadManejo } from '../../unidadManejo/service/unidaManejoService';
import { listarCategoria } from '../../categoria/service/categoriaService';
import type { CategoriaI } from '../../categoria/interface/categoria';
import type { UnidadManejoI } from '../../unidadManejo/interface/unidaManejo';
import type { BuscadorProductoProps } from '../interface/producto';


export const BuscadorProducto = ({ unidadSeleccionada, codigo, nombre, categoriaSeleccionada, setCategoriaSeleccionada, setCodigo, setNombre, setUnidadSeleccionada, }: BuscadorProductoProps) => {

    const [categorias, setCategorias] = useState<CategoriaI[]>([]);
    const [unidadesManejo, setUnidadesManejo] = useState<UnidadManejoI[]>([]);

    useEffect(() => {
        listar();
    }, []);

    const listar = async () => {
        try {
            const [unidadManejo, categoria] = await Promise.all([
                listarUndiadManejo(),
                listarCategoria()
            ]);
            if (unidadManejo && categoria) {
                setCategorias(categoria);
                setUnidadesManejo(unidadManejo);
            }
        } catch (error) {

            console.error(error);
        }
    };

    return (
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" p={2}>
            <TextField
                label="Código"
                variant="outlined"
                size="small"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)} // Captura cada letra
            />

            <TextField
                label="Nombre"
                variant="outlined"
                size="small"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} // Captura cada letra
            />

            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Categoría</InputLabel>
                <Select
                    label="Categoría"
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)} // Captura selección
                >
                    <MenuItem value="">Buscar por categoría</MenuItem>
                    {categorias.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                            {cat.nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Unidad de Manejo</InputLabel>
                <Select
                    label="Unidad de Manejo"
                    value={unidadSeleccionada}
                    onChange={(e) => setUnidadSeleccionada(e.target.value)} // Captura selección
                >
                    <MenuItem value="">Buscar por unidad de manejo</MenuItem>
                    {unidadesManejo.map((unidad) => (
                        <MenuItem key={unidad._id} value={unidad._id}>
                            {unidad.nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
