import { Metadata } from "next";
import React from "react";
import Login from "./auth/signin/page";

export const metadata: Metadata = { title: 'Accueil-Allbiz' }
export default function Home() {
  return (
   <Login/>
  );
}

