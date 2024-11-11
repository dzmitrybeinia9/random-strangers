import { ColumnDef } from "@tanstack/react-table"
// import { ArrowUpDown } from "lucide-react"
// import { Button } from "@/components/ui/button"

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

export const allTimeColumns: ColumnDef<TeamData>[] = [
    // {
    //     accessorKey: "place",
    //     header: "Place",
    // },
    {

        accessorKey: "team",
        header: "Team",
        // customizing the cell value for the team 'Первые встречные'
        cell: ({ getValue }) => {
            const teamName = getValue();
            return teamName === 'Первые встречные'
                ? `${teamName} 👑`
                : teamName;
        }

    },
    // {
    //     accessorKey: "rank_name",
    //     header: "Rank",
    // },
    {
        accessorKey: "games",
        // header: ({ column }) => {
        //     return (
        //         <Button
        //             variant="ghost"
        //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //         >
        //             Games
        //             <ArrowUpDown className="ml-2 h-4 w-4" />
        //         </Button>
        //     )
        // },
        header: "Games",
    },
    {
        accessorKey: "wins",
        header: "Wins",
    },
    {
        accessorKey: "points",
        header: "Points",
    }
]

export const seasonColumns: ColumnDef<TeamData>[] = [
    // {
    //     accessorKey: "place",
    //     header: "Place",
    // },
    {
        accessorKey: "team",
        header: "Team",
        // customizing the cell value for the team 'Первые встречные'
        cell: ({ getValue }) => {
            const teamName = getValue();
            return teamName === 'Первые встречные'
                ? `${teamName} 👑`
                : teamName;
        }
    },
    // {
    //     accessorKey: "rank_name",
    //     header: "Rank",
    // },
    {
        accessorKey: "season_games",
        header: "Games",
    },
    {
        accessorKey: "season_wins",
        header: "Wins",
    },
    {
        accessorKey: "season_points",
        header: "Points",
    }
] 