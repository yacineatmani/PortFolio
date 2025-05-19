import { useState, useEffect } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

export const useAppearance = () => {
    // Initialiser l'apparence depuis localStorage ou utiliser 'system' par défaut
    const [appearance, setAppearance] = useState<Appearance>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('appearance') as Appearance) || 'system';
        }
        return 'system';
    });

    // Mettre à jour l'apparence
    const updateAppearance = (newAppearance: Appearance) => {
        setAppearance(newAppearance);
        localStorage.setItem('appearance', newAppearance);

        // Appliquer la classe 'dark' selon l'apparence
        if (newAppearance === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', prefersDark);
        } else {
            document.documentElement.classList.toggle('dark', newAppearance === 'dark');
        }
    };

    // Basculer entre les thèmes light et dark
    const toggleTheme = () => {
        const newAppearance = appearance === 'dark' ? 'light' : 'dark';
        updateAppearance(newAppearance);
    };

    // Synchroniser l'apparence au chargement et lors des changements
    useEffect(() => {
        if (appearance === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', prefersDark);

            // Écouter les changements de prefers-color-scheme
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e: MediaQueryListEvent) => {
                document.documentElement.classList.toggle('dark', e.matches);
            };
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        } else {
            document.documentElement.classList.toggle('dark', appearance === 'dark');
        }
    }, [appearance]);

    return { appearance, updateAppearance, toggleTheme };
};

// Initialiser l'apparence au chargement de l'application
export const initializeAppearance = () => {
    if (typeof window === 'undefined') return;

    const savedAppearance = (localStorage.getItem('appearance') as Appearance) || 'system';
    if (savedAppearance === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
    } else {
        document.documentElement.classList.toggle('dark', savedAppearance === 'dark');
    }
};