import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuntenticacionContextI } from "../interface/auntenticacionContext";
import { verificarAutenticacion } from "../../autenticacion/service/autenticacion";
import { usuarioLoguot } from "../../usuario/service/usuarioService";

export const AuntenticacionContext = createContext<AuntenticacionContextI>({
  isAutenticacion: false,
  logout() {},
  setIsAutenticacion() {},
  apellidos: "",
  nombres: "",
  sucursal: "",
  username: "",
  rol: "",
  sucursalId: "",
  loading: true,
});
export const AutenticacionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isAutenticacion, setisAutenticacion] = useState<boolean>(false);
  const [sucursal, setSucursal] = useState<string>("");
  const [nombres, setNombres] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [rol, setRol] = useState<string>("");
  const [sucursalId, setSucursalID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const logout = async () => {
    try {
      const response = await usuarioLoguot();
      if (response.status === 200) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setIsAutenticacion = (value: boolean) => {
    setisAutenticacion(value);
  };
  useEffect(() => {
    if (location.pathname !== "/login") {
      verificarA();
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  const verificarA = async () => {
    try {
      const response = await verificarAutenticacion();      
      if (response) {
        setisAutenticacion(true);
        setApellidos(response.apellidos);
        setSucursal(response.sucursal);
        setRol(response.rol), setNombres(response.nombre);
        setUsername(response.username);
        setSucursalID(response.sucursalId);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  return (
    <AuntenticacionContext.Provider
      value={{
        isAutenticacion,
        loading,
        logout,
        apellidos,
        nombres,
        rol,
        sucursal,
        username,
        setIsAutenticacion,
        sucursalId,
      }}
    >
      {children}
    </AuntenticacionContext.Provider>
  );
};
