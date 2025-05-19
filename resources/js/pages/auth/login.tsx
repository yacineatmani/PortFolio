import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { InertiaPageProps } from '@/types';

const Login: React.FC = () => {
    const { errors } = usePage<InertiaPageProps>().props;
    const { data, setData, post, processing } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login.store'), {
            onSuccess: () => {
                // Redirection gérée par le backend (intended ou home)
            },
            onError: (errors) => {
                console.log('Login errors:', errors);
            },
        });
    };

    return (
        <AppLayout>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6">Connexion</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Email"
                                required
                                className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Mot de passe"
                                required
                                className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <button type="submit" disabled={processing} className="bg-blue-500 p-2 rounded w-full">
                            Se connecter
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Login;