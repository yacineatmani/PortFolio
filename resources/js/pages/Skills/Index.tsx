// import React from 'react';
// import { useForm, usePage } from '@inertiajs/react';
// import AppLayout from '@/layouts/AppLayout';
// import { Skill, User } from '@/types';

// interface Props {
//     skills: Skill[];
// }

// const Index: React.FC<Props> = ({ skills }) => {
//     const { auth } = usePage().props as { auth: { user: User | null } };
//     const { data, setData, post, processing } = useForm({
//         name: '',
//         level: '' as 'débutant' | 'intermédiaire' | 'avancé' | '',
//     });

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         post(route('skills.store'));
//     };

//     return (
//         <AppLayout>
//             <h1 className="text-2xl font-bold mb-4">Mes Compétences</h1>
//             {auth.user && (
//                 <form onSubmit={handleSubmit} className="mb-8 space-y-4">
//                     <input
//                         type="text"
//                         value={data.name}
//                         onChange={(e) => setData('name', e.target.value)}
//                         placeholder="Nom"
//                         required
//                         className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
//                     />
//                     <select
//                         value={data.level}
//                         onChange={(e) => setData('level', e.target.value as 'débutant' | 'intermédiaire' | 'avancé')}
//                         required
//                         className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
//                     >
//                         <option value="">Choisir un niveau</option>
//                         <option value="débutant">Débutant</option>
//                         <option value="intermédiaire">Intermédiaire</option>
//                         <option value="avancé">Avancé</option>
//                     </select>
//                     <button type="submit" disabled={processing} className="bg-blue-500 p-2 rounded">
//                         Ajouter
//                     </button>
//                 </form>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {skills.map((skill) => (
//                     <div key={skill.id} className="border rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800">
//                         <h3 className="text-xl font-bold">{skill.name}</h3>
//                         <p>Niveau: {skill.level}</p>
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
import { Skill, User } from '@/types';

interface Props {
    skills: Skill[];
}

const Index: React.FC<Props> = ({ skills }) => {
    const { auth } = usePage().props as { auth: { user: User | null } };

    return (
        <AppLayout>
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in">
                            Mes Compétences
                        </h1>
                        {auth.user && (
                            <Link
                                href="/skills/create"
                                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
                            >
                                Ajouter une Compétence
                            </Link>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {skills.length > 0 ? (
                            skills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="border rounded-lg overflow-hidden shadow-lg bg-background transition-transform hover:scale-105 hover:shadow-2xl animate-fade-in-up"
                                >
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold text-foreground">{skill.name}</h3>
                                        <p className="text-foreground/80 mt-2">{skill.level}</p>
                                        <div className="mt-4 flex space-x-4">
                                            {auth.user && (
                                                <>
                                                    <Link
                                                        href={`/skills/${skill.id}/edit`}
                                                        className="text-primary hover:text-primary/80 transition-colors"
                                                    >
                                                        Modifier
                                                    </Link>
                                                    <Link
                                                        href={route('skills.destroy', skill.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-500 hover:text-red-600 transition-colors"
                                                        onClick={(e) => {
                                                            if (!confirm('Voulez-vous vraiment supprimer cette compétence ?')) {
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
                                Aucune compétence trouvée.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Index;