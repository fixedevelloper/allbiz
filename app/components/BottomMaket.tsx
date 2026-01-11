'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookXIcon, ListOrderedIcon, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import {useCart} from "../context/CartContext";
import React from "react";

interface NavItem {
  name: string;
  path: string;
  icon: any;
  role: string;
}

export default function BottomMaket() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { items } = useCart();

  // 🔢 Quantité totale du panier
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems: NavItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: Home, role: "all" },
    { name: "Products", path: "/market", icon: BookXIcon, role: "all" },
    { name: "Mes commandes", path: "/market/my_orders", icon: ListOrderedIcon, role: "all" },
    { name: "Panier", path: "/market/cart", icon: ShoppingCart, role: "all" },
  ];

  return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm flex justify-around py-2 z-50">
        {navItems.map(({ name, path, icon: Icon }) => {
          const active = pathname === path;
          const isCart = path === "/market/cart";

          return (
              <Link key={name} href={path} className="flex flex-col items-center relative">

                {/* Icône */}
                <Icon
                    className={`w-5 h-5 mb-1 transition-colors ${
                        active ? "text-[#014d74]" : "text-gray-500"
                    }`}
                />

                {/* 🔴 Badge Panier */}
                {isCart && cartCount > 0 && (
                    <span className="absolute -top-3 -right-3 min-w-[18px] h-[18px]
flex items-center justify-center bg-red-500 text-white text-[10px]
rounded-full font-bold">
  {cartCount}
</span>


                )}

                {/* Texte */}
                <span
                    className={`text-xs transition-colors ${
                        active ? "text-[#014d74] font-semibold" : "text-gray-600"
                    }`}
                >
              {name}
            </span>
              </Link>
          );
        })}
      </div>
  );
}


