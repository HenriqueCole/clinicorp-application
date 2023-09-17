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
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ArrowUpDown,
  Copy,
  Delete,
  Edit,
  LockIcon,
  MoreHorizontal,
  PlusCircle,
  UnlockIcon,
} from "lucide-react";
import { useState } from "react";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export type Task = {
  id: string;
  description: string;
  status: "To do" | "Doing" | "Done";
  priority: "Baixa" | "Média" | "Alta";
  responsible: string;
  createdBy: string;
  isBlocked: boolean;
};

async function getUsers(): Promise<any[]> {
  const response = await fetch("http://localhost:3001/api/users");
  const data = await response.json();
  return data;
}

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

      const [users, setUsers] = useState<any[]>([]);
      const [blockText, setBlockText] = useState(
        task.isBlocked ? "Desbloquear tarefa" : "Bloquear tarefa"
      );
      const { toast } = useToast();
      const priorities = [
        {
          id: "1",
          name: "Baixa",
          icon: <ArrowDown size={17} />,
        },
        {
          id: "2",
          name: "Média",
          icon: <ArrowLeft size={17} />,
        },
        {
          id: "3",
          name: "Alta",
          icon: <ArrowUp size={17} />,
        },
      ];

      const fetchData = async () => {
        const users = await getUsers();
        setUsers(users);
      };

      fetchData();

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
            <AlertDialog>
              <AlertDialogTrigger>
                <div className="flex items-center justify-center flex-1 px-2 hover:bg-zinc-100 rounded">
                  <Edit size={17} className="mr-2" />
                  <p className="text-sm">Editar tarefa</p>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <form>
                  <AlertDialogHeader className="flex flex-col space-y-5">
                    <div className="space-y-2">
                      <AlertDialogTitle>Editar tarefa</AlertDialogTitle>
                      <AlertDialogDescription>
                        Lembre-se de preencher todos os campos
                      </AlertDialogDescription>
                    </div>
                  </AlertDialogHeader>
                  <div className="flex flex-col space-y-5">
                    <div className="space-y-2">
                      <span>Descrição</span>
                      <Textarea
                        className="leading-relaxed resize-none"
                        placeholder="Descreva o objetivo da tarefa..."
                      />
                    </div>
                    <div className="space-y-2">
                      <span>Responsável</span>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um usuário..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Usuários</SelectLabel>
                            {users.map((user) => (
                              <SelectItem key={user.id} value={user.name}>
                                <div className="flex items-center space-x-2">
                                  <Avatar className="border-2 border-orange-500 w-8 h-8">
                                    <AvatarImage src={user.photoURL} />
                                    <AvatarFallback>
                                      {user.name[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{user.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <span>Prioridade</span>
                      <Select>
                        <SelectTrigger className="p-5">
                          <SelectValue placeholder="Selecione a prioridade..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Prioridades</SelectLabel>
                            {priorities.map((priority) => (
                              <SelectItem
                                key={priority.id}
                                value={priority.name}
                              >
                                <div className="flex items-center space-x-2">
                                  {priority.icon}
                                  <span>{priority.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-1 justify-center space-x-4">
                      <AlertDialogCancel>
                        <Button variant="ghost">Cancelar</Button>
                      </AlertDialogCancel>
                      <AlertDialogAction
                        type="submit"
                        onClick={() => {
                          toast({
                            title: "Tarefa criada com sucesso!",
                            description: "A tarefa foi adicionada ao board.",
                            duration: 5000,
                          });
                        }}
                      >
                        <PlusCircle size={20} className="mr-2" />
                        Criar tarefa
                      </AlertDialogAction>
                    </div>
                  </div>
                </form>
              </AlertDialogContent>
            </AlertDialog>

            <DropdownMenuItem
              onClick={() => {
                fetch(`http://localhost:3001/api/tasks/${task.id}`, {})
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
                            description:
                              "Agora outros usuários podem editá-la.",
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
            <DropdownMenuItem
              onClick={() => {
                fetch(`http://localhost:3001/api/tasks/${task.id}`, {
                  method: "DELETE",
                })
                .then((response) => response.json())
                .then((data) => {
                  console.log("DATA: ", data);
                  toast({
                    title: "Tarefa excluída com sucesso!",
                    description: "A tarefa foi excluída do board.",
                    duration: 5000,
                  });
                })
                .catch((error) => {
                  console.error("Error: ", error);
                });
              }}
            >
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
