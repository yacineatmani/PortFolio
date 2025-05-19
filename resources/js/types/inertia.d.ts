import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Auth } from './index'; // Assurez-vous que le type Auth est défini dans index.d.ts

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps {
        auth: Auth; // Ajoute la propriété auth
    }
}