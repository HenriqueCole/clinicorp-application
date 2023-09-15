import { useEffect, useState } from "react";

import clinicorpLogo from "@/assets/clinicorpLogo.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { PlusCircle } from "lucide-react";

import { Task, columns } from "@/components/tasks/columns";
import { DataTable } from "@/components/tasks/data-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";

async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      description: "Create login page",
      status: "To do",
      priority: "Baixa",
      responsible: "Henrique Cole",
      createdBy: "Luana Becker",
    },
    {
      id: "2",
      description: "Implement authentication",
      status: "Doing",
      priority: "Alta",
      responsible: "Henrique Cole",
      createdBy: "Henrique Cole",
    },
    {
      id: "3",
      description: "Add user profile page",
      status: "To do",
      priority: "Média",
      responsible: "Luana Becker",
      createdBy: "Henrique Cole",
    },
    {
      id: "4",
      description: "Create dashboard layout",
      status: "Done",
      priority: "Baixa",
      responsible: "Luana Becker",
      createdBy: "Luana Becker",
    },
    {
      id: "5",
      description: "Implement data fetching",
      status: "To do",
      priority: "Alta",
      responsible: "Henrique Cole",
      createdBy: "Luana Becker",
    },
    {
      id: "6",
      description: "Add data filtering",
      status: "Doing",
      priority: "Média",
      responsible: "Luana Becker",
      createdBy: "Henrique Cole",
    },
    {
      id: "7",
      description: "Create data visualization",
      status: "To do",
      priority: "Baixa",
      responsible: "Henrique Cole",
      createdBy: "Luana Becker",
    },
    {
      id: "8",
      description: "Implement data export",
      status: "Done",
      priority: "Alta",
      responsible: "Luana Becker",
      createdBy: "Henrique Cole",
    },
    {
      id: "9",
      description: "Add user settings page",
      status: "To do",
      priority: "Média",
      responsible: "Henrique Cole",
      createdBy: "Luana Becker",
    },
    {
      id: "10",
      description: "Create user management system",
      status: "Doing",
      priority: "Baixa",
      responsible: "Luana Becker",
      createdBy: "Henrique Cole",
    },
    {
      id: "11",
      description: "Implement user roles",
      status: "To do",
      priority: "Alta",
      responsible: "Henrique Cole",
      createdBy: "Luana Becker",
    },
    {
      id: "12",
      description: "Add user permissions",
      status: "Done",
      priority: "Média",
      responsible: "Luana Becker",
      createdBy: "Henrique Cole",
    },
    {
      id: "13",
      description: "Create notification system",
      status: "To do",
      priority: "Baixa",
      responsible: "Henrique Cole",
      createdBy: "Luana Becker",
    },
    {
      id: "14",
      description: "Implement email notifications",
      status: "Doing",
      priority: "Alta",
      responsible: "Luana Becker",
      createdBy: "Henrique Cole",
    },
    {
      id: "15",
      description: "Add in-app notifications",
      status: "To do",
      priority: "Média",
      responsible: "Henrique Cole",
      createdBy: "Luana Becker",
    },
    {
      id: "16",
      description: "Create error handling system",
      status: "Done",
      priority: "Baixa",
      responsible: "Luana Becker",
      createdBy: "Henrique Cole",
    },
    {
      id: "17",
      description: "Implement error logging",
      status: "To do",
      priority: "Alta",
      responsible: "Henrique Cole",
      createdBy: "Luana Becker",
    },
    {
      id: "18",
      description: "Add error notifications",
      status: "Doing",
      priority: "Média",
      responsible: "Luana Becker",
      createdBy: "Henrique Cole",
    },
    {
      id: "19",
      description: "Create testing suite",
      status: "To do",
      priority: "Baixa",
      responsible: "Henrique Cole",
      createdBy: "Luana Becker",
    },
    {
      id: "20",
      description: "Implement unit tests",
      status: "Done",
      priority: "Alta",
      responsible: "Luana Becker",
      createdBy: "Henrique Cole",
    },
  ]
}

