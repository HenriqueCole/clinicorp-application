import clinicorpLogo from "@/assets/clinicorpLogo.png";

import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { Separator } from "./components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";

import { PlusCircle, Search } from 'lucide-react';
import { Checkbox } from "./components/ui/checkbox";
import { Table } from "./components/ui/table";

export function App() {

  const statusCheckboxes = [
    {
      id: '1',
      name: 'To do',
    },
    {
      id: '2',
      name: 'Doing',
    },
    {
      id: '3',
      name: 'Done',
    },
  ]

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
                      <AvatarImage src="https://github.com/HenriqueCole.png" />
                      <AvatarFallback>HC</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    Henrique Cole
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6 space-y-11">
        <div className="flex flex-col leading-relaxed">
          <h1 className="text-xl font-bold md:text-2xl">Bem vindo de volta, Henrique Cole!</h1>
          <span className="text-muted-foreground text-base">Aqui está a lista de tarefas</span>
        </div>
        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex items-center space-x-2">
            <Input placeholder="Procurar tarefas..." className="w-60"/>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-dashed flex gap-3">
                  <PlusCircle size={17} />
                  Status
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-0">
              <div className="flex flex-col h-36">
                <div className="flex flex-1 items-center px-3">
                  <Search size={17} className="text-zinc-500"/>
                  <Input placeholder="Status" className="border-none focus-visible:ring-0 text-base"/>
                </div>
                <Separator />
                <div className="flex flex-col p-1">
                  {statusCheckboxes.map(checkbox => (
                    <div className="flex items-center gap-3 p-[0.2rem] flex-1 rounded hover:bg-white/5">
                      <Checkbox id={checkbox.name} />
                      <label htmlFor={checkbox.name} className="font-semibold flex flex-1">
                        {checkbox.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-dashed flex gap-3">
                  <PlusCircle size={17} />
                  Prioridade
              </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-0">
              <div className="flex flex-col h-36">
                <div className="flex flex-1 items-center px-3">
                  <Search size={17} className="text-zinc-500"/>
                  <Input placeholder="Prioridade" className="border-none focus-visible:ring-0 text-base"/>
                </div>
                <Separator />
                <div className="flex flex-col p-1">
                  {priorityCheckboxes.map(checkbox => (
                    <div className="flex items-center gap-3 p-[0.2rem] flex-1 rounded hover:bg-white/5">
                      <Checkbox id={checkbox.name} />
                      <label htmlFor={checkbox.name} className="font-semibold flex flex-1">
                        {checkbox.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-1 border rounded">
            <Table />
          </div>
        </div>
      </div>
    </div>
  )
}