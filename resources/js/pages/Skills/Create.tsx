import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { User } from '@/types';
import { Link } from '@inertiajs/react';

const Create: React.FC = () => {
    const { auth } = usePage().props as { auth: { user: User | null } };
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('skills.store'), {
            onSuccess: () => {
                setData({ name: '', description: '' });
            },
        });
    };

    if (!auth.user) {
        return (
            <AppLayout>
                <section className="py-12 bg-background">
                    <div className="container mx-auto px-4">
                        <p className="text-center text-foreground/70">
                            Veuillez vous connecter pour ajouter une compétence.
                        </p>
                    </div>
                </section>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center animate-fade-in">
                        Ajouter une Nouvelle Compétence
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-2xl mx-auto space-y-6 bg-background/95 p-8 rounded-lg shadow-2xl border border-primary/50 animate-fade-in-up"
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                                Nom
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Nom de la compétence"
                                required
                                className="w-full p-4 rounded-lg bg-background border border-primary/30 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-base"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-2 font-medium">{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-foreground/80 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Description de la compétence"
                                rows={5}
                                className="w-full p-4 rounded-lg bg-background border border-primary/30 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-base"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-2 font-medium">{errors.description}</p>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50 text-base"
                            >
                                {processing ? 'Ajout en cours...' : 'Ajouter'}
                            </button>
                            <Link
                                href="/skills"
                                className="flex-1 px-6 py-3 bg-background border border-primary/30 text-foreground font-semibold rounded-lg shadow-lg hover:bg-primary/10 transition-colors text-base"
                            >
                                Annuler
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </AppLayout>
    );
};

export default Create;