import { useState, useMemo } from 'react'
import { DataTable } from "../table/data-table"
import { allTimeColumns, seasonColumns } from "../table/columns"

interface AppProps {
  classicResponse: any[];
  musicResponse: any[];
}

function App({ classicResponse, musicResponse }: AppProps) {
  const [contentMode, setContentMode] = useState<'music' | 'classic'>('classic')
  const [viewMode, setViewMode] = useState<'all' | 'season'>('all')
  //save data in memory
  const classicData = useMemo(() => classicResponse, [])
  const musicData = useMemo(() => musicResponse, [])

  const backgroundStyle = {
    backgroundColor: `${contentMode === 'music' ? '#DB39C9' : '#773DD9'}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
  }

  return (
    <div className="min-h-screen font-regular">      
      {/* smooth background transition */}
      {/* add margin-top on laptop screens */}
      <div className="container mx-auto py-5 lg:mt-5 transition-all duration-1000 ease-in-out" style={backgroundStyle}>
        {/* Classic/Music Switcher */}
        <div className="flex items-center justify-center mb-4 gap-2">
          <div className="bg-gray-200/80 backdrop-blur rounded-lg p-1 w-auto">
            <button
              // smooth transition
              className={`smooth-button ${contentMode === 'classic'
                ? 'bg-white shadow-md text-gray-800'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => setContentMode('classic')}
            >
              Classic
            </button>

            <button
              // smooth transition
              className={`smooth-button ${contentMode === 'music'
                ? 'bg-white shadow-md text-gray-800'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => setContentMode('music')}
            >
              Music
            </button>
          </div>

          <div className="bg-gray-200/80 backdrop-blur rounded-lg p-1">
            <button
              // smooth transition
              className={`smooth-button ${viewMode === 'all'
                ? 'bg-white shadow-md text-gray-800'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => setViewMode('all')}
            >
              All Time
            </button>
            <button
              // smooth transition
              className={`smooth-button ${viewMode === 'season'
                ? 'bg-white shadow-md text-gray-800'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => setViewMode('season')}
            >
              Season
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-lg p-4 ml-7 mr-7">
          <DataTable
            columns={viewMode === 'all' ? allTimeColumns : seasonColumns}
            data={contentMode === 'music' ? musicData : classicData}
          />
        </div>
      </div>
    </div>
  )
}

export default App;