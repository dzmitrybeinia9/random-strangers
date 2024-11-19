import { DataTable } from "../table/data-table"
import { SwitchButton } from './ui/switch-button'
import { ColumnDef } from "@tanstack/react-table"
import { TeamData } from "../table/columns"

interface DashboardProps {
  contentMode: 'music' | 'classic';
  setContentMode: (mode: 'music' | 'classic') => void;
  viewMode: 'all' | 'season';
  setViewMode: (mode: 'all' | 'season') => void;
  currentData: TeamData[];
  currentColumns: ColumnDef<TeamData, any>[];
  sorting: { id: string; desc: boolean; }[];
}

function Dashboard({
  contentMode,
  setContentMode,
  viewMode,
  setViewMode,
  currentData,
  currentColumns,
  sorting
}: DashboardProps) {
  return (
    <>
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
          defaultSorting={sorting}
        />
      </div>
    </>
  )
}

export default Dashboard 