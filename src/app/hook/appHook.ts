import { useState } from "react";

export function RealoadHook() {
  const [reload, setReload] = useState<boolean>(false);
  return { reload, setReload };
}
export function modalHook() {
  const [open, setOpen] = useState(false);
  const abrirModal = () => setOpen(true);
  const cerrarModal = () => setOpen(false);

  return { abrirModal, cerrarModal, open };
}
