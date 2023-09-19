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
import { useEffect, useState } from "react";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useFetch } from "@/hooks/useFetch";
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

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export type Task = {
  id: string;
  description: string;
  status: "To do" | "Doing" | "Done";
  priority: "Baixo" | "Média" | "Alta";
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

      // const [users, setUsers] = useState<any[]>([]);
      const [blockText, setBlockText] = useState(
        task.isBlocked ? "Desbloquear tarefa" : "Bloquear tarefa"
      );
      const { toast } = useToast();

      const priorities = [
        {
          id: "1",
          name: "Baixo",
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

      const status = [
        {
          id: "1",
          name: "To do",
        },
        {
          id: "2",
          name: "Doing",
        },
        {
          id: "3",
          name: "Done",
        },
      ];

      const firebaseConfig = {
        apiKey: "AIzaSyDrr6S8R_fBPY37C1yNDXkCxnI0HUq9KAI",
        authDomain: "clini-do.firebaseapp.com",
        projectId: "clini-do",
        storageBucket: "clini-do.appspot.com",
        messagingSenderId: "512229656593",
        appId: "1:512229656593:web:b322c538c1f395c4f609b0",
        measurementId: "G-9S3C1TZ415",
      };

      const app = initializeApp(firebaseConfig);

      const { data: users } = useFetch<any[]>(
        "https://clinicorp-application-api.vercel.app/api/users"
      );

      const auth = getAuth(app);

      const [loggedUserName, setLoggedUserName] = useState<string>("");

      useEffect(() => {
        async function fetchInitialData() {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              setLoggedUserName(user.displayName || "");
            } else {
              setLoggedUserName("");
            }
          });
        }
        fetchInitialData();
      }, []);

      const [isOpen, setIsOpen] = useState(false);

      const [newDescription, setNewDescription] = useState<string>(
        task.description
      );

      const [newResponsible, setNewResponsible] = useState<string>(
        task.responsible
      );

      const [newPriority, setNewPriority] = useState<string>(task.priority);

      const [newStatus, setNewStatus] = useState<string>(task.status);
      
      const handleUpdateTask = async (
        event: React.FormEvent<HTMLFormElement>
      ) => {
        event.preventDefault();

        const newTask = {
          description: newDescription,
          responsible: newResponsible,
          priority: newPriority,
          status: newStatus,
          createdBy: task.createdBy,
        };
        
        const response = await fetch(
          `https://clinicorp-application-api.vercel.app/api/tasks/${task.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
          }
        );
        const data = await response.json();
        console.log("success: ", data);
        setIsOpen(false);
      }

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
              onClick={() => {
                navigator.clipboard.writeText(task.id)
                toast({
                  title: "ID da tarefa copiado com sucesso!",
                  description: "O ID da tarefa foi copiado para a área de transferência.",
                  duration: 5000,
                });
              }}
            >
              <Copy size={17} className="mr-2" />
              Copiar ID da tarefa
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger
                onClick={() => {
                  if (task.isBlocked) {
                    toast({
                      title: `${task.createdBy} bloqueou esta tarefa!`,
                      description: "Você não pode editar uma tarefa bloqueada.",
                      duration: 5000,
                      variant: "destructive",
                    });
                  } else {
                    setIsOpen(true);
                  }
                }}
              >
                <div className="flex items-center justify-center flex-1 px-2 hover:bg-zinc-100 rounded">
                  <Edit size={17} className="mr-2" />
                  <p className="text-sm">Editar tarefa</p>
                </div>
              </AlertDialogTrigger>
              {isOpen && (
                <AlertDialogContent>
                  <form onSubmit={handleUpdateTask}>
                    <AlertDialogHeader className="flex flex-col space-y-5">
                      <div className="mb-3">
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
                          defaultValue={newDescription}
                          onChange={(event) => {
                            setNewDescription(event.target.value);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <span>Responsável</span>
                        <Select
                          defaultValue={newResponsible}
                          onValueChange={(value) => {
                            setNewResponsible(value);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Usuários</SelectLabel>
                              {users?.map((user) => (
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
                        <Select
                          defaultValue={newPriority}
                          onValueChange={(value) => {
                            setNewPriority(value);
                          }}
                        >
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
                      <div className="space-y-2">
                        <span>Status</span>
                        <Select
                          defaultValue={newStatus}
                          onValueChange={(value) => {
                            setNewStatus(value);
                          }}
                        >
                          <SelectTrigger className="p-5">
                            <SelectValue placeholder="Selecione o status..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              {status.map((status) => (
                                <SelectItem key={status.id} value={status.name}>
                                  <span>{status.name}</span>
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
                              title: "Tarefa editada com sucesso!",
                              description: "A tarefa foi editada e salva.",
                              duration: 5000,
                            });
                          }}
                        >
                          <PlusCircle size={20} className="mr-2" />
                          Editar tarefa
                        </AlertDialogAction>
                      </div>
                    </div>
                  </form>
                </AlertDialogContent>
              )}
            </AlertDialog>

            {loggedUserName === task.createdBy && (
              <DropdownMenuItem
                onClick={() => {
                  fetch(`https://clinicorp-application-api.vercel.app/api/tasks/${task.id}`, {})
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("DATA: ", data.isBlocked);
                      if (data.isBlocked) {
                        fetch(
                          `https://clinicorp-application-api.vercel.app/api/tasks/unblock/${task.id}`,
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
                          `https://clinicorp-application-api.vercel.app/api/tasks/block/${task.id}`,
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
            )}
            <DropdownMenuItem
              onClick={() => {
                if (task.isBlocked) {
                  toast({
                    title: `${task.createdBy} bloqueou esta tarefa!`,
                    description: "Você não pode excluir uma tarefa bloqueada.",
                    duration: 5000,
                    variant: "destructive",
                  });
                  return;
                } else {
                  fetch(`https://clinicorp-application-api.vercel.app/api/tasks/${task.id}`, {
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
                }
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