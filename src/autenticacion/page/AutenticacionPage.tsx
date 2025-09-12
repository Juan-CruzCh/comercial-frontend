import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm, Controller } from "react-hook-form";
import type { LoginI } from "../interface/autenticacion";
import { autenticacion } from "../service/autenticacion";
import { useContext } from "react";
import { AuntenticacionContext } from "../../app/context/AutenticacionProvider";
import { useNavigate } from "react-router-dom";


export const AutenticacionPage = () => {
    const { setIsAutenticacion } = useContext(AuntenticacionContext)
    const { control, handleSubmit, formState: { errors } } = useForm<LoginI>();
    const onSubmit = async (data: LoginI) => {
        try {
            const response = await autenticacion(data)
            console.log(response);

            if (response.status === 200) {
                setIsAutenticacion(true)
                window.location.href = "/"
                return
            }
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #c7d2fe, #fef3c7)",
                padding: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 5,
                    width: 400,
                    borderRadius: 4,
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                    }
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: "#fbbf24", // amarillo pastel
                        width: 64,
                        height: 64,
                        margin: "0 auto",
                        mb: 2,
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                    }}
                >
                    <LockOutlinedIcon fontSize="large" />
                </Avatar>

                <Typography
                    variant="h5"
                    sx={{ mb: 3, fontWeight: "bold", color: "#1e293b" }}
                >
                    Sistema de Ventas
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: "El usuario es obligatorio" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Usuario"
                                variant="filled"
                                size="small"
                                error={!!errors.username}
                                helperText={errors.username?.message}
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: "rgba(255,255,255,0.6)",
                                    "& .MuiFilledInput-root": {
                                        borderRadius: 2,
                                        "&:hover": { backgroundColor: "rgba(255,255,255,0.75)" },
                                        "&.Mui-focused": { backgroundColor: "rgba(255,255,255,0.85)" },
                                    },
                                    "& .MuiFormHelperText-root": { color: "#f87171" },
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "La contraseña es obligatoria" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Contraseña"
                                type="password"
                                variant="filled"
                                size="small"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: "rgba(255,255,255,0.6)",
                                    "& .MuiFilledInput-root": {
                                        borderRadius: 2,
                                        "&:hover": { backgroundColor: "rgba(255,255,255,0.75)" },
                                        "&.Mui-focused": { backgroundColor: "rgba(255,255,255,0.85)" },
                                    },
                                    "& .MuiFormHelperText-root": { color: "#f87171" },
                                }}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 1,
                            bgcolor: "#a78bfa", // lila pastel
                            "&:hover": { bgcolor: "#8b5cf6" },
                            color: "#fff",
                            fontWeight: "bold",
                            py: 1.3,
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                        }}
                    >
                        Ingresar
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};
