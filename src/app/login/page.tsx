'use client'
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { motion } from "framer-motion"
import SpinnerButtons from "../components/SpinnerButtons/SpinnerButtons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);

    const result = await signIn("credentials", {
      email, 
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Erreur de connexion:", result.error);
      setIsLoading(false);
      return;
    }

    // Récupérer la session après connexion
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    // Vérifier le rôle et rediriger
    if (session?.user?.role === "ADMIN") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/client");
    }
  };

  const inputStyle = "w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-600 focus:border-pink-400 focus:ring-2 focus:ring-pink-400 transition-all outline-none";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-light text-white">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black bg-opacity-70 p-8 rounded-2xl shadow-lg border border-none w-full max-w-lg my-4"
      >
          <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-main">Connexion</h1>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="email"
              placeholder="Email" 
              onChange={(e) => 
              setEmail(e.target.value)} 
              className={inputStyle}
            />
            <input 
              placeholder="Mot de passe" 
              type="password" 
              onChange={(e) => setPassword(e.target.value)} 
              className={inputStyle}
            />
          </div>
          <p className="text-center mt-6">
            <button
              className="w-full bg-gradient-main hover:scale-105 transition text-white font-bold py-3 rounded-xl shadow-lg"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? <SpinnerButtons /> : "Se connecter"}
            </button>
            <Link href='/' className="flex align-center justify-end text-white mr-8 mt-3 hover:text-pink-500 font-semibold">Mot de passe oublié ?</Link>
          </p>
        </motion.div>
    </div>
  );
}
