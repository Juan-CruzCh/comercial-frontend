import Swal from "sweetalert2";

export const alertConfirmacionStock = async (): Promise<boolean> => {
    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Se ingresará el stock al sistema.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, ingresar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    });

    return result.isConfirmed; // 🔹 devuelve true si confirma
};
