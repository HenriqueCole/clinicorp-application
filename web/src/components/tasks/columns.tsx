import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Copy,
  Delete,
  Edit,
  LockIcon,
  MoreHorizontal,
  UnlockIcon,
} from "lucide-react";
import { useState } from "react";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export type Task = {
  id: string;
  description: string;
  status: "To do" | "Doing" | "Done";
  priority: "Baixa" | "Média" | "Alta";
  responsible: string;
  createdBy: string;
  isBlocked: boolean;
};

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Prioridade",
  },
  {
    accessorKey: "responsible",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Responsável
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Criado por
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const task = row.original;
      const [blockText, setBlockText] = useState(
        task.isBlocked ? "Desbloquear tarefa" : "Bloquear tarefa"
      );
      const { toast } = useToast();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.id)}
            >
              <Copy size={17} className="mr-2" />
              Copiar ID da tarefa
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit size={17} className="mr-2" />
              Editar tarefa
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                //fetch to get the task
                fetch(`http://localhost:3001/api/tasks/${task.id}`, {
                  //get the isBlocked value and if it is true, make a fetch to unblock the task and if it is false, make a fetch to block the task
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("DATA: ", data.isBlocked);
                    if (data.isBlocked) {
                      fetch(
                        `http://localhost:3001/api/tasks/unblock/${task.id}`,
                        {
                          method: "PUT",
                        }
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          console.log("DATA: ", data);
                          setBlockText("Bloquear tarefa");
                          toast({
                            title: "Tarefa desbloqueada com sucesso!",
                            description: "Agora outros usuários podem editá-la.",
                            duration: 5000,
                          });
                          
                        })
                        .catch((error) => {
                          console.error("Error: ", error);
                        });
                    } else {
                      fetch(
                        `http://localhost:3001/api/tasks/block/${task.id}`,
                        {
                          method: "PUT",
                        }
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          console.log("DATA: ", data);
                          setBlockText("Desbloquear tarefa");
                          toast({
                            title: "Tarefa bloqueada com sucesso!",
                            description: "Nenhum usuário poderá editá-la.",
                            duration: 5000,
                          });
                        })
                        .catch((error) => {
                          console.error("Error: ", error);
                        });
                    }
                  });
              }}
            >
              {blockText === "Bloquear tarefa" ? (
                <LockIcon size={17} className="mr-2" />
              ) : (
                <UnlockIcon size={17} className="mr-2" />
              )}
              {blockText}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Delete size={17} className="mr-2" />
              Excluir tarefa
            </DropdownMenuItem>
          </DropdownMenuContent>
          <Toaster />
        </DropdownMenu>
      );
    },
  },
];
