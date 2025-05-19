import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

interface Props {
    category?: string;
}

const Create: React.FC<Props> = ({ category }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        github_link: '',
        demo_link: '',
        image: null as File | null,
        category: category || 'Frontend',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('projects.store'), {
            onSuccess: () => {
                setData({
                    title: '',
                    description: '',
                    github_link: '',
                    demo_link: '',
                    image: null,
                    category: category || 'Frontend',
                });
            },
            forceFormData: true, // Required for file uploads
        });
    };

    return (
        <AppLayout>
            <section className="py-16 bg-background text-foreground">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-8 text-center">Créer un projet</h1>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6" encType="multipart/form-data">
                        <div>
                            <label className="block text-foreground/70 mb-2">Titre</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full p-4 bg-background/50 rounded-lg text-foreground border border-foreground/20"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-foreground/70 mb-2">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full p-4 bg-background/50 rounded-lg text-foreground border border-foreground/20"
                                rows={5}
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>
                        <div>
                            <label className="block text-foreground/70 mb-2">Lien GitHub</label>
                            <input
                                type="url"
                                value={data.github_link}
                                onChange={(e) => setData('github_link', e.target.value)}
                                className="w-full p-4 bg-background/50 rounded-lg text-foreground border border-foreground/20"
                            />
                            {errors.github_link && <p className="text-red-500 text-sm mt-1">{errors.github_link}</p>}
                        </div>
                        <div>
                            <label className="block text-foreground/70 mb-2">Lien Démo</label>
                            <input
                                type="url"
                                value={data.demo_link}
                                onChange={(e) => setData('demo_link', e.target.value)}
                                className="w-full p-4 bg-background/50 rounded-lg text-foreground border border-foreground/20"
                            />
                            {errors.demo_link && <p className="text-red-500 text-sm mt-1">{errors.demo_link}</p>}
                        </div>
                        <div>
                            <label className="block text-foreground/70 mb-2">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                className="w-full p-4 bg-background/50 rounded-lg text-foreground border border-foreground/20"
                            />
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        </div>
                        <div>
                            <label className="block text-foreground/70 mb-2">Catégorie</label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full p-4 bg-background/50 rounded-lg text-foreground border border-foreground/20"
                            >
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="DevOps">DevOps</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                        >
                            Créer le projet
                        </button>
                    </form>
                </div>
            </section>
        </AppLayout>
    );
};

export default Create;