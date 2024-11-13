import { ColumnDef } from "@tanstack/react-table"

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
    <button
        className="hover:text-gray-700"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
        {label}
    </button>
)

export const allTimeColumns: ColumnDef<TeamData>[] = [
    {
        accessorKey: "team",
        header: "Team",
        cell: ({ getValue }) => {
            const teamName = getValue() as string;
            return teamName === 'Первые встречные'
                ? `${teamName} 👑`
                : teamName;
        }
    },
    {
        accessorKey: "games",
        header: ({ column }) => <SortableHeader label="Games" column={column} />,
    },
    {
        accessorKey: "wins",
        header: ({ column }) => <SortableHeader label="Wins" column={column} />,
    },
    {
        accessorKey: "points",
        header: ({ column }) => <SortableHeader label="Points" column={column} />,
    }
]

export const seasonColumns: ColumnDef<TeamData>[] = [
    {
        accessorKey: "team",
        header: "Team",
        cell: ({ getValue }) => {
            const teamName = getValue() as string;
            return teamName === 'Первые встречные'
                ? `${teamName} 👑`
                : teamName;
        }
    },
    {
        accessorKey: "season_games",
        header: ({ column }) => <SortableHeader label="Games" column={column} />,
    },
    {
        accessorKey: "season_wins",
        header: ({ column }) => <SortableHeader label="Wins" column={column} />,
    },
    {
        accessorKey: "season_points",
        header: ({ column }) => <SortableHeader label="Points" column={column} />,
    }
] 