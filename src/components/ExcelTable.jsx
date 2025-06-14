import React, { useState } from 'react';

function ExcelTable({ excelData }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  if (!excelData) {
    return (
      <div className="text-gray-500 text-center py-8">
        Sube un archivo Excel para ver los resultados aquí
      </div>
    );
  }

  const handleSort = (header) => {
    if (sortColumn === header) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(header);
      setSortDirection('asc');
    }
  };

  const getSortedData = () => {
    if (!sortColumn) {
      return excelData.slice(1); // Devolver datos sin ordenar si no hay columna de ordenación
    }

    const headerIndex = excelData[0].indexOf(sortColumn);
    if (headerIndex === -1) {
      return excelData.slice(1); // Columna no encontrada, devolver sin ordenar
    }

    const sortedRows = [...excelData.slice(1)].sort((a, b) => {
      const aValue = a[headerIndex];
      const bValue = b[headerIndex];

      // Manejo de valores nulos o indefinidos
      if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
      if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? -1 : 1;

      // Ordenación numérica
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Ordenación de fechas
      if (aValue instanceof Date && bValue instanceof Date) {
        const aTime = aValue.getTime();
        const bTime = bValue.getTime();
        return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }

      // Ordenación alfabética (convertir a cadena para asegurar la comparación)
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      return sortDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
    return sortedRows;
  };

  const displayedRows = getSortedData();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {excelData[0].map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                onClick={() => handleSort(header)}
              >
                <div className="flex items-center justify-between">
                  {header}
                  <span className="ml-2 text-gray-400">
                    {sortColumn === header ? (
                      sortDirection === 'asc' ? '↑' : '↓'
                    ) : (
                      '↕' // Icono para indicar que es sortable pero no está activo
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayedRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {cell instanceof Date ? cell.toLocaleDateString() : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExcelTable;