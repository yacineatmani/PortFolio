<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Skill;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        Project::create([
            'title' => 'Projet DevOps',
            'description' => 'Pipeline CI/CD',
            'github_link' => 'https://github.com/sample',
            'demo_link' => 'https://sample.com',
            'image' => 'projects/devops.jpg',
            'category' => 'DevOps',
        ]);

        Project::create([
            'title' => 'App Frontend',
            'description' => 'Interface React',
            'github_link' => 'https://github.com/sample',
            'demo_link' => 'https://sample.com',
            'image' => 'projects/frontend.jpg',
            'category' => 'Frontend',
        ]);

        Project::create([
            'title' => 'API Backend',
            'description' => 'API Laravel',
            'github_link' => 'https://github.com/sample',
            'demo_link' => 'https://sample.com',
            'image' => 'projects/backend.jpg',
            'category' => 'Backend',
        ]);

        Skill::create([
            'name' => 'React',
            'level' => 'intermédiaire',
        ]);

        Skill::create([
            'name' => 'Laravel',
            'level' => 'avancé',
        ]);
    }
}