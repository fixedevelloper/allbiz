'use client';

import React, {useEffect, useState} from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import BottomNav from "@/app/components/BottomNav";
import axiosServices from "../../../lib/axios";
import PhoneInput from "../../../components/PhoneInput";
import {Country} from "../../../types/types";


interface Operator {
    id: number;
    name: string;
}

interface WithdrawAccount {
    id: number;
    name: string;
    phone: string;
    operator: Operator;
}

// ... imports et interfaces inchangés

export default function NewWithdraw() {
    const { data: session } = useSession();
    const router = useRouter();
    const [countries, setCountries] = useState<Country[]>([]);
    const [accounts, setAccounts] = useState<WithdrawAccount[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
    const [newAccountName, setNewAccountName] = useState("");
    const [newAccountPhone, setNewAccountPhone] = useState("");
    const [newAccountOperatorId, setNewAccountOperatorId] = useState<number | null>(null);
    const [operators, setOperators] = useState<Operator[]>([]);
    const [countryCode, setCountryCode] = useState("+237");
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [showAddAccountForm, setShowAddAccountForm] = useState(false); // ❌ formulaire caché par défaut

    // 🔹 Redirection si déjà connecté
    useEffect(() => {
        if (!session) {
            router.push('/');
        }
    }, [session, router]);

    // Affichage pendant que la redirection n'a pas encore eu lieu
    if (!session) return null;

    const fullPhone = `${countryCode}${newAccountPhone.replace(/\s+/g, "")}`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosServices.get("/api/countries");
                setCountries(res.data.data ?? res.data);
                const accRes = await axiosServices.get("/api/withdraw-accounts");
                setAccounts(accRes.data.data ?? []);
                const opsRes = await axiosServices.get("/api/operators");
                setOperators(opsRes.data.data ?? []);
                const balanceRes = await axiosServices.get("/api/user/balance");
                setBalance(balanceRes.data.balance ?? 0);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddAccount = async () => {
        if (!newAccountName || !newAccountPhone || !newAccountOperatorId) return;
        try {
            const res = await axiosServices.post("/api/withdraw-accounts", {
                name: newAccountName,
                phone: newAccountPhone,
                operator_id: newAccountOperatorId,
            });
            setSelectedAccount(res.data.data.id);
            setNewAccountName("");
            setNewAccountPhone("");
            setNewAccountOperatorId(null);
            setShowAddAccountForm(false); // cacher le formulaire après ajout
            const accRes = await axiosServices.get("/api/withdraw-accounts");
            setAccounts(accRes.data.data ?? []);
        } catch (err) {
            alert("Erreur lors de l'ajout du compte");
        }
    };

    const handleWithdraw = async () => {
        if (!selectedAccount || amount <= 0 || amount > balance) return;
        setProcessing(true);
        try {
            await axiosServices.post("/api/withdraws", {
                withdraw_account_id: selectedAccount,
                amount,
            });
            const balanceRes = await axiosServices.get("/api/user/balance");
            setBalance(balanceRes.data.balance ?? 0);
            alert("Retrait demandé avec succès !");
            setAmount(0);
        } catch (err) {
            alert("Erreur lors du retrait");
        } finally {
            setProcessing(false);
        }
    };

    const netAmount = amount * 0.85;

    return (
        <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
            <Header />
            <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800">💸 Nouveau Retrait</h2>
            </div>

            <div className="flex justify-center px-4 mt-6">
                <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4">
                    {loading ? (
                        <p className="text-center text-gray-500 animate-pulse">Chargement...</p>
                    ) : (
                        <>
                            {/* Solde disponible */}
                            <div className="bg-gray-50 p-3 rounded-lg shadow-sm text-center">
                                <p className="text-gray-500 text-sm">Solde disponible</p>
                                <p className="font-bold text-2xl text-[#014d74]">
                                    {balance.toLocaleString()} FCFA
                                </p>
                            </div>

                            {/* Selection compte avec bouton append */}
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Compte de retrait</label>

                                <div className="flex gap-2">
                                    {/* Select stylé */}
                                    <div className="relative flex-1">
                                        <select
                                            className="w-full border rounded-xl bg-white px-4 py-3 pr-16 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition"
                                            value={selectedAccount ?? ""}
                                            onChange={(e) => setSelectedAccount(Number(e.target.value))}
                                        >
                                            <option value="">-- Sélectionnez un compte --</option>
                                            {accounts.map((acc) => (
                                                <option key={acc.id} value={acc.id}>
                                                    {acc.name} ({acc.operator?.name ?? "—"}) - {acc.phone}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Icône + flottante */}
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0F766E] hover:bg-[#014d74] text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition transform hover:scale-110"
                                            onClick={() => setShowAddAccountForm(!showAddAccountForm)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Formulaire d'ajout compte */}
                            {showAddAccountForm && (
                                <div className="border-t pt-4 space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        className="w-full border rounded-lg px-3 py-2 text-gray-800"
                                        value={newAccountName}
                                        onChange={(e) => setNewAccountName(e.target.value)}
                                    />
                                    <PhoneInput
                                        countries={countries}
                                        value={newAccountPhone}
                                        countryCode={countryCode}
                                        onChange={setNewAccountPhone}
                                        onCountryChange={setCountryCode}
                                    />
{/*                                    <input
                                        type="text"
                                        placeholder="Téléphone"
                                        className="w-full border rounded-lg px-3 py-2 text-gray-800"
                                        value={newAccountPhone}
                                        onChange={(e) => setNewAccountPhone(e.target.value)}
                                    />*/}
                                    <select
                                        className="w-full border rounded-lg px-3 py-2 text-gray-800"
                                        value={newAccountOperatorId ?? ""}
                                        onChange={(e) => setNewAccountOperatorId(Number(e.target.value))}
                                    >
                                        <option value="">Sélectionner un opérateur</option>
                                        {operators.map((op) => (
                                            <option key={op.id} value={op.id}>
                                                {op.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="w-full bg-[#0F766E] hover:bg-[#014d74] text-white rounded-lg py-2"
                                        onClick={handleAddAccount}
                                    >
                                        Ajouter le compte
                                    </button>
                                </div>
                            )}

                            {/* Montant */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Montant à retirer
                                </label>
                                <input
                                    type="number"
                                    className="w-full border rounded-lg px-3 py-2 text-gray-800"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    max={balance}
                                />
                                <p className="text-gray-500 text-sm mt-1">
                                    Montant net après 15% de frais :{" "}
                                    <span className="font-bold text-[#014d74]">{netAmount.toLocaleString()} FCFA</span>
                                </p>
                            </div>

                            {/* Bouton Retirer */}
                            <button
                                className="w-full bg-[#0F766E] hover:bg-[#014d74] text-white rounded-lg py-2 mt-4"
                                onClick={handleWithdraw}
                                disabled={processing || !selectedAccount || amount <= 0 || amount > balance}
                            >
                                {processing ? "Traitement..." : "💸 Retirer"}
                            </button>
                        </>
                    )}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}


