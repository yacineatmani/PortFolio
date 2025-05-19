import GooeyNav from '@/components/GooeyNav';
import MetaBalls from '@/components/MetaBalls';
import { useAppearance } from '@/hooks/use-appearance';
import React from 'react';
import { usePage } from '@inertiajs/react';
import { User } from '@/types';

interface Props {
    children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
    const { toggleTheme } = useAppearance();
    const { auth } = usePage().props as { auth: { user: User | null } };

    // Base navigation items
    const navItems = [
        { href: '/', label: 'Accueil' },
        { href: '/projects', label: 'Projets' },
        { href: '/skills', label: 'Compétences' },
        { href: '/contact', label: 'Contact' },
        { href: '/about', label: 'À propos' },
    ];

    // Add "Ajouter un Projet" if authenticated
    if (auth.user) {
        navItems.splice(2, 0, { href: '/projects/create', label: 'Ajouter un Projet' });
    }

    return (
        <div className="bg-background text-foreground relative min-h-screen transition-colors duration-300">
            <MetaBalls
                color="oklch(0.65 0.15 260)"
                cursorBallColor="oklch(0.98 0.01 250)"
                cursorBallSize={1.5}
                ballCount={8}
                animationSize={20}
                enableMouseInteraction={true}
                enableTransparency={true}
                hoverSmoothness={0.15}
                clumpFactor={1}
                speed={0.15}
            />
            <div className="relative z-10">
                <header className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto px-4">
                        <GooeyNav items={navItems} />
                    </div>
                </header>
                <button
                    onClick={toggleTheme}
                    aria-label="Basculer entre le mode clair et sombre"
                    className="fixed top-4 right-4 z-30 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all duration-300"
                >
                    <span className="dark:hidden text-xl">🌙</span>
                    <span className="hidden dark:inline text-xl">☀️</span>
                </button>
                <main className="container mx-auto px-4 py-8">{children}</main>
                <footer className="bg-background/90 py-6 text-center text-foreground/70">
                    <p>© {new Date().getFullYear()} Yacine. Tous droits réservés.</p>
                </footer>
            </div>
        </div>
    );
};

export default AppLayout;