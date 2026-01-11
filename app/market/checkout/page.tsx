'use client';
import React, {useEffect, useState} from 'react';
import Header from "../../components/Header";
import BottomMaket from "../../components/BottomMaket";
import {useCart} from "../../context/CartContext";
import axiosServices from "../../lib/axios";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Country, Operator} from "../../types/types";
import {enqueueSnackbar} from "notistack";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, total, clearCart } = useCart();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const [operators, setOperators] = useState<Operator[]>([]);
    const [platform, setPlatform] = useState<Operator | null>(null);
    const [selectcountry, setSelectcountry] = useState<Country | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
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
    const handleCheckout = async () => {
        if (!name || !address) {
            enqueueSnackbar('Veuillez remplir tous les champs', { variant: "error" });
            return;
        }
        setLoading(true);

        // 🔹 Ici tu peux appeler ton API Laravel pour créer la commande
        try {
            const payload = {
                customer_name: name,
                customer_phone: phone,
                customer_address: address,
                operator_id:platform?.id,
                items,
                total,
            };
            console.log('Envoyer la commande au serveur:', payload);

            try {
                const response = await axiosServices.post("/api/orders", payload);

                const data = response.data; // ✅ Correction ici

                if (data.referenceId) {
                    localStorage.setItem("referenceId", data.referenceId);
                    router.push("/checkout/waiting-pay");
                } else {
                    enqueueSnackbar("Aucune référence de paiement reçue.", { variant: "error" });
                    throw new Error("Aucune référence de paiement reçue.");
                }
            } catch (err: any) {
                enqueueSnackbar("Erreur de paiement:"+ err.response?.data || err.message, { variant: "error" });
                console.error("Erreur de paiement:", err.response?.data || err.message);
                setError(err.response?.data?.error || err.message || "Erreur inattendue.");
                setStatus("FAILED");
            } finally {
                setLoading(false);
            }
            enqueueSnackbar('Commande passée avec succès !', { variant: "error" });
            alert('Commande passée avec succès !');
            clearCart();
        } catch (err) {
            console.error(err);
            alert('Erreur lors de la commande');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0)
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Header />

                {/* Contenu */}
                <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
                    {/* Icône */}
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 mb-6">
                        <svg
                            className="w-12 h-12 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                            />
                        </svg>
                    </div>

                    {/* Texte */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Votre panier est vide
                    </h2>

                    <p className="text-gray-500 max-w-sm mb-6">
                        Parcourez notre marketplace et ajoutez des produits à votre panier
                        pour commencer vos achats.
                    </p>

                    {/* Bouton */}
                    <button
                        onClick={() => router.push("/market")}
                        className="bg-[#014d74] hover:bg-[#0F766E] text-white px-6 py-3 rounded-full font-medium shadow transition"
                    >
                        Découvrir les produits
                    </button>
                </div>

                <BottomMaket />
            </div>

        );

    return (
        <div className="min-h-screen bg-gray-100 pb-32 flex flex-col">
            <Header />

            {/* Hero */}
            <div className="relative">
                <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-blue-700">💳 Checkout</h2>
                </div>
            </div>

            {/* Contenu */}
            <div className="max-w-3xl mx-auto mt-6 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Résumé du panier */}
                <div className="bg-white p-6 rounded-2xl shadow space-y-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">Résumé du panier</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {items.map(item => (
                            <div key={item.product_id} className="flex justify-between items-center text-gray-800">
                                <span>{item.name} x {item.quantity}</span>
                                <span className="font-semibold">
                  {(item.promotion_price ?? item.price) * item.quantity} FCFA
                </span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-gray-800 text-lg">
                        <span>Total</span>
                        <span>{total.toLocaleString()} FCFA</span>
                    </div>
                </div>
                <h3 className='text-lg font-semibold text-gray-700 mb-2'>Sélectionnez votre pays</h3>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 mb-6">
                    {countries.map(country => (
                        <button
                            key={country.id}
                            onClick={() => {
                                setSelectcountry(country)
                                setOperators(country.operators)
                            }}
                            className={`flex flex-col items-center justify-center rounded-2xl border-2 p-2 transition-all duration-200 
              ${selectcountry?.name === country.name
                                ? "border-[#014d74] shadow-xl scale-105 bg-[#E0F7FA]"
                                : "border-gray-300 hover:border-[#014d74]/70 hover:scale-105 bg-white"
                            }`}
                        >
                            <Image
                                loader={({ src }) => `${process.env.NEXT_PUBLIC_API_URL}${src}`}
                                src={country.image_url}
                                alt={`${country.name}`}
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                            <span className={`mt-2 text-sm font-semibold ${selectcountry?.name === country.name ? "text-[#014d74]" : "text-gray-600"}`}>
              {country.name}
            </span>
                        </button>
                    ))}
                </div>
                <h3 className='text-lg font-semibold text-gray-700 mb-2'>Sélectionnez votre opérateur</h3>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 mb-6">
                    {operators.map(operator => (
                        <button
                            key={operator.name}
                            onClick={() => setPlatform(operator)}
                            className={`flex flex-col items-center justify-center rounded-2xl border-2 p-2 transition-all duration-200 
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
                {/* Formulaire info client */}
                <div className="bg-white p-6 rounded-2xl shadow space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Informations de livraison</h3>
                    <input
                        type="text"
                        placeholder="Nom complet"
                        className="w-full border rounded px-3 py-2 text-gray-700"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Adresse email"
                        className="w-full border rounded px-3 py-2 text-gray-700"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <button
                        className={`w-full py-3 rounded-2xl text-white font-semibold transition ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                        }`}
                        disabled={loading}
                        onClick={handleCheckout}
                    >
                        {loading ? 'Traitement...' : 'Confirmer la commande'}
                    </button>
                </div>


            </div>

            <BottomMaket />
        </div>
    );
}
