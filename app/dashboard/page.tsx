'use client';

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";
import logo from '../../public/logo.svg'
import BottomNav from "../components/BottomNav";
import HomeGrid from "../components/HomeCard";


export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();


  // ✅ Si déjà connecté
  if (!session) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20 flex flex-col">
      <Header />
        <div className="bg-gradient-to-r from-[#014d74] to-[#0F766E] h-28 rounded-b-3xl shadow-md flex items-center justify-center">
            <h2 className="text-2xl font-bold text-blue-700">
             Dashboard
            </h2>
        </div>
      <div className="flex justify-center px-2 mt-2">
        <div className="bg-white shadow-lg mt-8 rounded-2xl p-2 w-full max-w-sm">
            <HomeGrid/>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
