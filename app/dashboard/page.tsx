'use client';

import React, {useEffect, useState} from 'react';
import { useSession, signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";
import logo from '../../public/logo.svg'
import BottomNav from "../components/BottomNav";
import HomeGrid from "../components/HomeCard";
import axiosServices from "../lib/axios";


export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

  // ✅ Si déjà connecté
  if (!session) {
    router.push('/');
    return null;
  }
    useEffect(() => {
        const fetchData = async () => {
            try {
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

  return (
    <div className="min-h-screen bg-gray-100 pb-20 flex flex-col">
      <Header />
        <div className="bg-gray-100 h-28 rounded-b-3xl shadow-md flex items-center justify-center">
            <h2 className="text-2xl font-bold text-blue-700">
             Dashboard
            </h2>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg shadow-sm text-center">
            <p className="text-gray-500 text-xl">Balance</p>
            <p className="font-bold text-2xl text-[#014d74]">
                {balance.toLocaleString()} FCFA
            </p>
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
