import {
    ColumnDef,
    flexRender,
    SortingState,
    ColumnFiltersState,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    defaultSorting?: SortingState
}

export function DataTable<TData extends { team: string }>({
    columns,
    data,
    defaultSorting = [],
}: DataTableProps<TData, any>) {
    const [sorting, setSorting] = useState<SortingState>(defaultSorting)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    useEffect(() => {
        setSorting(defaultSorting)
    }, [defaultSorting])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        columnResizeMode: "onChange",
    })

    return (
        <div>
            {/* Filter input */}
            {/* hide input on small devices */}
            <div className="flex items-center py-4 md:block hidden">
                <Input
                    placeholder="Search for a team..."
                    value={(table.getColumn("team")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("team")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>

            {/* Main section */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead 
                                        key={header.id}
                                        style={{ width: header.getSize() }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    // highlight the team
                                    className={
                                        row.original.team === 'Первые встречные'
                                            ? 'bg-green-100 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell 
                                            key={cell.id}
                                            style={{ width: cell.column.getSize() }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination controls */}

            <div className="flex items-center justify-center space-x-2 py-4">
                {/* First page */}
                <Button
                    variant="outline"
                    className="w-20"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    First
                </Button>
                {/* Previous page */}
                <Button
                    variant="outline"
                    className="w-20"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                {/* Next page */}
                <Button
                    variant="outline"
                    className="w-20"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
                {/* Last page */}
                <Button
                    variant="outline"
                    className="w-20"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Last
                </Button>
            </div>
        </div>
    )
}
