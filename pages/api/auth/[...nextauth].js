import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import BASE_URL from "../../../utils/constants";

export default NextAuth({

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Mot de passe", type: "password" }
            },
            async authorize(credentials) {
                try {
                    // Appel à l'API Laravel login
                    const res = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
                        email: credentials.email,
                        password: credentials.password
                    });

                    const user = res.data.user;
                    user.token = res.data.token; // on garde le token JWT de Laravel

                    if (user) return user;
                    return null;
                } catch (err) {
                    return null;
                }
            }
        })
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.accessToken = user.token; // stocke token JWT Laravel
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.accessToken = token.accessToken;
            return session;
        }
    },

    pages: {
        signIn: "/auth/signin",
        error: "/auth/error"
    },

    secret: process.env.NEXTAUTH_SECRET
});
