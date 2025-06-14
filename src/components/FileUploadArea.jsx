import React from 'react';

function FileUploadArea({ isDragging, setIsDragging, onFileSelect, onFileDrop, fileName, clearFile }) {
  return (
    <div 
      className={`mt-8 p-8 border-2 border-dashed rounded-lg text-center transition-all duration-300 ${
        isDragging 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onFileDrop}
    >
      <div className="space-y-4">
        <div className="text-6xl text-blue-400 mb-4">
          📊
        </div>
        {fileName ? (
          <div>
            <p className="text-lg font-medium text-gray-900">Archivo seleccionado:</p>
            <p className="text-md text-blue-600 font-semibold mb-4">{fileName}</p>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
              onClick={clearFile}
            >
              Quitar archivo
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-medium text-gray-900">
              Arrastra tu archivo Excel aquí
            </h3>
            <p className="text-sm text-gray-500">
              o haz clic para seleccionar un archivo
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              onClick={() => document.getElementById('fileInput').click()}
            >
              Seleccionar archivo
            </button>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept=".xls,.xlsx"
              onChange={onFileSelect}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default FileUploadArea; 