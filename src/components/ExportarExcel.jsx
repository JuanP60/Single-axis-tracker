import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DownloadIcon from '@mui/icons-material/Download';

const ExportarExcel = ({ data, filename="mediciones_solar_trackesr.xlsx" }) => { // dataFiltrada es el prop que paso desde tabble.jsx con el array de datos
    const exportToExcel = () => {
    if (!data || data.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    const datosProcesados = data.map((item) => {
        let fechaFormateada = "";

        if (item.timestamp && item.timestamp.seconds) {
        const fecha = new Date(item.timestamp.seconds * 1000);
        fechaFormateada = fecha.toLocaleString(); // ajusta formato si prefieres ISO o solo fecha
        }

        return {
        Fecha: fechaFormateada,
        Voltaje: item.voltaje,
        Corriente: item.corriente,
        Potencia: item.potencia,
        };
    });

    const worksheet = XLSX.utils.json_to_sheet(datosProcesados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
        type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, filename || "datos.xlsx");
    };

  return (
    <DownloadIcon onClick={exportToExcel} className="excel-btn" titleAccess="Descargar Excel"/>
  );
};

export default ExportarExcel;
