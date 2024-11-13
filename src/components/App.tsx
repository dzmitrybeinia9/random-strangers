import { useState, useMemo } from 'react'
import { DataTable } from "../table/data-table"
import { allTimeColumns, seasonColumns, TeamData } from "../table/columns"

interface AppProps {
  classicResponse: TeamData[];
  musicResponse: TeamData[];
}

type ContentMode = 'music' | 'classic'
type ViewMode = 'all' | 'season'

const THEME_COLORS = {
  music: '#DB39C9',
  classic: '#773DD9',
} as const

interface SwitchButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const SwitchButton = ({ isActive, onClick, label }: SwitchButtonProps) => (
  <button
    className={`smooth-button ${
      isActive
        ? 'bg-white shadow-md text-gray-800'
        : 'text-gray-600 hover:text-gray-800'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
)

function App({ classicResponse, musicResponse }: AppProps) {
  const [contentMode, setContentMode] = useState<ContentMode>('classic')
  const [viewMode, setViewMode] = useState<ViewMode>('all')

  const classicData = useMemo(() => classicResponse, [classicResponse])
  const musicData = useMemo(() => musicResponse, [musicResponse])

  const backgroundStyle = {
    backgroundColor: THEME_COLORS[contentMode],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
  }

  const currentData = contentMode === 'music' ? musicData : classicData
  const currentColumns = viewMode === 'all' ? allTimeColumns : seasonColumns

  return (
    <div className="min-h-screen font-regular">      
      <div className="container mx-auto py-5 lg:mt-5 transition-all duration-1000 ease-in-out" 
           style={backgroundStyle}>
        <div className="flex items-center justify-center mb-4 gap-2">
          <div className="bg-gray-200/80 backdrop-blur rounded-lg p-1 w-auto">
            <SwitchButton
              isActive={contentMode === 'classic'}
              onClick={() => setContentMode('classic')}
              label="Classic"
            />
            <SwitchButton
              isActive={contentMode === 'music'}
              onClick={() => setContentMode('music')}
              label="Music"
            />
          </div>

          <div className="bg-gray-200/80 backdrop-blur rounded-lg p-1">
            <SwitchButton
              isActive={viewMode === 'all'}
              onClick={() => setViewMode('all')}
              label="All Time"
            />
            <SwitchButton
              isActive={viewMode === 'season'}
              onClick={() => setViewMode('season')}
              label="Season"
            />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-lg p-4 mx-7">
          <DataTable
            columns={currentColumns}
            data={currentData}
          />
        </div>
      </div>
    </div>
  )
}

export default App