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
  setNombres() {},
  setApellidos() {},
  setSucursal() {},
  setUsername() {},
  sucursal: "",
  username: "",
  rol: "",
  setRol() {},
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
  const logout = async () => {
    try {
      const response = await usuarioLoguot();
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setIsAutenticacion = (value: boolean) => {
    setisAutenticacion(value);
  };

  useEffect(() => {
    if (!isAutenticacion) {
      verificarA();
    }
  }, []);

  const verificarA = async () => {
    try {
      const response = await verificarAutenticacion();
      if (response) {
        setisAutenticacion(true);
        setApellidos(response.apellidos);
        setSucursal(response.sucursal);
        setRol(response.rol), setNombres(response.nombre);
        setUsername(response.username);
      }
    } catch (error) {
      console.log(error);
    } 
  };
  return (
    <AuntenticacionContext.Provider
      value={{
        isAutenticacion,
        logout,
        apellidos,
        nombres,
        rol,
        sucursal,
        username,
        setIsAutenticacion,
      }}
    >
      {children}
    </AuntenticacionContext.Provider>
  );
};
