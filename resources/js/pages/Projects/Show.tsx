import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Project, User } from '@/types';

interface Props {
    project: Project;
}

const Show: React.FC<Props> = ({ project }) => {
    const { auth } = usePage().props as { auth: { user: User | null } };

    return (
        <AppLayout>
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center animate-fade-in">
                        {project.title}
                    </h1>
                    <div className="max-w-3xl mx-auto bg-background/95 p-8 rounded-lg shadow-2xl border border-primary/50 animate-fade-in-up">
                        <img
                            src={`/storage/${project.image}`}
                            alt={project.title}
                            className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
                        />
                        <p className="text-foreground/80 mb-4">{project.description}</p>
                        <div className="flex flex-col space-y-2 mb-6">
                            {project.github_link && (
                                <a
                                    href={project.github_link}
                                    className="text-primary hover:text-primary/80 transition-colors"
                                >
                                    GitHub
                                </a>
                            )}
                            {project.demo_link && (
                                <a
                                    href={project.demo_link}
                                    className="text-primary hover:text-primary/80 transition-colors"
                                >
                                    Démo
                                </a>
                            )}
                            <p className="text-foreground/70">Catégorie : {project.category}</p>
                        </div>
                        {auth.user && (
                            <div className="flex space-x-4">
                                <Link
                                    href={`/projects/${project.id}/edit`}
                                    className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
                                >
                                    Modifier
                                </Link>
                                <Link
                                    href={route('projects.destroy', project.id)}
                                    method="delete"
                                    as="button"
                                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-colors"
                                    onClick={(e) => {
                                        if (!confirm('Voulez-vous vraiment supprimer ce projet ?')) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    Supprimer
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Show;