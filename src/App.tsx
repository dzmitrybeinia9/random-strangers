import { useState } from 'react'
import { DataTable } from "./table/data-table"
import users from "./assets/mock_data.json"
import mzgb from "./assets/mzgb.json"
import { allTimeColumns, seasonColumns } from "./table/columns"

function App() {
  const [contentMode, setContentMode] = useState<'music' | 'classic'>('classic')
  const [viewMode, setViewMode] = useState<'all' | 'season'>('all')

  return (
    <div className="container mx-auto py-10">
      {/* Classic/Music Switcher */}
      <div className="flex items-center justify-center mb-4 gap-2">
        <div className="bg-gray-200 rounded-lg p-1 w-19">
  
          <button
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              contentMode === 'classic'
                ? 'bg-white shadow-md text-gray-800'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setContentMode('classic')}
          >
            Classic
          </button>

          <button
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              contentMode === 'music'
                ? 'bg-white shadow-md text-gray-800'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setContentMode('music')}
          >
            Music
          </button>

        </div>
      {/* </div> */}

      {/* All Time/Season Switcher */}
      {/* <div className="flex items-center justify-center mb-8"> */}
        <div className="bg-gray-200 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              viewMode === 'all'
                ? 'bg-white shadow-md text-gray-800'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setViewMode('all')}
          >
            All Time
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              viewMode === 'season'
                ? 'bg-white shadow-md text-gray-800'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setViewMode('season')}
          >
            Season
          </button>
        </div>
      </div>

      <div>
        {/* <h2 className="text-2xl font-bold mb-4 text-center">
          {contentMode === 'music' ? 'Music Rating' : 'MZGB Rating'} - {viewMode === 'all' ? 'All Time' : 'Season'}
        </h2> */}
        <DataTable 
          columns={viewMode === 'all' ? allTimeColumns : seasonColumns} 
          data={contentMode === 'music' ? users.rating : mzgb.rating} 
        />
      </div>
    </div>
  )
}

export default App 