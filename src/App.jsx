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
    stdDev: 'N/A',
    percentile25: 'N/A',
    percentile50: 'N/A',
    percentile75: 'N/A',
  });

  const clearFile = () => {
    setExcelData(null);
    setFileName(null);
    setStats({
      count: 0,
      max: 'N/A',
      min: 'N/A',
      average: 'N/A',
      stdDev: 'N/A',
      percentile25: 'N/A',
      percentile50: 'N/A',
      percentile75: 'N/A',
    });
  };

  // Función para calcular la desviación estándar poblacional
  const calculateStdDev = (data, mean) => {
    const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
  };

  // Función para calcular percentiles
  const calculatePercentile = (data, percentile) => {
    const sortedData = [...data].sort((a, b) => a - b);
    const index = (percentile / 100) * (sortedData.length - 1);
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);
    
    if (lowerIndex === upperIndex) {
      return sortedData[lowerIndex];
    }
    
    const weight = index - lowerIndex;
    return sortedData[lowerIndex] * (1 - weight) + sortedData[upperIndex] * weight;
  };

  const processExcelFile = async (file) => {
    try {
      const rows = await readXlsxFile(file);
      setExcelData(rows);
      setFileName(file.name);

      if (rows.length > 1) {
        // Recolectar todos los valores numéricos de todas las columnas (excluyendo la primera columna que son los días)
        let allNumericData = [];
        
        // Iterar por todas las columnas (empezando desde la segunda columna, índice 1)
        for (let col = 1; col < rows[0].length; col++) {
          // Iterar por todas las filas (excluyendo el encabezado)
          for (let row = 1; row < rows.length; row++) {
            const cellValue = rows[row][col];
            if (typeof cellValue === 'number' && !isNaN(cellValue)) {
              allNumericData.push(cellValue);
            }
          }
        }
        
        if (allNumericData.length > 0) {
          const count = allNumericData.length;
          const max = Math.max(...allNumericData);
          const min = Math.min(...allNumericData);
          const sum = allNumericData.reduce((a, b) => a + b, 0);
          const average = sum / count;
          const stdDev = calculateStdDev(allNumericData, average);
          const percentile25 = calculatePercentile(allNumericData, 25);
          const percentile50 = calculatePercentile(allNumericData, 50);
          const percentile75 = calculatePercentile(allNumericData, 75);

          setStats({
            count: count,
            max: max,
            min: min,
            average: average.toFixed(2),
            stdDev: stdDev.toFixed(2),
            percentile25: percentile25.toFixed(2),
            percentile50: percentile50.toFixed(2),
            percentile75: percentile75.toFixed(2),
          });
        } else {
          setStats({
            count: 0,
            max: 'N/A',
            min: 'N/A',
            average: 'N/A',
            stdDev: 'N/A',
            percentile25: 'N/A',
            percentile50: 'N/A',
            percentile75: 'N/A',
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
