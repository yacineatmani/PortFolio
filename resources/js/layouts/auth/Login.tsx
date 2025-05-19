import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const Login: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('login.authenticate'));
  };

  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Connexion</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="Email"
                required
                className="border p-2 w-full rounded bg-gray-700 text-white"
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
                className="border p-2 w-full rounded bg-gray-700 text-white"
              />
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