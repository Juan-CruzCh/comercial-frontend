import { useState } from "react";
export function paginador() {
    const [paginaActual, setPaginaActual] = useState(1);
    const [paginas, setpaginas] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    return { paginas, setLimite, limite, setpaginas, paginaActual, setPaginaActual }
}