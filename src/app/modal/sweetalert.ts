import Swal from "sweetalert2";

export const alertConfirmacionEliminacion = async (): Promise<boolean> => {
    const result = await Swal.fire({
        title: "¿Estás seguro de eliminar?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",        
        cancelButtonColor: "#6c757d",     
        reverseButtons: true               
    });

    return result.isConfirmed;
};