'use client';

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/app/components/BottomNav";
import Header from "@/app/components/Header";
import axiosServices from "../lib/axios";
import {Country, Formule, Operator, Order} from "../types/types";

export default function Checkout() {
  const router = useRouter();
  const { data: session } = useSession();
  const [countries, setCountries] = useState<Country[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [platform, setPlatform] = useState<Operator | null>(null);
  const [selectcountry, setSelectcountry] = useState<Country | null>(null);

  const [phone, setPhone] = useState(session?.user?.phone || "");
  const [amount, setAmount] = useState<number>(0);
  const [formule, setFormule] = useState<Formule | null>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectItem, setSelectItem] = useState<any>(null);

  // 🔹 Charger l’article sélectionné depuis sessionStorage
  useEffect(() => {
    const storedFormule = sessionStorage.getItem("formule_data");

    if (storedFormule) {
      const parsed: Formule = JSON.parse(storedFormule);
      setFormule(parsed);
    }
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axiosServices.get("/api/countries");
        setCountries(res.data.data ?? res.data);
      } catch {
        setError("Impossible de charger les achats");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);
  // 🔹 Envoi du paiement
const handleValidate = async () => {
  if (!phone || phone.length < 9) {
    setError("Veuillez entrer un numéro de téléphone valide.");
    return;
  }

  setLoading(true);
  setError(null);
  setStatus("PENDING");

  try {
    const response = await axiosServices.post("/api/investments", {
      user_id: session?.user?.id,
      operator_id: platform?.id, // correspond à 'operator' côté backend
      phone,
      country_id:selectcountry?.id,
      amount:formule?.price
    });

    const data = response.data; // ✅ Correction ici

    if (data.referenceId) {
      localStorage.setItem("referenceId", data.referenceId);
      router.push("/checkout/waiting-pay");
    } else {
      throw new Error("Aucune référence de paiement reçue.");
    }
  } catch (err: any) {
    console.error("Erreur de paiement:", err.response?.data || err.message);
    setError(err.response?.data?.error || err.message || "Erreur inattendue.");
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

            {/* Sélection du pays */}
            <h3 className='text-lg font-semibold text-gray-700 mb-2'>Sélectionnez votre pays</h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 mb-6">
              {countries.map(country => (
                  <button
                      key={country.id}
                      onClick={() => {
                        setSelectcountry(country)
                        setOperators(country.operators)
                      }}
                      className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 transition-all duration-200 
              ${selectcountry?.name === country.name
                          ? "border-[#014d74] shadow-xl scale-105 bg-[#E0F7FA]"
                          : "border-gray-300 hover:border-[#014d74]/70 hover:scale-105 bg-white"
                      }`}
                  >
                    <Image
                        loader={({ src }) => `${process.env.NEXT_PUBLIC_API_URL}${src}`}
                        src={country.image_url}
                        alt={`${country.name}`}
                        width={70}
                        height={70}
                        className="object-contain"
                    />
                    <span className={`mt-2 text-sm font-semibold ${selectcountry?.name === country.name ? "text-[#014d74]" : "text-gray-600"}`}>
              {country.name}
            </span>
                  </button>
              ))}
            </div>

            {/* Formule sélectionnée */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm mb-6 border-l-4 border-[#014d74]">
              <div className="bg-[#014d74]/10 p-2 rounded-full text-lg">🛍️</div>
              {formule ? (
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Formule sélectionnée</p>
                    <h3 className="font-bold text-gray-800 text-lg">{formule.name}</h3>
                    <p className="text-sm text-gray-500">{formule.description}</p>
                    <div className="mt-1 text-[#014d74] font-bold text-lg">{formule.price.toLocaleString()} FCFA</div>
                  </div>
              ) : (
                  <p className="text-gray-400 text-sm">Chargement de la formule...</p>
              )}
            </div>

            {/* Sélection de l’opérateur */}
            <h3 className='text-lg font-semibold text-gray-700 mb-2'>Sélectionnez votre opérateur</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
              {operators.map(operator => (
                  <button
                      key={operator.name}
                      onClick={() => setPlatform(operator)}
                      className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 transition-all duration-200 
              ${platform?.name === operator.name
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
                    <span className={`mt-2 text-sm font-semibold ${platform?.name === operator.name ? "text-[#014d74]" : "text-gray-600"}`}>
              {operator.name}
            </span>
                  </button>
              ))}
            </div>

            {/* Téléphone */}
            <div className="mb-6">
              <label htmlFor="phone" className="block font-medium text-gray-700 mb-1">
                Numéro de paiement
              </label>
              <input
                  id="phone"
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#014d74] focus:outline-none transition"
                  placeholder="+2376XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Montant */}
            <div className="mb-6 text-center">
              <label className="font-medium text-gray-700 block mb-1">
                Montant à payer
              </label>
              <div className="text-3xl font-bold text-[#014d74]">{formule?.price?.toLocaleString()} <span className="text-sm">FCFA</span></div>
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
                  disabled={loading}
                  className={`w-full rounded-xl py-3 font-semibold text-white transition-colors ${
                      loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#014d74] hover:bg-[#01385a]"
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
