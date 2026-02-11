'use client';

import React, {useEffect, useState} from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@headlessui/react';
import Link from 'next/link';
import Image from "next/image";
import logo from '../../../public/logo.png'
import PhoneInput from "../../components/PhoneInput";
import PasswordInput from "../../components/PasswordInput";
import {Country} from "../../types/types";
import axiosServices from "../../lib/axios";
import {useSnackbar} from "notistack";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryCode, setCountryCode] = useState("+229");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Redirection si déjà connecté
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  // ✅ Chargement des pays
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axiosServices.get("/api/countries");
        setCountries(res.data.data ?? res.data);
      } catch {
        enqueueSnackbar("Impossible de charger les pays", { variant: "error" });
        setError("Impossible de charger les pays");
      }
    };

    fetchCountries();
  }, []);

  // ⏳ RENDER SAFE (APRÈS TOUS LES HOOKS)
  if (status === "loading") {
    return null;
  }

  // ✅ Soumission formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      enqueueSnackbar("Veuillez remplir tous les champs", { variant: "error" });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const fullPhone = `${countryCode}${username}`;

      const res = await signIn('credentials', {
        redirect: false,
        phone: fullPhone,
        password,
      });

      if (res?.error) {
        enqueueSnackbar("Identifiants incorrects", { variant: "error" });
        setError('Identifiants incorrects');
      } else {
        router.push('/dashboard');
      }
    } catch {
      enqueueSnackbar("Une erreur est survenue", { variant: "error" });
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };
  const whatsappLink = () => {
    const fullPhone = `${countryCode}${username}`.replace(/\s+/g, '');
    const message = encodeURIComponent(
        `Bonjour, j’ai oublié mon mot de passe.\nMon numéro est : ${fullPhone}`
    );

    // Numéro WhatsApp du support (SANS +)
    const supportPhone = "22941784287";

    return `https://wa.me/${supportPhone}?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20 flex flex-col">

      <div className="bg-[#0F766E] h-24" />

      <div className="flex justify-center px-4 mt-2">
        <div className="bg-white shadow-lg mt-8 rounded-2xl p-6 w-full max-w-sm">
          <div className="flex flex-col items-center gap-2 mb-4">
            <Link href="/">
              <Image src={logo} alt="Logo" width={100} height={20} />
            </Link>
{/*            <span className="text-xs text-gray-500">Plateforme sécurisée</span>*/}
            <span className="text-sm text-center text-gray-800 font-bold mt-4"> A PARTIR DE 1000fcfa SEULEMENT POUR UN ACCÈS À VIE</span>
          </div>


          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Connexion
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <PhoneInput
                countries={countries}
                value={username}
                countryCode={countryCode}
                onChange={setUsername}
                onCountryChange={setCountryCode}
            />


            <PasswordInput
                label="Mot de passe"
                value={password}
                onChange={setPassword}
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
            />


            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div className="text-right">
              <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#014d74] hover:underline"
                  onClick={(e) => {
                    if (!username) {
                      e.preventDefault();
                      enqueueSnackbar("Veuillez entrer votre numéro", { variant: "warning" });
                    }
                  }}
              >
                Mot de passe oublié ?
              </a>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-medium transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#115E59] hover:bg-[#0F766E]'
              }`}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
            <div className="text-center text-sm text-gray-700 mt-4">
    <span className='text-[#014d74] hover:text-[#013d5a]'>Vous n’avez pas encore de compte ?{" "}</span>  
      <Link
        href="/auth/register"
        className="text-[#014d74] font-semibold hover:underline hover:text-[#013d5a] transition-colors"
      >
        S’inscrire
      </Link>
    </div>
          </form>
        </div>
      </div>
    </div>
  );
}
