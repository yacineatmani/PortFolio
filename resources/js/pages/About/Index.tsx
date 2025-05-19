import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Experience, User } from '@/types';

interface Props {
    experiences: Experience[];
}

const defaultExperiences: Experience[] = [
    {
        id: 1,
        title: 'Web Developer',
        company: 'Molengeek',
        start_date: '2024-01-01',
        end_date: '2025-06-14',
        description: 'Developed responsive web applications using HTML, CSS, JavaScript, Laravel, and React. Focused on creating intuitive and performant solutions.',
        user_id: 1,
    },
    {
        id: 2,
        title: 'DevOps & Software Engineer',
        company: 'IBM',
        start_date: '2023-01-01',
        end_date: '2023-12-31',
        description: 'Contributed to CI/CD pipeline implementation and software engineering tasks, enhancing deployment efficiency and system reliability.',
        user_id: 1,
    },
    {
        id: 3,
        title: 'IT Support Intern',
        company: 'INCO',
        start_date: '2022-06-01',
        end_date: '2023-06-30',
        description: 'Provided technical support and system maintenance, ensuring smooth IT operations and quick resolution of user issues.',
        user_id: 1,
    },
    {
        id: 4,
        title: 'DevSecOps Intern',
        company: 'Bacteriale',
        start_date: '2022-04-01',
        end_date: '2022-11-30',
        description: 'Supported DevSecOps initiatives with Kubernetes, CI/CD pipelines, and security practices to improve system security and reliability.',
        user_id: 1,
    },
];

const skills = [
    { name: 'HTML', level: 'Confirmé' },
    { name: 'CSS', level: 'Confirmé' },
    { name: 'JavaScript', level: 'Confirmé' },
    { name: 'React', level: 'Intermédiaire' },
    { name: 'PHP (Laravel)', level: 'Intermédiaire' },
    { name: 'Node.js', level: 'Intermédiaire' },
    { name: 'MySQL', level: 'Intermédiaire' },
    { name: 'Docker', level: 'Débutant' },
    { name: 'Kubernetes', level: 'Débutant' },
    { name: 'Git & GitHub', level: 'Confirmé' },
    { name: 'CI/CD (GitHub Actions)', level: 'Débutant' },
    { name: 'Jest', level: 'Débutant' },
    { name: 'APIs', level: 'Intermédiaire' },
    { name: 'Responsive Design', level: 'Confirmé' },
];

const education = [
    {
        title: 'Formation Développeur Web',
        institution: 'Molengeek',
        start_date: '2024',
        end_date: '2025',
        description: 'Intensive training in fullstack web development.',
    },
    {
        title: 'DevOps & Software Engineering Certificate',
        institution: 'IBM',
        start_date: '2023',
        end_date: '2023',
        description: 'Certification in DevOps practices and software engineering.',
    },
    {
        title: 'Google IT Support Professional',
        institution: 'Google',
        start_date: '2022',
        end_date: '2023',
        description: 'Training in IT support and system administration.',
    },
    {
        title: 'DevOps & Cybersecurity',
        institution: 'Unknown',
        start_date: '2022',
        end_date: '2022',
        description: 'Focused on DevOps tools and cybersecurity fundamentals.',
    },
    {
        title: 'Brevet de Secourisme',
        institution: 'Unknown',
        start_date: 'Unknown',
        end_date: 'Unknown',
        description: 'First aid certification.',
    },
];

const Index: React.FC<Props> = ({ experiences = defaultExperiences }) => {
    const { auth } = usePage().props as { auth: { user: User | null } };
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        company: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('about.store'), {
            onSuccess: () => {
                setData({ title: '', description: '', start_date: '', end_date: '', company: '' });
            },
        });
    };

    return (
        <AppLayout>
            <section className="py-16 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    {/* Profile Section */}
                    <div className="max-w-4xl mx-auto mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in-up">
                            À propos de Yacine Atmani
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-6">
                            Je suis un développeur web motivé basé à Bruxelles, avec une solide expérience en développement front-end et back-end. Actuellement en stage chez Molengeek, je cherche à rejoindre une équipe technologique où je peux contribuer à des projets impactants, approfondir mes compétences en développement web et évoluer vers un rôle fullstack ou DevOps. Passionné par la création de solutions web performantes, je maîtrise des technologies comme HTML, CSS, JavaScript, React, Laravel, Node.js, et des outils DevOps comme Docker et Kubernetes. Trilingue (français, anglais, arabe), je m’adapte facilement à des environnements multiculturels.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <a
                                href="https://github.com/yacineatmani"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://linkedin.com/in/yacine-atmani"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="/storage/Yacine_Atmani.pdf"
                                download
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Télécharger CV
                            </a>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-center animate-fade-in-up">
                            Compétences
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                                    <p className="text-gray-400">{skill.level}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-center animate-fade-in-up">
                            Formation
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <h3 className="text-xl font-semibold">{edu.title}</h3>
                                    <p className="text-gray-400">{edu.institution}</p>
                                    <p className="text-gray-500">
                                        {edu.start_date} - {edu.end_date || 'Présent'}
                                    </p>
                                    <p className="text-gray-300 mt-2">{edu.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experiences Section */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-center animate-fade-in-up">
                            Expériences Professionnelles
                        </h2>
                        {auth?.user && (
                            <form
                                onSubmit={handleSubmit}
                                className="max-w-2xl mx-auto space-y-6 bg-gray-800 p-8 rounded-lg shadow-xl mb-12"
                            >
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                        Titre
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Titre de l'expérience"
                                        required
                                        className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                    {errors.title && (
                                        <p className="text-red-400 text-sm mt-2">{errors.title}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Description de l'expérience"
                                        rows={5}
                                        className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                    {errors.description && (
                                        <p className="text-red-400 text-sm mt-2">{errors.description}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                                        Entreprise
                                    </label>
                                    <input
                                        id="company"
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        placeholder="Nom de l'entreprise"
                                        required
                                        className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                    {errors.company && (
                                        <p className="text-red-400 text-sm mt-2">{errors.company}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-300 mb-2">
                                        Date de début
                                    </label>
                                    <input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        required
                                        className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                    {errors.start_date && (
                                        <p className="text-red-400 text-sm mt-2">{errors.start_date}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-300 mb-2">
                                        Date de fin
                                    </label>
                                    <input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                    {errors.end_date && (
                                        <p className="text-red-400 text-sm mt-2">{errors.end_date}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Ajout en cours...' : 'Ajouter Expérience'}
                                </button>
                            </form>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {experiences.length > 0 ? (
                                experiences.map((experience) => (
                                    <div
                                        key={experience.id}
                                        className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        <h3 className="text-xl font-semibold text-white">{experience.title}</h3>
                                        <p className="text-gray-400">{experience.company}</p>
                                        <p className="text-gray-500">
                                            {experience.start_date} - {experience.end_date || 'Présent'}
                                        </p>
                                        <p className="text-gray-300 mt-2">{experience.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-400 col-span-full">
                                    Aucune expérience trouvée.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </section>
        </AppLayout>
    );
};

export default Index;