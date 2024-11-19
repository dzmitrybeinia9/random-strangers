import { useState, useMemo, useEffect } from 'react'
import { allTimeColumns, seasonColumns } from "../../table/columns"
import { SortingState } from "@tanstack/react-table"
import Dashboard from './components/Dashboard'
import { TeamData } from '../../lib/types'

interface DashboardPageProps {
  classicResponse: TeamData[];
  musicResponse: TeamData[];
}

type ContentMode = 'music' | 'classic'
type ViewMode = 'all' | 'season'

const THEME_COLORS = {
  music: '#DB39C9',
  classic: '#773DD9',
} as const

function DashboardPage({ classicResponse, musicResponse }: DashboardPageProps) {
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

  const currentData = contentMode === 'music' ? musicData : classicData
  const currentColumns = viewMode === 'all' ? allTimeColumns : seasonColumns

  return (
    <div 
      className="min-h-[calc(100vh-64px)] w-full transition-colors duration-300 ease-in-out" 
      style={{ backgroundColor: THEME_COLORS[contentMode] }}
    >
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

export default DashboardPage 