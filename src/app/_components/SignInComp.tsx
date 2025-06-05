"use client";

import Image from "next/image";
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "../firebase"; 

export default function SignInComp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/home");
        } catch (err: any) {
            setError(err.message || "Failed to sign in.");
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="bg-blue-200 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-left">Sign In</h2>
        <form className="flex flex-col gap-4">
        <label className="text-blue-900 text-sm" htmlFor="email">
            Email
            <input
                id="email"
                type="email"
                className="mt-1 w-full px-3 py-2 rounded bg-white text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </label>
        <label className="text-blue-900 text-sm" htmlFor="password">
            Password
            <input
                id="password"
                type="password"
                className="mt-1 w-full px-3 py-2 rounded bg-white text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </label>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex items-center justify-between mt-6">
            <span className="text-blue-900 text-sm">Don't have an account?</span>
            <div className="flex gap-2">
            <Link href="/signup">
                <button
                    type="button"
                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full"
                >
                Sign Up
                </button>
            </Link>
            <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
                disabled={loading}
                onClick={handleSubmit}
            >
                {loading ? "Signing In..." : "Sign In"}
            </button>
            </div>
        </div>
        </form>
    </div>
    );
}
