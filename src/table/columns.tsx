import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type TeamData = {
    place: number
    team: string
    rank_id: number
    rank_name: string
    city: string
    games: number
    wins: number
    points: number
    season_games: number
    season_wins: number
    season_points: number
    isChampion: number
}

const SortableHeader = ({
    label,
    column
}: {
    label: string;
    column: any;
}) => (
    <div className="flex justify-center">
        <button
            className="flex items-center gap-2 hover:text-gray-700 min-w-[80px] justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {label}
            <ArrowUpDown className="h-4 w-4" />
        </button>
    </div>
)

export const allTimeColumns: ColumnDef<TeamData>[] = [
    {
        accessorKey: "team",
        header: () => <div className="text-left pl-4">Team</div>,
        cell: ({ getValue }) => {
            const teamName = getValue() as string;
            return (
                <div className="pl-4">
                    {teamName === 'Первые встречные' ? `${teamName} 👑` : teamName}
                </div>
            );
        },
        minSize: 200,
    },
    {
        accessorKey: "games",
        header: ({ column }) => <SortableHeader label="Games" column={column} />,
        cell: ({ getValue }) => (
            <div className="text-center">{getValue() as number}</div>
        ),
        minSize: 100,
    },
    {
        accessorKey: "wins",
        header: ({ column }) => <SortableHeader label="Wins" column={column} />,
        cell: ({ getValue }) => (
            <div className="text-center">{getValue() as number}</div>
        ),
        minSize: 100,
    },
    {
        accessorKey: "points",
        header: ({ column }) => <SortableHeader label="Points" column={column} />,
        cell: ({ getValue }) => (
            <div className="text-center">{getValue() as number}</div>
        ),
        minSize: 100,
    }
]

export const seasonColumns: ColumnDef<TeamData>[] = [
    {
        accessorKey: "team",
        header: () => <div className="text-left pl-4">Team</div>,
        cell: ({ getValue }) => {
            const teamName = getValue() as string;
            return (
                <div className="pl-4">
                    {teamName === 'Первые встречные' ? `${teamName} 👑` : teamName}
                </div>
            );
        },
        minSize: 200,
    },
    {
        accessorKey: "season_games",
        header: ({ column }) => <SortableHeader label="Games" column={column} />,
        cell: ({ getValue }) => (
            <div className="text-center">{getValue() as number}</div>
        ),
        minSize: 100,
    },
    {
        accessorKey: "season_wins",
        header: ({ column }) => <SortableHeader label="Wins" column={column} />,
        cell: ({ getValue }) => (
            <div className="text-center">{getValue() as number}</div>
        ),
        minSize: 100,
    },
    {
        accessorKey: "season_points",
        header: ({ column }) => <SortableHeader label="Points" column={column} />,
        cell: ({ getValue }) => (
            <div className="text-center">{getValue() as number}</div>
        ),
        minSize: 100,
    }
] 