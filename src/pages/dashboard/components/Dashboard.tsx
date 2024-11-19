import { DataTable } from "../../../table/data-table"
import { SwitchButton } from '../../../components/ui/switch-button'
import { ColumnDef } from "@tanstack/react-table"
import { TeamData } from "../../../lib/types"

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
      <div className="bg-white shadow-md rounded-xl p-1.5 w-auto sm:w-auto hover:shadow-lg transition-shadow">
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

        <div className="bg-white shadow-md rounded-xl p-1.5 w-auto sm:w-auto hover:shadow-lg transition-shadow">
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

      {/* Table Section */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mx-7">
        <div className="p-4">
          <DataTable
            columns={currentColumns}
            data={currentData}
            defaultSorting={sorting}
          />
        </div>
      </div>
    </>
  )
}

export default Dashboard 