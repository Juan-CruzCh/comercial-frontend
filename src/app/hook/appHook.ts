import { useState } from "react";

export function RealoadHook() {
    const [reload, setReload] = useState<boolean>(false);
    return {reload,setReload }
}