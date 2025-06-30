'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        if (email === 'admin@example.com' && password === '123456') {
            localStorage.setItem('auth', 'true') 
            router.push('/') 
        } else {
            setError('Usuario o contraseña incorrectos')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
                <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

                <input
                    type="email"
                    placeholder="Correo"
                    className="w-full border px-3 py-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border px-3 py-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    Entrar
                </button>
            </form>
        </div>
    )
}
