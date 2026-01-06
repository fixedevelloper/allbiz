import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import BASE_URL from "./constants";

const API = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * INTERCEPTEUR DE RÉPONSE
 */
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                console.warn("Session expirée → déconnexion");

                // 🔐 Déconnexion propre NextAuth
                await signOut({
                    redirect: true,
                    callbackUrl: "/auth/signin",
                });
            }
        }

        return Promise.reject(error);
    }
);

/**
 * 🔐 INTERCEPTEUR DE REQUÊTE (Ajout du token)
 */
API.interceptors.request.use(
    async (config) => {
        // ⚠️ getSession fonctionne UNIQUEMENT côté client
        if (typeof window !== "undefined") {
            const session = await getSession();

            if (session?.user?.accessToken) {
                config.headers.Authorization = `Bearer ${session.user.accessToken}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);


export default API;
