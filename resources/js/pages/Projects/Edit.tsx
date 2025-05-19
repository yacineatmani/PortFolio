import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Project, User } from '@/types';
import { Link } from '@inertiajs/react';

interface Props {
    project: Project;
}

const Edit: React.FC<Props> = ({ project }) => {
    const { auth } = usePage().props as { auth: { user: User | null } };
    const { data, setData, put, processing, errors } = useForm({
        title: project.title,
        description: project.description,
        github_link: project.github_link || '',
        demo_link: project.demo_link || '',
        image: null as File | null,
        category: project.category || 'Frontend',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('projects.update', project.id), {
            forceFormData: true,
        });
    };

    if (!auth.user) {
        return (
            <AppLayout>
                <section className="py-12 bg-background">
                    <div className="container mx-auto px-4">
                        <p className="text-center text-foreground/70">
                            Veuillez vous connecter pour modifier un projet.
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
                        Modifier le Projet : {project.title}
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-2xl mx-auto space-y-6 bg-background/95 p-8 rounded-lg shadow-2xl border border-primary/50 animate-fade-in-up"
                    >
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-foreground/80 mb-2">
                                Titre
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Titre du projet"
                                required
                                className="w-full p-4 rounded-lg bg-background border border-primary/30 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-base"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-2 font-medium">{errors.title}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-foreground/80 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.title}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Description du projet"
                                rows={5}
                                className="w-full p-4 rounded-lg bg-background border border-primary/30 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-base"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-2 font-medium">{errors.description}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="github_link" className="block text-sm font-medium text-foreground/80 mb-2">
                                Lien GitHub
                            </label>
                            <input
                                id="github_link"
                                type="url"
                                value={data.github_link}
                                onChange={(e) => setData('github_link', e.target.value)}
                                placeholder="https://github.com/..."
                                className="w-full p-4 rounded-lg bg-background border border-primary/30 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-base"
                            />
                            {errors.github_link && (
                                <p className="text-red-500 text-sm mt-2 font-medium">{errors.github_link}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="demo_link" className="block text-sm font-medium text-foreground/80 mb-2">
                                Lien Démo
                            </label>
                            <input
                                id="demo_link"
                                type="url"
                                value={data.demo_link}
                                onChange={(e) => setData('demo_link', e.target.value)}
                                placeholder="https://demo.com/..."
                                className="w-full p-4 rounded-lg bg-background border border-primary/30 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-base"
                            />
                            {errors.demo_link && (
                                <p className="text-red-500 text-sm mt-2 font-medium">{errors.demo_link}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-foreground/80 mb-2">
                                Image
                            </label>
                            <input
                                id="image"
                                type="file"
                                onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                accept="image/*"
                                className="w-full p-4 rounded-lg bg-background border border-primary/30 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 text-base"
                            />
                            {errors.image && (
                                <p className="text-red-500 text-sm mt-2 font-medium">{errors.image}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-foreground/80 mb-2">
                                Catégorie
                            </label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value as 'DevOps' | 'Frontend' | 'Backend')}                                required
                                className="w-full p-4 rounded-lg bg-background border border-primary/30 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-base"
                            >
                                <option value="DevOps">DevOps</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-2 font-medium">{errors.category}</p>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50 text-base"
                            >
                                {processing ? 'Mise à jour...' : 'Mettre à jour'}
                            </button>
                            <Link
                                href={`/projects/${project.id}`}
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

export default Edit;