"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin' && password === 'admin') {
            // router.push('/payment');
        } else {
            setError('Invalid email or password');
        }
    };

    // return (
    //     <div>
    //         <h1>Login Page</h1>
    //         <form onSubmit={handleLogin}>
    //             <div>
    //                 <label>Email:</label>
    //                 <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
    //             </div>
    //             <div>
    //                 <label>Password:</label>
    //                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //             </div>
    //             <button type="submit">Login</button>
    //         </form>
    //         {error && <p>{error}</p>}
    //     </div>
    // );
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full px-4 py-8 bg-white shadow rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Login Page</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Login</button>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
}

