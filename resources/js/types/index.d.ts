import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { Errors, ErrorBag, PageProps } from '@inertiajs/core';

// Représente un utilisateur authentifié ou non
export interface User {
    id: number;
    name: string;
    email: string;
    cv_path?: string | null;
    avatar?: string; // Optionnel : URL de l'avatar
    email_verified_at: string | null; // Date de vérification de l'email
    created_at: string; // Date de création
    updated_at: string; // Date de mise à jour
    [key: string]: unknown; // Permet des propriétés supplémentaires
}

// Authentification : contient l'utilisateur ou null si non authentifié
export interface Auth {
    user: User | null;
}

// Représente un projet
export interface Project {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    github_link: string | null; // Lien vers le dépôt GitHub
    demo_link: string | null; // Lien vers la démo
    image: string | null; // URL de l'image
    category: 'DevOps' | 'Frontend' | 'Backend'; // Catégorie du projet
}

// Représente une compétence
export interface Skill {
    id: number;
    user_id: number;
    name: string; // Nom de la compétence
    level: 'débutant' | 'intermédiaire' | 'avancé'; // Niveau de compétence
}

// Représente une expérience professionnelle
export interface Experience {
    id: number;
    user_id: number;
    title: string; // Titre du poste
    company: string; // Nom de l'entreprise
    start_date: string; // Date de début
    end_date: string | null; // Date de fin (null si toujours en poste)
    description: string | null; // Description de l'expérience
}

// Élément d'un fil d'Ariane (breadcrumb)
export interface BreadcrumbItem {
    title: string; // Titre de l'élément
    href: string; // Lien de l'élément
}

// Élément de navigation
export interface NavItem {
    title: string; // Titre de l'élément
    href: string; // Lien de l'élément
    icon?: LucideIcon | null; // Icône optionnelle
    isActive?: boolean; // Indique si l'élément est actif
}

// Groupe d'éléments de navigation
export interface NavGroup {
    title: string; // Titre du groupe
    items: NavItem[]; // Liste des éléments de navigation
}

// Données partagées entre les pages
export interface SharedData {
    name: string; // Nom de l'application ou de l'utilisateur
    quote: { message: string; author: string }; // Citation affichée
    auth: Auth; // Données d'authentification
    ziggy: Config & { location: string }; // Configuration Ziggy
    sidebarOpen: boolean; // Indique si la barre latérale est ouverte
    [key: string]: unknown; // Permet des propriétés supplémentaires
}

// Propriétés des pages Inertia.js
export interface InertiaPageProps extends PageProps {
    auth: Auth; // Données d'authentification
    errors: Errors & ErrorBag; // Gestion des erreurs
    deferred?: Record<string, string[] | undefined>; // Données différées
    projects?: Project[]; // Liste des projets (optionnel)
    skills?: Skill[]; // Liste des compétences (optionnel)
    experiences?: Experience[]; // Liste des expériences (optionnel)
    category?: string | null; // Catégorie pour les projets (optionnel)
}