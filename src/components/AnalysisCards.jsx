import React from 'react';

function AnalysisCards({ stats }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Conteo Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 animate-slide-up">
        <div className="text-2xl text-blue-500 mb-2">🔢</div>
        <h3 className="text-lg font-semibold text-gray-900">Conteo</h3>
        <p className="mt-2 text-gray-600">Total de registros: {stats.count}</p>
      </div>

      {/* Máximo Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="text-2xl text-blue-500 mb-2">📈</div>
        <h3 className="text-lg font-semibold text-gray-900">Máximo</h3>
        <p className="mt-2 text-gray-600">Valor más alto: {stats.max}</p>
      </div>

      {/* Mínimo Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="text-2xl text-blue-500 mb-2">📉</div>
        <h3 className="text-lg font-semibold text-gray-900">Mínimo</h3>
        <p className="mt-2 text-gray-600">Valor más bajo: {stats.min}</p>
      </div>

      {/* Promedio Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="text-2xl text-blue-500 mb-2">⚖️</div>
        <h3 className="text-lg font-semibold text-gray-900">Promedio</h3>
        <p className="mt-2 text-gray-600">Media aritmética: {stats.average}</p>
      </div>
    </div>
  );
}

export default AnalysisCards; 