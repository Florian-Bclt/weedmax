"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import SpinnerButtons from "../components/SpinnerButtons/SpinnerButtons";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    birthDate: "",
    phoneNumber: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    email: "",
    password: "",
    role: "CLIENT",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Vérification que l'utilisateur est majeur
    const calculateAge = (dateString: string) => {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    const age = calculateAge(form.birthDate);
    if (age < 18) {
      setError("Vous devez avoir au moins 18 ans pour vous inscrire.");
      setLoading(false);
      return;
    }

    // Envoi des données
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Une erreur est survenue.");
      setLoading(false);
      return;
    }

    setSuccess("Votre compte a été créé avec succès.");
    setTimeout(() => router.push("/login"), 2000);
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
            <h2 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-main">Inscription</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              required
              value={form.firstName}
              onChange={handleChange}
              className={inputStyle}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Nom"
              required
              value={form.lastName}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <input
            type="text"
            name="companyName"
            placeholder="Nom de l'entreprise (optionnel)"
            value={form.companyName}
            onChange={handleChange}
            className={inputStyle}
          />

          <input
            type="date"
            name="birthDate"
            required
            value={form.birthDate}
            onChange={handleChange}
            className={inputStyle}
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Numéro de téléphone"
            required
            value={form.phoneNumber}
            onChange={handleChange}
            className={inputStyle}
          />

          <input
            type="text"
            name="address"
            placeholder="Adresse"
            required
            value={form.address}
            onChange={handleChange}
            className={inputStyle}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="Ville"
              required
              value={form.city}
              onChange={handleChange}
              className={inputStyle}
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Code Postal"
              required
              value={form.zipCode}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <input
            type="text"
            name="country"
            placeholder="Pays"
            required
            value={form.country}
            onChange={handleChange}
            className={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            value={form.password}
            onChange={handleChange}
            className={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-main hover:scale-105 transition text-white font-bold py-3 rounded-xl shadow-lg"
          >
            {loading ? <SpinnerButtons /> : "S'inscrire"}
          </button>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-center font-medium"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 text-center font-medium"
            >
              {success}
            </motion.p>
          )}
        </form>

        <p className="text-center mt-6">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-pink-400 hover:text-pink-500 font-semibold">
            Se connecter
          </Link>
        </p>
        </motion.div>
    </div>
  );
}
