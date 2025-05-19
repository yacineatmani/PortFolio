
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Skill, User } from '@/types';

interface Props {
  skill: Skill;
}

const Show: React.FC<Props> = ({ skill }) => {
  const { auth } = usePage().props as { auth: { user: User | null } };

  return (
    <AppLayout>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in mb-8">
            {skill.name}
          </h1>
          <div className="border rounded-lg p-6 shadow-lg bg-background max-w-lg mx-auto">
            <p className="text-foreground/80 text-lg mb-4">Niveau: {skill.level}</p>
            <div className="flex space-x-4">
              {auth?.user && (
                <>
                  <Link
                    href={route('skills.edit', skill.id)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Modifier
                  </Link>
                  <Link
                    href={route('skills.destroy', skill.id)}
                    method="delete"
                    as="button"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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
              <Link
                href={route('skills.index')}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Retour
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Show;