export function Tasks() {
  const [data, setData] = useState<Task[]>([])
  const [userName, setUserName] = useState<string>("")
  const [userImg, setUserImg] = useState<string>("")

  useEffect(() => {
    async function fetchData() {
      const result = await getData()
      setData(result)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      window.location.href = "/"
    }
    const parsedUser = JSON.parse(user)
    console.log(parsedUser)
    setUserName(parsedUser.displayName)
    setUserImg(parsedUser.photoURL)
  }, [])
  

  const users = [
    {
      id: "1",
      name: "Henrique Cole",
      avatar: "https://github.com/HenriqueCole.png"
    },
    {
      id: "2",
      name: "Luana Becker",
      avatar: "https://github.com/LuanaBecker24.png"
    }
  ]

  const priorities = [
    {
      id: "1",
      name: "Baixa",
      icon: <ArrowDown size={17} />
    },
    {
      id: "2",
      name: "Média",
      icon: <ArrowLeft size={17}/>
    },
    {
      id: "3",
      name: "Alta",
      icon: <ArrowUp size={17}/>
    }
  ]

  const { toast } = useToast()

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <div className="flex items-center">
          <img src={clinicorpLogo} alt="Clinicorp" />
          <h1 className="text-xl font-bold">clini.do</h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-muted-foreground">Usuários no board</h1>
          <Separator orientation="vertical" className="h-6"/>
            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="border-2 border-orange-500 w-12 h-12">
                      <AvatarImage src={userImg} />
                      <AvatarFallback>
                        {userName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    {userName}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6 space-y-11">
        <div className="flex flex-col leading-relaxed">
          <h1 className="text-xl font-bold md:text-2xl">👋 Bem vindo, {userName}!</h1>
          <span className="text-muted-foreground text-base">Aqui está a lista de tarefas</span>
        </div>
        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex flex-col flex-1">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="default" className="flex items-center space-x-2">
                  <PlusCircle size={20} className="mr-2" />
                  Criar tarefa
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="flex flex-col space-y-5">
                  <div className="space-y-2">
                    <AlertDialogTitle>Criar tarefa</AlertDialogTitle>
                    <AlertDialogDescription>
                      Lembre-se de preencher todos os campos
                    </AlertDialogDescription>
                  </div>
                </AlertDialogHeader>
                  <div className="flex flex-col space-y-5">
                    <div className="space-y-2">
                      <span>
                        Descrição
                      </span>
                      <Textarea 
                        className="leading-relaxed resize-none"
                        placeholder="Descreva o objetivo da tarefa..." 
                      />
                    </div>
                    <div className="space-y-2">
                      <span>
                        Responsável
                      </span>
                      <Select>
                        <SelectTrigger className="p-5">
                          <SelectValue placeholder="Selecione um usuário..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Usuários</SelectLabel>
                            {users.map((user) => (
                              <SelectItem key={user.id} value={user.id}>
                                <div className="flex items-center space-x-2">
                                  <Avatar className="border-2 border-orange-500 w-8 h-8">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
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
                      <span>
                          Prioridade
                        </span>
                        <Select>
                          <SelectTrigger className="p-5">
                            <SelectValue placeholder="Selecione a prioridade..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Prioridades</SelectLabel>
                              {priorities.map((priority) => (
                                <SelectItem key={priority.id} value={priority.id}>
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
                        <Button variant="ghost">
                          Cancelar
                        </Button>
                      </AlertDialogCancel>
                      <AlertDialogAction 
                      onClick={ () => {
                        toast({
                          title: "Tarefa criada com sucesso!",
                          description: "A tarefa foi criada com sucesso e já está disponível na lista de tarefas.",
                          type: "foreground",
                          duration: 4000,
                        })
                      }
                    }>
                        <PlusCircle size={20} className="mr-2" />
                        Criar tarefa
                      </AlertDialogAction>
                    </div>
                  </div>
              </AlertDialogContent>
            </AlertDialog>
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

