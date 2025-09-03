import Swal from "sweetalert2";

export const alertConfirmacionRealizaVenta = async (): Promise<boolean> => {
    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Se procederá a realizar la venta.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, realizar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    });

    return result.isConfirmed;
};