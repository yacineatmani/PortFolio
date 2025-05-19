import React, { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';
import ParticlesBackground from '../../components/ParticlesBackground';
import AppLayout from '@/layouts/AppLayout';
import { Project, Skill, User } from '@/types';
import { usePage } from '@inertiajs/react';
import { FaGithub, FaLink, FaDev } from 'react-icons/fa';

interface Props {
    projects: Project[];
    skills: Skill[];
}

const Index: React.FC<Props> = ({ projects, skills }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { auth } = usePage().props as { auth: { user: User | null } };

    // Image de profil fallback
    const profileImg =
        "/storage/hero.jpeg"; // Mets ici le chemin de ton image ou une image par défaut

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % (projects.length || 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [projects]);

    return (
        <AppLayout>
            {/* Hero Section */}
            <div className="relative">
                <ParticlesBackground />
                <Parallax
                    bgImage="/storage/hero.jpeg"
                    strength={400}
                    className="hero-section relative"
                >
                    <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>
                    <div className="hero-content text-center flex flex-col items-center justify-center min-h-[600px] px-4">
                        <img
                            src={profileImg}
                            alt="Yacine Atmani"
                            className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-primary shadow-2xl mb-6 object-cover bg-gray-200"
                            onError={e => (e.currentTarget.src = "/default-profile.png")}
                        />
                        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground animate-fade-in-up drop-shadow-lg">
                            Yacine Atmani
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/70 mt-4 max-w-2xl mx-auto">
                            Développeur Fullstack & DevOps | Créateur de solutions web modernes avec React, Laravel et Kubernetes
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <a
                                href="/projects"
                                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                            >
                                Mes projets
                            </a>
                            <a
                                href={
                                    auth?.user?.cv_path && typeof auth.user.cv_path === 'string'
                                        ? `/storage/${auth.user.cv_path.replace('public/', '')}`
                                        : '/storage/Yacine_Atmani_CV.pdf'
                                }
                                download
                                className="px-6 py-3 bg-background/50 text-foreground font-semibold rounded-full shadow-lg hover:bg-background/70 transition-colors"
                            >
                                Télécharger CV
                            </a>
                            <a
                                href="/contact"
                                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition-colors"
                            >
                                Me contacter
                            </a>
                        </div>
                    </div>
                </Parallax>
            </div>

            {/* Skills Section */}
            <section className="py-16 bg-background/90 text-foreground">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-fade-in">
                        Compétences clés
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {skills.length > 0 ? (
                            skills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="bg-background/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <h3 className="text-xl font-semibold text-foreground">{skill.name}</h3>
                                    <p className="text-foreground/70 mt-2">{skill.level}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-foreground/50 col-span-full">
                                Aucune compétence disponible pour le moment.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Projects Carousel */}
            <section className="py-16 bg-background text-foreground">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-fade-in">
                        Projets phares
                    </h2>
                    <div className="relative carousel-container max-w-4xl mx-auto">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={`carousel-item absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <img
                                        src={`/storage/${project.image}`}
                                        alt={project.title}
                                        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                                        <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                                            {project.title}
                                        </h3>
                                        <p className="text-foreground/70 mt-2">{project.description}</p>
                                        <div className="mt-4 flex space-x-4">
                                            {project.github_link && (
                                                <a
                                                    href={project.github_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-primary hover:text-primary/80"
                                                >
                                                    <FaGithub className="mr-2" /> GitHub
                                                </a>
                                            )}
                                            {project.demo_link && (
                                                <a
                                                    href={project.demo_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-primary hover:text-primary/80"
                                                >
                                                    <FaLink className="mr-2" /> Démo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-foreground/50">
                                Aucun projet disponible pour le moment.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Category Section */}
            <section className="py-16 bg-background/90 text-foreground">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-fade-in">
                        Explorer par catégorie
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a
                            href="/projects/DevOps"
                            className="category-card bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-xl p-8 flex items-center justify-center transform transition-transform hover:scale-105 hover:shadow-2xl"
                        >
                            <FaDev className="text-3xl mr-3" />
                            <span className="text-xl md:text-2xl font-bold">DevOps</span>
                        </a>
                        <a
                            href="/projects/Frontend"
                            className="category-card bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-xl p-8 flex items-center justify-center transform transition-transform hover:scale-105 hover:shadow-2xl"
                        >
                            <FaLink className="text-3xl mr-3" />
                            <span className="text-xl md:text-2xl font-bold">Frontend</span>
                        </a>
                        <a
                            href="/projects/Backend"
                            className="category-card bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-xl p-8 flex items-center justify-center transform transition-transform hover:scale-105 hover:shadow-2xl"
                        >
                            <FaGithub className="text-3xl mr-3" />
                            <span className="text-xl md:text-2xl font-bold">Backend</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-16 bg-background text-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
                        Prêt à collaborer ?
                    </h2>
                    <p className="text-lg md:text-xl text-foreground/70 mb-6 max-w-2xl mx-auto">
                        Disponible à partir du 14 juin 2025 pour des projets fullstack ou DevOps. Contactez-moi ou découvrez mon parcours.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a
                            href="/contact"
                            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition-colors"
                        >
                            Me contacter
                        </a>
                        <a
                            href="/about"
                            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                        >
                            À propos
                        </a>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Index;