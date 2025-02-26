import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user || session.user.role !== "ADMIN") {
      router.push("/"); // Redirige si l'utilisateur n'est pas admin
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Chargement...</p>;
  if (!session || !session.user) return <p>Accès refusé</p>

  return (
    <div>
      <h1>Tableau de bord Admin</h1>
      <p>Bienvenue, {session.user.email}</p>
    </div>
  );
}
