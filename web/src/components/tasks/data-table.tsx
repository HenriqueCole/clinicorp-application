import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Filter, Search } from "lucide-react"
import { Separator } from "../ui/separator"
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
 
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const statusCheckboxes = [
    { id: "1", name: "To do" },
    { id: "2", name: "Doing" },
    { id: "3", name: "Done" },
  ];

  const priorityCheckboxes = [
    {
      id: '1',
      name: 'Baixa',
    },
    {
      id: '2',
      name: 'Média',
    },
    {
      id: '3',
      name: 'Alta',
    },
  ]
 
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center py-4">
        <div className="flex items-center space-x-3">
          <Input
            placeholder="Procurar tarefas..."
            value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("description")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-dashed flex gap-3">
                <Filter size={17} />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 p-0 z-10">
            <div className="flex flex-col h-36">
              <div className="flex flex-1 items-center px-3">
                <Search size={17} className="text-zinc-500"/>
                <Input placeholder="Status" className="border-none focus-visible:ring-0 text-base" onChange={
                  //sort the status checkboxes by name
                  (event) => {
                    const { value } = event.target;
                    const sortedCheckboxes = statusCheckboxes.sort((a, b) => {
                      if (a.name > b.name) {
                        return 1;
                      }
                      if (a.name < b.name) {
                        return -1;
                      }
                      return 0;
                    });
                    const filteredCheckboxes = sortedCheckboxes.filter((checkbox) => {
                      return checkbox.name.toLowerCase().includes(value.toLowerCase());
                    });
                    console.log(filteredCheckboxes);
                  }
                }/>
              </div>
              <Separator />
              <div className="flex flex-col p-1">
                {statusCheckboxes.map(checkbox => (
                  <div key={checkbox.id} className="flex items-center gap-3 p-[0.2rem] flex-1 rounded hover:bg-white/5">
                    <Checkbox
                      id={checkbox.name}
                      checked={table.getColumn("status")?.getFilterValue() === checkbox.name}
                      onClick={() => {
                        const { name } = checkbox;
                        const currentValue = table.getColumn("status")?.getFilterValue();
                        if (currentValue === name) {
                          table.getColumn("status")?.setFilterValue(undefined);
                        } else {
                          table.getColumn("status")?.setFilterValue(name);
                        }
                      }}
                    />
                    <label htmlFor={checkbox.name} className="font-semibold flex flex-1">
                      {checkbox.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-dashed flex gap-3">
                <Filter size={17} />
                Prioridade
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 p-0">
            <div className="flex flex-col h-36">
              <div className="flex flex-1 items-center px-3">
                <Search size={17} className="text-zinc-500"/>
                <Input placeholder="Prioridade" className="border-none focus-visible:ring-0 text-base"/>
              </div>
              <Separator />
              <div className="flex flex-col p-1">
                {priorityCheckboxes.map(checkbox => (
                  <div key={checkbox.id} className="flex items-center gap-3 p-[0.2rem] flex-1 rounded hover:bg-white/5">
                    <Checkbox id={checkbox.name} onClick={
                      () => {
                        const { name } = checkbox;
                        const currentValue = table.getColumn("priority")?.getFilterValue();
                        if (currentValue === name) {
                          table.getColumn("priority")?.setFilterValue(undefined);
                        } else {
                          table.getColumn("priority")?.setFilterValue(name);
                        }
                      }
                    }/>
                    <label htmlFor={checkbox.name} className="font-semibold flex flex-1">
                      {checkbox.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto flex gap-2">
              <Filter size={17} />
              Colunas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: boolean) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border flex flex-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} 
          {table.getFilteredRowModel().rows.length === 1 ? " tarefa selecionada" : " tarefas selecionadas"}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}