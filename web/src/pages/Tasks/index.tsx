import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";

import clinicorpLogo from "@/assets/clinicorpLogo.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { LogOut, PlusCircle } from "lucide-react";

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
  SelectValue,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDrr6S8R_fBPY37C1yNDXkCxnI0HUq9KAI",
  authDomain: "clini-do.firebaseapp.com",
  projectId: "clini-do",
  storageBucket: "clini-do.appspot.com",
  messagingSenderId: "512229656593",
  appId: "1:512229656593:web:b322c538c1f395c4f609b0",
  measurementId: "G-9S3C1TZ415",
};

export function Tasks() {
  const [userName, setUserName] = useState<string>("");
  const [userImg, setUserImg] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedResponsible, setSelectedResponsible] = useState<string>("");
  const [cancelClicked, setCancelClicked] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://clinicorp-application-api.vercel.app/api/tasks"
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://clinicorp-application-api.vercel.app/api/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    fetchUsers();
  }, []);

  const handleCancelClick = () => {
    setCancelClicked(true);
  };

  useEffect(() => {
    async function fetchInitialData() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserName(user.displayName || "");
          setUserImg(user.photoURL || "");
        } else {
          setUserName("");
          setUserImg("");
        }
      });
    }
    fetchInitialData();
  }, []);

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

  const handleNewTaskSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (cancelClicked) {
      setCancelClicked(false);
      return;
    }

    const task = {
      createdBy: userName,
      description: newTask,
      isBlocked: false,
      priority: selectedPriority,
      responsible: selectedResponsible,
      status: "To Do",
    };

    const response = await fetch(
      "https://clinicorp-application-api.vercel.app/api/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    const data = await response.json();
    console.log("Success:", data);
    setNewTask("");
    setSelectedPriority("");
    setSelectedResponsible("");
  };

  const { toast } = useToast();
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <div className="flex items-center">
          <img src={clinicorpLogo} alt="Clinicorp" />
          <h1 className="text-xl font-bold">clini.do</h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-muted-foreground">Usuários no board</h1>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center">
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger> */}
            <Menubar className="border-none shadow-none cursor-pointer rounded-full">
              <MenubarMenu>
                <MenubarTrigger className="rounded-full w-16 flex justify-center items-center">
                  <Avatar className="border-2 border-orange-500 w-12 h-12 cursor-pointer">
                    <AvatarImage src={userImg} />
                    <AvatarFallback>{userName[0]}</AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => {
                      auth.signOut();
                      toast({
                        title: "Logout realizado com sucesso!",
                        description: "Você será redirecionado para a página de login.",
                        duration: 5000,
                      });
                      navigate("/");
                    }}
                  >
                    <LogOut size={20} className="mr-2" />
                    Logout
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            {/* </TooltipTrigger>
                <TooltipContent>{userName}</TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6 space-y-11">
        <div className="flex flex-col leading-relaxed">
          <h1 className="text-xl font-bold md:text-2xl">
            👋 Bem vindo, {userName}!
          </h1>
          <span className="text-muted-foreground text-base">
            Aqui está a lista de tarefas
          </span>
        </div>
        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex flex-col flex-1">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  variant="default"
                  className="flex items-center space-x-2"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Criar tarefa
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <form onSubmit={handleNewTaskSubmit}>
                  <AlertDialogHeader className="flex flex-col space-y-5">
                    <div className="mb-3">
                      <AlertDialogTitle>Criar tarefa</AlertDialogTitle>
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
                        defaultValue={newTask}
                        onChange={(event) => setNewTask(event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <span>Responsável</span>
                      <Select
                        onValueChange={(value) => setSelectedResponsible(value)}
                        defaultValue={selectedResponsible}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um usuário..." />
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
                        onValueChange={(value) => setSelectedPriority(value)}
                        defaultValue={selectedPriority}
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
                    <div className="flex flex-1 justify-center space-x-4">
                      <AlertDialogCancel>
                        <Button variant="ghost" onClick={handleCancelClick}>
                          Cancelar
                        </Button>
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
            <DataTable columns={columns} data={tasks} />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
