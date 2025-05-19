<?php
namespace App\Console\Commands;
use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateUser extends Command
{
    protected $signature = 'user:create';
    protected $description = 'Créer un nouvel utilisateur';

    public function handle()
    {
        $name = $this->ask('Nom de l\'utilisateur');
        $email = $this->ask('Email de l\'utilisateur');
        $password = $this->secret('Mot de passe');

        User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $this->info('Utilisateur créé avec succès !');
    }
}