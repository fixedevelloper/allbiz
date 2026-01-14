"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

export default function WaitingPaiement() {
  const router = useRouter();
  const referenceId =
      typeof window !== "undefined" ? localStorage.getItem("referenceId") : null;

  const [statusMessage, setStatusMessage] = useState(
      "⏳ Validation du paiement en cours..."
  );
  const [attempts, setAttempts] = useState(0);

  const CHECK_INTERVAL = 5000; // 5 secondes
  const MAX_ATTEMPTS = 12; // 1 minute

  useEffect(() => {
    if (!referenceId) {
      router.push("/");
      return;
    }

    let isCancelled = false;
    const controller = new AbortController();
    let intervalId: NodeJS.Timeout;

    const checkPaymentStatus = async () => {
      try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/softpay/check/${referenceId}`,
            { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Erreur réseau ou serveur");

        const data = await res.json();
        if (isCancelled) return;

        const status = data.status?.toUpperCase(); // pour gérer success/failed/pending

        if (status === "SUCCESS") {
          clearInterval(intervalId);
          setStatusMessage("✅ Paiement confirmé !");
          setTimeout(() => router.push("/checkout/success"), 1000);
          return;
        }

        if (status === "FAILED") {
          clearInterval(intervalId);
          setStatusMessage("❌ Paiement échoué !");
          setTimeout(() => router.push("/checkout/echec-paiement"), 1000);
          return;
        }

        // Si toujours pending
        setStatusMessage("⏳ Paiement en cours...");

        setAttempts((prev) => {
          const next = prev + 1;
          if (next >= MAX_ATTEMPTS) {
            clearInterval(intervalId);
            setStatusMessage("❌ Délai de confirmation dépassé.");
            setTimeout(() => router.push("/checkout/echec-paiement"), 1500);
          }
          return next;
        });
      } catch (error) {
        console.error("⚠️ Erreur lors de la vérification :", error);
        setStatusMessage("⚠️ Erreur de connexion. Nouvelle tentative...");
      }
    };

    intervalId = setInterval(checkPaymentStatus, CHECK_INTERVAL);
    checkPaymentStatus(); // Premier appel immédiat

    return () => {
      isCancelled = true;
      controller.abort();
      clearInterval(intervalId);
    };
  }, [referenceId]);

  return (
      <div className="min-h-screen bg-gray-100 pb-20 flex flex-col">
        <Header />
        <div className="bg-[#014d74] h-24" />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-5">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#014d74] border-solid"></div>
          <h2 className="mt-8 text-xl font-semibold text-gray-700">{statusMessage}</h2>
          <p className="mt-2 text-gray-500 text-sm text-center">
            Veuillez patienter pendant la confirmation de votre transaction mobile.
          </p>
          <p className="mt-2 text-gray-400 text-xs">Tentative {attempts}/{MAX_ATTEMPTS}</p>
        </div>
      </div>
  );
}

