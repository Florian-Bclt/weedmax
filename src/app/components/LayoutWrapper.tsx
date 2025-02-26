"use client"

import { usePathname } from "next/navigation"
import Layout from './Layout'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname(); // Récupère le chemin actuel

    const isDashboard = pathname.startsWith('/admin'); // Vérifie si c'est le dashboard

    return isDashboard ? <>{children}</> : <Layout>{children}</Layout>;
}