import { useState } from 'react'

function App() {
  const [isDragging, setIsDragging] = useState(false)
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary-600 animate-fade-in">
            Analizador de Datos
          </h1>
          <p className="mt-2 text-gray-600 animate-slide-up">
            Sube tu archivo Excel y obtén análisis instantáneos
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Upload Area */}
        <div 
          className={`mt-8 p-8 border-2 border-dashed rounded-lg text-center transition-all duration-300 ${
            isDragging 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-primary-400'
          }`}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setIsDragging(false)
          }}
        >
          <div className="space-y-4">
            <div className="text-6xl text-primary-400 mb-4">
              📊
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Arrastra tu archivo Excel aquí
            </h3>
            <p className="text-sm text-gray-500">
              o haz clic para seleccionar un archivo
            </p>
            <button className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200">
              Seleccionar archivo
            </button>
          </div>
        </div>

        {/* Analysis Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Conteo Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 animate-slide-up">
            <div className="text-2xl text-primary-500 mb-2">🔢</div>
            <h3 className="text-lg font-semibold text-gray-900">Conteo</h3>
            <p className="mt-2 text-gray-600">Total de registros en la selección</p>
          </div>

          {/* Máximo Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="text-2xl text-primary-500 mb-2">📈</div>
            <h3 className="text-lg font-semibold text-gray-900">Máximo</h3>
            <p className="mt-2 text-gray-600">Valor más alto encontrado</p>
          </div>

          {/* Mínimo Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="text-2xl text-primary-500 mb-2">📉</div>
            <h3 className="text-lg font-semibold text-gray-900">Mínimo</h3>
            <p className="mt-2 text-gray-600">Valor más bajo encontrado</p>
          </div>

          {/* Promedio Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="text-2xl text-primary-500 mb-2">⚖️</div>
            <h3 className="text-lg font-semibold text-gray-900">Promedio</h3>
            <p className="mt-2 text-gray-600">Media aritmética de los valores</p>
          </div>
        </div>

        {/* Results Area */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6 animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Resultados</h2>
          <div className="text-gray-500 text-center py-8">
            Sube un archivo Excel para ver los resultados aquí
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
