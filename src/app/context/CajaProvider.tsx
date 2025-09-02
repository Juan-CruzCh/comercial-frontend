import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CajaContextI } from '../interface/cajaContext';

const CajaContext = createContext<CajaContextI>({
        actualizarCaja() {
            
        },
        estadoCaja:false
});

export const CajaProvider = ({ children }:{children:ReactNode}) => {
  const [estadoCaja, setEstadoCaja] = useState(false);

  const actualizarCaja = () => setEstadoCaja(prev => !prev);

  return (
    <CajaContext.Provider value={{ estadoCaja, actualizarCaja }}>
      {children}
    </CajaContext.Provider>
  );
};

export const useCaja = () => {
  return useContext(CajaContext);
};