import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

import clinicorpLogo from "@/assets/clinicorpLogo.png";
import googleLogo from "@/assets/googleLogo.png";
import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export function Login() {
  const navigate = useNavigate();

  const { toast } = useToast();

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
  const auth = getAuth(app);

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        fetch("https://clinicorp-application-api.vercel.app/api/users")
          .then((response) => response.json())
          .then((data) => {
            const userExists = data.some(
              (user: { name: string | null }) =>
                user.name === result.user.displayName
            );
            if (!userExists) {
              fetch("https://clinicorp-application-api.vercel.app/api/users", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: result.user.displayName,
                  photoURL: result.user.photoURL,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("Success:", data);
                  navigate("/tasks");
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            } else {
              console.log("User already exists:", result.user.displayName);
              navigate("/tasks");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-20">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                const body = document.querySelector("body");
                if (body) {
                  body.classList.remove("dark");
                }
              }}
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const body = document.querySelector("body");
                if (body) {
                  body.classList.add("dark");
                }
              }}
            >
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center justify-center">
        <img src={clinicorpLogo} alt="" />
        <h1 className="text-3xl font-bold">clini.do</h1>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Entre na sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Insira seu email abaixo ou continue com o Google
            </p>
          </div>

          <div className="flex-col justify-center items-center space-y-5">
            <div className="grid gap-2">
              <div className="grid gap-1">
                <p className="sr-only">Email</p>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>
              <Button
                onClick={() => {
                  toast({
                    title: "Entre com o google!",
                    description:
                      "No momento só é possível entrar com o google.",
                    duration: 5000,
                    variant: "destructive",
                  });
                }}
              >
                Entrar com o Email
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
            >
              <img
                src={googleLogo}
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              Continuar com Google
            </Button>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Clicando aqui você concorda com os nossos{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
