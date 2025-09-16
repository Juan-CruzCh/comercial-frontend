import { useEffect, useState } from "react";
import { listarReporteVentaMesual } from "../../venta/service/VentaService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ReporteMensualVentaI } from "../../venta/interface/ventaInterface";

export const GraficoReporteMensual = () => {
  const [data, setData] = useState<ReporteMensualVentaI[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await listarReporteVentaMesual();
        const formattedData = response.map((item) => ({
          ...item,
          fecha: new Date(item.fecha).toISOString().split("T")[0],
        }));

        setData(formattedData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Reporte de Ventas del Mes</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="montoTotal"
            stroke="#8884d8"
            name="Monto Total"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="cantidad"
            stroke="#82ca9d"
            name="Cantidad"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
