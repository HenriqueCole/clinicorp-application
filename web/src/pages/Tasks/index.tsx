import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  const response = await fetch("http://localhost:3001/api/tasks")
  const data = await response.json()
  return data
}

async function getUsers(): Promise<any[]> {
  const response = await fetch("http://localhost:3001/api/users")
  const data = await response.json()
  return data
}

const firebaseConfig = {
  apiKey: "AIzaSyDrr6S8R_fBPY37C1yNDXkCxnI0HUq9KAI",
  authDomain: "clini-do.firebaseapp.com",
  projectId: "clini-do",
  storageBucket: "clini-do.appspot.com",
  messagingSenderId: "512229656593",
  appId: "1:512229656593:web:b322c538c1f395c4f609b0",
  measurementId: "G-9S3C1TZ415"
};



export function Tasks() {
  const [data, setData] = useState<Task[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [userName, setUserName] = useState<string>("")
  const [userImg, setUserImg] = useState<string>("")

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const fetchData = async () => {
    const result = await getData();
    const users = await getUsers();
    setData(result);
    setUsers(users);
    console.log("USERS: ", users)
  };

  useEffect(() => {
    async function fetchInitialData() {
      await fetchData();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserName(user.displayName);
          setUserImg(user.photoURL);
        }
      });
    }
    fetchInitialData();
  }, []);

  // Fetch data every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

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
                                    <AvatarImage src={user.photoURL} />
                                    <AvatarFallback>
                                      teste
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

