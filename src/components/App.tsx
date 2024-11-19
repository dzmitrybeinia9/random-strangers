import { useState, useMemo, useEffect } from 'react'
import { allTimeColumns, seasonColumns } from "../table/columns"
import { SortingState } from "@tanstack/react-table"
import Dashboard from '../pages/dashboard/components/Dashboard'
import { TeamData } from '../lib/types'

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

function App({ classicResponse, musicResponse }: AppProps) {
  const [contentMode, setContentMode] = useState<ContentMode>('classic')
  const [viewMode, setViewMode] = useState<ViewMode>('all')
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'points', desc: true }
  ])

  const classicData = useMemo(() => classicResponse, [classicResponse])
  const musicData = useMemo(() => musicResponse, [musicResponse])

  useEffect(() => {
    setSorting([
      { id: viewMode === 'all' ? 'points' : 'season_points', desc: true }
    ])
  }, [viewMode])

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
    <div className="min-h-[calc(100vh-64px)] w-full transition-all duration-200 ease-in-out" 
         style={backgroundStyle}>
      <div className="container mx-auto py-5">
        <Dashboard
          contentMode={contentMode}
          setContentMode={setContentMode}
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentData={currentData}
          currentColumns={currentColumns}
          sorting={sorting}
        />
      </div>
    </div>
  )
}

export default App