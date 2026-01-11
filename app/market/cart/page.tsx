'use client';

import {useCart} from "../../context/CartContext";
import React from "react";
import Header from "../../components/Header";
import BottomMaket from "../../components/BottomMaket";
import Link from "next/link";
import {useRouter} from "next/navigation";


export default function CartPage() {
    const { items, total, updateItem, removeItem, clearCart } = useCart();
    const router = useRouter();
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
            {/* Header */}
            <Header />

            {/* Hero / Titre */}
            <div className="relative">
                <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-blue-500">🛒 Mon Panier</h2>
                </div>
            </div>

            {/* Liste des produits */}
            <div className="max-w-xl mx-auto mt-6 space-y-4 px-4">
                {items.map(item => (
                    <div key={item.product_id} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            {item.image && (
                                <img
                                    src={process.env.NEXT_PUBLIC_API_URL+item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                                />
                            )}
                            <div>
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-gray-600 text-sm">
                                    Prix:{' '}
                                    <span className="font-bold text-green-700">
                    {(item.promotion_price ?? item.price).toLocaleString()} FCFA
                  </span>
                                </p>
                                {item.promotion_price && (
                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full mt-1 inline-block">
                    Promo
                  </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <input
                                type="number"
                                className="w-16 border rounded text-center text-gray-700 py-1"
                                value={item.quantity}
                                min={1}
                                onChange={e => updateItem(item.product_id, Number(e.target.value))}
                            />
                            <button
                                className="text-red-500 font-bold hover:text-red-700 transition"
                                onClick={() => removeItem(item.product_id)}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}

                {/* Total */}
                <div className="flex justify-between items-center p-4 bg-white rounded-2xl shadow font-bold text-gray-800 text-lg">
                    <span>Total</span>
                    <span>{total.toLocaleString()} FCFA</span>
                </div>

                {/* Boutons d’action */}
                <div className="space-y-2">
                    <button
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition"
                        onClick={clearCart}
                    >
                        Vider le panier
                    </button>
                    <Link href='/market/checkout'>
                        <button
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold transition"
                        >
                            Passer au paiement
                        </button>
                    </Link>

                </div>
            </div>

            {/* Footer Market */}
            <BottomMaket />
        </div>
    );
}

