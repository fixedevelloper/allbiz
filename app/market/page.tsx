'use client';

import React, {useEffect, useState} from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import BottomMaket from "@/app/components/BottomMaket";
import {Product} from "../types/types";
import axiosServices from "../lib/axios";
import {useCart} from "../context/CartContext";
import Link from "next/link";

export default function Market() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const { addItem } = useCart();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axiosServices.get("/api/products");
                setProducts(res.data.data ?? res.data);
            } catch {
                setError("Impossible de charger les produits");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (!session) {
        router.push("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
            <Header />

            <div className="relative">
                <div className="bg-white h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-blue-500">🏦 Market</h2>
                </div>
            </div>

            <div className="px-4 mt-6 flex justify-center">
                <div className="w-full max-w-md space-y-6">
                    {loading && <p className="text-gray-500 text-center animate-pulse">Chargement des produits...</p>}
                    {error && <p className="text-red-600 text-center">{error}</p>}
                    {!loading && products.length === 0 && (
                        <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-500">
                            Aucun produit disponible pour le moment
                        </div>
                    )}

                    {products.map(product => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3 border border-gray-100 hover:shadow-lg transition"
                        >
                            {/* HEADER */}
                            <div className="flex justify-between items-start">
                                <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                                    {product.name}
                                </h3>

                                {product.is_promotion && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Promo
                </span>
                                )}
                            </div>

                            {/* IMAGES */}
                            {Array.isArray(product.images) && product.images.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                                    {product.images.map(img => (
                                        <img
                                            key={img.id}
                                            src={`${process.env.NEXT_PUBLIC_API_URL}${img.src}`}
                                            alt={img.name}
                                            className="w-24 h-24 object-cover rounded-xl border"
                                        />
                                    ))}
                                </div>
                            )}

                            {/* PRICE */}
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-[#0F766E] font-bold text-lg">
                                        {(product?.is_promotion
                                                ? product.promotion_price
                                                : product.price
                                        ).toLocaleString()} FCFA
                                    </p>

                                    {product.is_promotion && (
                                        <p className="text-gray-400 line-through text-sm">
                                            {product?.price.toLocaleString()} FCFA
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex gap-2 mt-2">
                                <Link href={`/market/${product?.slug}`} className="flex-1">
                                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-xl text-sm font-medium transition">
                                        Détails
                                    </button>
                                </Link>

                                <button
                                    className="flex-1 bg-[#0F766E] hover:bg-[#014d74] text-white py-2 rounded-xl text-sm font-medium transition"
                                    onClick={() =>
                                        addItem({
                                            id: product.id,
                                            product_id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            promotion_price: product.promotion_price,
                                            image: product.images?.[0]?.src,
                                        })
                                    }
                                >
                                    Ajouter
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <BottomMaket />
        </div>
    );
}

