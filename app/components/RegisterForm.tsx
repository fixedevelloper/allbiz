'use client';

import React, {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {signIn} from "next-auth/react";
import PhoneInput from "./PhoneInput";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [countryCode, setCountryCode] = useState("+237");
    const [phone, setPhone] = useState("");
    const [reference, setReference] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // ✅ Récupérer la référence depuis l'URL côté client
    useEffect(() => {
        const ref = searchParams.get("ref");
        if (ref) setReference(ref);
    }, [searchParams]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (!phone || !password || !confirmPassword) {
            setError("Veuillez remplir tous les champs");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            setLoading(false);
            return;
        }

        const fullPhone = `${countryCode}${phone.replace(/\s+/g, "")}`;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({phone: fullPhone, referrer_id: reference, password}),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Erreur lors de l'inscription");
                setLoading(false);
                return;
            }
// 2️⃣ Connexion automatique via NextAuth credentials
            const result = await signIn("credentials", {
                redirect: false, // On gère la redirection nous-mêmes
                phone: fullPhone,
                password,
            });

            if (result?.error) {
                setError(result.error || "Erreur lors de la connexion automatique");
                setLoading(false);
                return;
            }

            // 3️⃣ Redirection après succès
            router.push("/"); // Ou la page principale après login
        } catch (err: any) {
            console.error(err);
            setError("Impossible de se connecter au serveur");
        } finally {
            setLoading(false);
        }
    };
    return(
        <form onSubmit={handleSubmit} className="space-y-4">
            <PhoneInput
                value={phone}
                countryCode={countryCode}
                onChange={setPhone}
                onCountryChange={setCountryCode}
            />

            <PasswordInput
                label="Mot de passe"
                value={password}
                onChange={setPassword}
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
            />

            <PasswordInput
                label="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
            />
            <div className="w-full">
                <label className="block text-sm text-gray-700 mb-1">
                    Reference de parrain
                </label>
                <input
                    type="text"
                    placeholder="8025"
                    value={reference}
                    onChange={e => setReference(e.target.value)}
                    className="w-full border p-2 rounded mb-3 text-gray-800"
                />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg text-white font-medium transition ${
                    loading ? "bg-gray-400 cursor-not-allowed" : 'bg-[#115E59] hover:bg-[#0F766E]'
                }`}
            >
                {loading ? "Inscription..." : "S'inscrire"}
            </button>
        </form>
    )
}
