// import React from 'react';
// import { useForm, usePage } from '@inertiajs/react';
// import AppLayout from '@/layouts/AppLayout';
// import { Project, User } from '@/types';

// interface Props {
//     projects: Project[];
//     category: string | null;
// }

// const Index: React.FC<Props> = ({ projects, category }) => {
//     const { auth } = usePage().props as { auth: { user: User | null } };
//     const { data, setData, post, processing } = useForm({
//         title: '',
//         description: '',
//         github_link: '',
//         demo_link: '',
//         image: null as File | null,
//         category: category || 'Frontend',
//     });

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         post(route('projects.store'), { forceFormData: true });
//     };

//     return (
//         <AppLayout>
//             <h1 className="text-2xl font-bold mb-4">Projets {category || 'Tous'}</h1>
//             {auth.user && (
//                 <form onSubmit={handleSubmit} className="mb-8 space-y-4">
//                     <input
//                         type="text"
//                         value={data.title}
//                         onChange={(e) => setData('title', e.target.value)}
//                         placeholder="Titre"
//                         required
//                         className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
//                     />
//                     <textarea
//                         value={data.description}
//                         onChange={(e) => setData('description', e.target.value)}
//                         placeholder="Description"
//                         className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
//                     />
//                     <input
//                         type="url"
//                         value={data.github_link}
//                         onChange={(e) => setData('github_link', e.target.value)}
//                         placeholder="Lien GitHub"
//                         className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
//                     />
//                     <input
//                         type="url"
//                         value={data.demo_link}
//                         onChange={(e) => setData('demo_link', e.target.value)}
//                         placeholder="Lien Démo"
//                         className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
//                     />
//                     <input
//                         type="file"
//                         onChange={(e) => setData('image', e.target.files?.[0] || null)}
//                         accept="image/*"
//                         className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
//                     />
//                     <select
//                         value={data.category}
//                         onChange={(e) => setData('category', e.target.value)}
//                         required
//                         className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
//                     >
//                         <option value="DevOps">DevOps</option>
//                         <option value="Frontend">Frontend</option>
//                         <option value="Backend">Backend</option>
//                     </select>
//                     <button type="submit" disabled={processing} className="bg-blue-500 p-2 rounded">
//                         Ajouter
//                     </button>
//                 </form>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {projects.map((project) => (
//                     <div key={project.id} className="border rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
//                         <img src={`/storage/${project.image}`} alt={project.title} className="w-full h-48 object-cover" />
//                         <div className="p-4">
//                             <h3 className="text-xl font-bold">{project.title}</h3>
//                             <p>{project.description}</p>
//                             <div className="mt-2">
//                                 {project.github_link && <a href={project.github_link} className="text-blue-400">GitHub</a>}
//                                 {project.demo_link && <a href={project.demo_link} className="text-blue-400 ml-4">Démo</a>}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </AppLayout>
//     );
// };

// export default Index;
import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Project, User } from '@/types';

interface Props {
    projects: Project[];
    category: string | null;
}

const Index: React.FC<Props> = ({ projects, category }) => {
    const { auth } = usePage().props as { auth: { user: User | null } };

    return (
        <AppLayout>
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in">
                            Projets {category || 'Tous'}
                        </h1>
                        {auth.user && (
                            <Link
                                href="/projects/create"
                                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
                            >
                                Ajouter un Projet
                            </Link>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="border rounded-lg overflow-hidden shadow-lg bg-background transition-transform hover:scale-105 hover:shadow-2xl animate-fade-in-up"
                                >
                                    <img
                                        src={`/storage/${project.image}`}
                                        alt={project.title}
                                        className="w-full h-40 sm:h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                                        <p className="text-foreground/80 mt-2">{project.description}</p>
                                        <div className="mt-4 flex space-x-4">
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
                                            {auth.user && (
                                                <>
                                                    <Link
                                                        href={`/projects/${project.id}/edit`}
                                                        className="text-primary hover:text-primary/80 transition-colors"
                                                    >
                                                        Modifier
                                                    </Link>
                                                    <Link
                                                        href={route('projects.destroy', project.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-500 hover:text-red-600 transition-colors"
                                                        onClick={(e) => {
                                                            if (!confirm('Voulez-vous vraiment supprimer ce projet ?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        Supprimer
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-foreground/70 col-span-full">
                                Aucun projet trouvé pour cette catégorie.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Index;