import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

const Contact: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.store'));
    };

    return (
        <AppLayout>
            <section className="py-16 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-8 text-center">Me Contacter</h1>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Nom</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full p-4 bg-gray-800 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full p-4 bg-gray-800 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Message</label>
                            <textarea
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full p-4 bg-gray-800 rounded-lg"
                                rows={5}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-green-600 text-white rounded-full"
                        >
                            Envoyer
                        </button>
                    </form>
                </div>
            </section>
        </AppLayout>
    );
};

export default Contact;