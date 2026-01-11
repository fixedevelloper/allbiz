'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '../../components/Header';
import { useCart } from '../../context/CartContext';
import BottomMaket from "../../components/BottomMaket";
import axiosServices from "../../lib/axios";
import {Product} from "../../types/types";



export default function ProductDetailPage() {
    const { data: session, status } = useSession();
    const { slug } = useParams();
    const router = useRouter();
    const { addItem } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (status === 'unauthenticated') router.replace('/');
    }, [status, router]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!slug) return;
                const res = await axiosServices.get(`/api/products/${slug}`);
                setProduct(res.data.data ?? res.data);
            } catch (err) {
                console.error(err);
                setError('Impossible de charger le produit');
            } finally {
                setLoading(false);
            }
        };
        if (status === 'authenticated') fetchProduct();
    }, [status, slug]);

    if (status === 'loading' || loading) return <p className="text-center mt-10">Chargement...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!product) return <p className="text-center mt-10">Produit introuvable</p>;

    const mainImage = product.images?.[0]?.src ?? '/placeholder.png';

    const priceDisplay = product.is_promotion && product.promotion_price
        ? product.promotion_price
        : product.price;

    return (
        <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
            <Header />

            <div className="relative">
                <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
                    <h2 className="text-lg font-bold text-blue-800">{product.name}</h2>
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-6 px-4 space-y-6">
                {/* Images */}
                <div className="bg-white rounded-2xl shadow p-4 flex justify-center">
                    <img src={process.env.NEXT_PUBLIC_API_URL+mainImage} alt={product.name} className="object-cover rounded max-h-96" />
                </div>

                {/* Info produit */}
                <div className="bg-white rounded-2xl shadow p-4 space-y-3">
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                    {product.category && (
                        <p className="text-sm text-gray-500">Catégorie: {product.category.name}</p>
                    )}
                    <div className="flex items-center gap-3 text-gray-800">
                        {product.is_promotion && product.promotion_price ? (
                            <>
                <span className="text-red-500 font-bold text-lg">
                  {product.promotion_price.toLocaleString()} FCFA
                </span>
                                <span className="line-through text-gray-400">
                  {product.price.toLocaleString()} FCFA
                </span>
                            </>
                        ) : (
                            <span className="font-bold text-lg">{product.price.toLocaleString()} FCFA</span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 mt-3 text-gray-800">
                        <span>Quantité :</span>
                        <input
                            type="number"
                            className="w-20 border rounded text-center"
                            min={1}
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                        />
                    </div>

                    <button
                        onClick={() =>
                            addItem(
                                {
                                    product_id: product.id,
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    promotion_price: product.promotion_price,
                                    image: mainImage,
                                },
                                quantity
                            )
                        }
                        className="w-full bg-[#014d74] hover:bg-[#0F766E] text-white py-2 rounded mt-4"
                    >
                        Ajouter au panier
                    </button>
                </div>

                {/* DESCRIPTION */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold mb-2">📄 Description</h2>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {product.description || 'Aucune description disponible.'}
                    </p>
                </div>

                {/* HOW IT WORKS */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold mb-2">⚙️ Comment ça marche</h2>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {product.how_it_works || 'Instructions non disponibles.'}
                    </p>
                </div>
                {/* Galerie */}
                {product.images && product.images.length > 1 && (
                    <div className="bg-white rounded-2xl shadow p-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Autres images</h4>
                        <div className="flex gap-2 overflow-x-auto">
                            {product.images.map(img => (
                                <img
                                    key={img.id}
                                    src={img.src}
                                    alt={product?.name}
                                    className="w-24 h-24 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <BottomMaket />
        </div>
    );
}
