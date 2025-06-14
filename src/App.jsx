import { useState } from 'react'
import readXlsxFile from 'read-excel-file'
import FileUploadArea from './components/FileUploadArea';
import AnalysisCards from './components/AnalysisCards';
import ExcelTable from './components/ExcelTable';

function App() {
  const [isDragging, setIsDragging] = useState(false)
  const [excelData, setExcelData] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [stats, setStats] = useState({
    count: 0,
    max: 'N/A',
    min: 'N/A',
    average: 'N/A',
  });

  const clearFile = () => {
    setExcelData(null);
    setFileName(null);
    setStats({
      count: 0,
      max: 'N/A',
      min: 'N/A',
      average: 'N/A',
    });
  };

  const processExcelFile = async (file) => {
    try {
      const rows = await readXlsxFile(file);
      setExcelData(rows);
      setFileName(file.name);

      if (rows.length > 1) {
        let numericColumnIndex = -1;
        for (let i = 0; i < rows[0].length; i++) {
          // Intentar identificar una columna numérica en la primera fila de datos (después del encabezado)
          if (typeof rows[1][i] === 'number') {
            numericColumnIndex = i;
            break;
          }
        }

        if (numericColumnIndex !== -1) {
          const numericData = rows.slice(1).map(row => row[numericColumnIndex]).filter(item => typeof item === 'number');
          
          if (numericData.length > 0) {
            const count = numericData.length;
            const max = Math.max(...numericData);
            const min = Math.min(...numericData);
            const sum = numericData.reduce((a, b) => a + b, 0);
            const average = sum / count;

            setStats({
              count: count,
              max: max,
              min: min,
              average: average.toFixed(2),
            });
          } else {
            setStats({
              count: 0,
              max: 'N/A',
              min: 'N/A',
              average: 'N/A',
            });
          }
        } else {
          // Si no se encuentra una columna numérica, al menos se cuenta el total de filas de datos.
          setStats({
            count: rows.length - 1, // Excluir el encabezado
            max: 'N/A',
            min: 'N/A',
            average: 'N/A',
          });
        }
      } else {
        setStats({
          count: 0,
          max: 'N/A',
          min: 'N/A',
          average: 'N/A',
        });
      }
    } catch (error) {
      console.error("Error al leer el archivo Excel:", error);
      clearFile();
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      console.log('Archivo seleccionado:', files[0].name);
      processExcelFile(files[0]);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.name.endsWith('.xls') || file.name.endsWith('.xlsx')
    );
    if (files.length > 0) {
      console.log('Archivos soltados:', files.map(f => f.name));
      processExcelFile(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-blue-600 animate-fade-in">
            Analizador de Datos
          </h1>
          <p className="mt-2 text-gray-600 animate-slide-up">
            Sube tu archivo Excel y obtén análisis instantáneos
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <FileUploadArea 
          isDragging={isDragging} 
          setIsDragging={setIsDragging} 
          onFileSelect={handleFileSelect}
          onFileDrop={handleFileDrop}
          fileName={fileName}
          clearFile={clearFile}
        />

        <AnalysisCards stats={stats} />

        <div className="mt-12 bg-white rounded-lg shadow-sm p-6 animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Resultados</h2>
          <ExcelTable excelData={excelData} />
        </div>
      </main>
    </div>
  )
}

export default App
