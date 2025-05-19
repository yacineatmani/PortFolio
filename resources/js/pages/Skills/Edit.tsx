import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Skill, User } from '@/types';

interface Props {
  skill: Skill;
}

const Edit: React.FC<Props> = ({ skill }) => {
  const { auth } = usePage().props as { auth: { user: User | null } };
  const { data, setData, put, processing, errors } = useForm<{
    name: string;
    level: 'débutant' | 'intermédiaire' | 'avancé';
    user_id: number;
  }>({
    name: skill.name,
    level: skill.level as 'débutant' | 'intermédiaire' | 'avancé',
    user_id: skill.user_id,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('skills.update', skill.id));
  };

  return (
    <AppLayout>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in mb-8">
            Modifier la compétence
          </h1>
          {auth?.user ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-foreground/80">Nom</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>
              <div>
                <label className="block text-foreground/80">Niveau</label>
                <select
                  value={data.level}
                  onChange={(e) => setData('level', e.target.value as 'débutant' | 'intermédiaire' | 'avancé')}
                  className="border p-2 w-full rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Choisir un niveau</option>
                  <option value="débutant">Débutant</option>
                  <option value="intermédiaire">Intermédiaire</option>
                  <option value="avancé">Avancé</option>
                </select>
                {errors.level && <span className="text-red-500 text-sm">{errors.level}</span>}
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Mettre à jour
                </button>
                <Link
                  href={route('skills.index')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Annuler
                </Link>
              </div>
            </form>
          ) : (
            <p className="text-red-500 text-center">Vous devez être connecté pour modifier une compétence.</p>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default Edit;