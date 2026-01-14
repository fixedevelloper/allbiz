'use client';

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/app/components/BottomNav";
import Header from "@/app/components/Header";
import axiosServices from "../lib/axios";
import {Country, Formule, Operator} from "../types/types";

export default function Checkout() {
  const router = useRouter();
  const { data: session } = useSession();
  const [countries, setCountries] = useState<Country[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [platform, setPlatform] = useState<Operator | null>(null);
  const [selectCountry, setSelectCountry] = useState<Country | null>(null);

  const [phone, setPhone] = useState(session?.user?.phone || "");
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [formule, setFormule] = useState<Formule | null>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Charger la formule depuis sessionStorage
  useEffect(() => {
    const storedFormule = sessionStorage.getItem("formule_data");
    if (storedFormule) {
      setFormule(JSON.parse(storedFormule));
    }
  }, []);

  // 🔹 Charger les pays
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axiosServices.get("/api/countries");
        setCountries(res.data.data ?? res.data);
      } catch {
        setError("Impossible de charger les pays.");
      }
    };
    fetchCountries();
  }, []);

  // 🔹 Valider le paiement
  const handleValidate = async () => {
    if (!name || !email || !phone) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (phone.length < 9) {
      setError("Veuillez entrer un numéro de téléphone valide.");
      return;
    }

    if (!selectCountry || !platform || !formule) {
      setError("Veuillez sélectionner un pays, un opérateur et une formule.");
      return;
    }

    setLoading(true);
    setError(null);
    setStatus("PENDING");

    try {
      const response = await axiosServices.post("/api/investments", {
        user_id: session?.user?.id,
        operator_id: platform.id,
        country_id: selectCountry.id,
        amount: formule.price,
        meta: {
          name,
          email
        },
        phone
      });

      const data = response.data;

      if (data.referenceId && data.payment_url) {
        localStorage.setItem("referenceId", data.referenceId);

        // 🔗 Ouvrir le paiement dans un nouvel onglet
        window.open(data.payment_url, "_blank");
        router.push("/checkout/waiting-pay");
      } else {
        throw new Error("Aucune référence de paiement reçue.");
      }
    } catch (err: any) {
      console.error("Erreur de paiement:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || "Erreur inattendue.");
      setStatus("FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
        <Header />

        <main className="flex-1 mt-4 px-4 sm:px-6 md:px-8 flex justify-center">
          <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
              💳 Paiement de la formule
            </h2>

            {/* Nom et Email */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#014d74] focus:outline-none transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom complet"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1">Email</label>
              <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#014d74] focus:outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
              />
            </div>

            {/* Téléphone */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-1">
                Numéro de paiement
              </label>
              <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#014d74] focus:outline-none transition"
                  placeholder="+2376XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Sélection du pays */}
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Sélectionnez votre pays
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 mb-6">
              {countries.map(country => (
                  <button
                      key={country.id}
                      onClick={() => {
                        setSelectCountry(country);
                        setOperators(country.operators ?? []);
                        setPlatform(null);
                      }}
                      className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 transition-all duration-200 
                  ${selectCountry?.id === country.id
                          ? "border-[#014d74] shadow-xl scale-105 bg-[#E0F7FA]"
                          : "border-gray-300 hover:border-[#014d74]/70 hover:scale-105 bg-white"
                      }`}
                  >
                    <Image
                        loader={({ src }) => `${process.env.NEXT_PUBLIC_API_URL}${src}`}
                        src={country.image_url}
                        alt={country?.name || "Drapeau du pays"}
                        width={70}
                        height={70}
                        className="object-contain"
                    />
                    <span className={`mt-2 text-sm font-semibold ${selectCountry?.id === country.id ? "text-[#014d74]" : "text-gray-600"}`}>
                  {country.name}
                </span>
                  </button>
              ))}
            </div>

            {/* Opérateur */}
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Sélectionnez votre opérateur
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
              {operators.map(operator => (
                  <button
                      key={operator.id}
                      onClick={() => setPlatform(operator)}
                      className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 transition-all duration-200 
                  ${platform?.id === operator.id
                          ? "border-[#014d74] shadow-xl scale-105 bg-[#E0F7FA]"
                          : "border-gray-300 hover:border-[#014d74]/70 hover:scale-105 bg-white"
                      }`}
                  >
                    <Image
                        loader={({ src }) => `${process.env.NEXT_PUBLIC_API_URL}${src}`}
                        src={operator.image_url}
                        alt={operator.name}
                        width={70}
                        height={70}
                        className="object-contain"
                    />
                    <span className={`mt-2 text-sm font-semibold ${platform?.id === operator.id ? "text-[#014d74]" : "text-gray-600"}`}>
                  {operator.name}
                </span>
                  </button>
              ))}
            </div>

            {/* Montant */}
            <div className="mb-6 text-center">
              <label className="font-medium text-gray-700 block mb-1">
                Montant à payer
              </label>
              <div className="text-3xl font-bold text-[#014d74]">{formule?.price?.toLocaleString() ?? 0} <span className="text-sm">FCFA</span></div>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full rounded-xl bg-gray-400 py-3 font-semibold text-white hover:bg-gray-500 transition"
              >
                Annuler
              </button>
              <button
                  type="button"
                  onClick={handleValidate}
                  disabled={loading || !selectCountry || !platform || !formule || !name || !email || !phone}
                  className={`w-full rounded-xl py-3 font-semibold text-white transition-colors ${
                      loading || !selectCountry || !platform || !formule || !name || !email || !phone
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#014d74] hover:bg-[#01385a]"
                  }`}
              >
                {loading ? "Traitement..." : "Valider le paiement"}
              </button>
            </div>

            {/* Statut */}
            <div className="mt-6 text-center">
              {status === "PENDING" && (
                  <div className="text-yellow-600 font-medium animate-pulse">⏳ Paiement en cours...</div>
              )}
              {status === "FAILED" && (
                  <div className="text-red-600 font-medium">❌ Paiement échoué : {error}</div>
              )}
              {error && status !== "FAILED" && (
                  <div className="text-red-600 font-medium">⚠️ {error}</div>
              )}
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
  );
}

