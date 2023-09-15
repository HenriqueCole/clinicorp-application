import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import clinicorpLogo from "@/assets/clinicorpLogo.png";
import googleLogo from "@/assets/googleLogo.png";

import { auth } from "@/services/firebase";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";

export function Login() {
  const [user, setUser] = useState<User>({} as User);
  

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      window.location.href = "/tasks";
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-20">
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
              <Button>Entrar com o Email</Button>
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
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
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
    </div>
  );
}
