import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy, limit, Timestamp } from "firebase/firestore";
import ExportarExcel from "./ExportarExcel";
import table from "../styles/table.scss";

function Table() {
  const [datos, setDatos] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [filtrando, setFiltrando] = useState(false);

  const obtenerDatos = async () => {
    try {
      const coleccion = collection(db, "variables");
      let q;

      if (fechaInicio && fechaFin) {
        const inicio = Timestamp.fromDate(new Date(fechaInicio + "T00:00:00"));
        const fin = Timestamp.fromDate(new Date(fechaFin + "T23:59:59"));
        q = query(coleccion, where("timestamp", ">=", inicio), where("timestamp", "<=", fin), orderBy("timestamp", "desc"));
        setFiltrando(true);
      } else {
        q = query(coleccion, orderBy("timestamp", "desc"), limit(10));
        setFiltrando(false);
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));    

      setDatos(docs);
    } catch (err) {
      console.error("Error obteniendo datos:", err);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, [fechaInicio, fechaFin]);

  return (
    <div className="content-parent">   
        <div className="text-left">
            <h2>breve texto</h2>
        </div>

        <div className="tables-parent">

          <h2>Mediciones del sistema</h2>
          <div className="filtro-fecha">
              <label>Desde: </label>
              <input className="input-fecha" type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
              <label>Hasta: </label>
              <input className="output-fecha" type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
              
              <button onClick={() => {
              setFechaInicio("");
              setFechaFin("");
              }} className="fecha-btn">
              Limpiar filtros
              </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Voltaje (V)</th>
                    <th>Corriente (A)</th>
                    <th>Potencia (W)</th>
                </tr>
              </thead>
              <tbody>
              {datos.length > 0 ? (
                  datos.map((d) => (
                  <tr key={d.id}>
                      <td>{new Date(d.timestamp.seconds * 1000).toLocaleString()}</td>
                      <td>{d.voltaje}</td>
                      <td>{d.corriente}</td>
                      <td>{d.potencia}</td>
                  </tr>
                  ))
              ) : (
                  <tr><td colSpan={4}>No hay datos disponibles.</td></tr>
              )}
              </tbody>
            </table>
          </div>

          {!filtrando && <p>Mostrando los últimos 10 registros recientes por defecto.</p>}

          <ExportarExcel data={datos} />
        </div>
    </div>
  );
}

export default Table;
