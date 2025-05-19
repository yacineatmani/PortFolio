<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    public function create()
    {
        return Inertia::render('auth/Login');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->route('home');
        }

        return back()->withErrors([
            'email' => 'Les informations d’identification fournies ne correspondent pas.',
        ]);
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
} 





// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Inertia\Inertia;
// use Inertia\Response;

// class AuthenticatedSessionController extends Controller
// {
//     /**
//      * Affiche la page de connexion.
//      */
//     public function create(Request $request): Response
//     {
//         return Inertia::render('auth/Login', [
//             'status' => $request->session()->get('status'),
//         ]);
//     }

//     /**
//      * Traite la tentative de connexion.
//      */
//     public function store(Request $request)
//     {
//         $credentials = $request->validate([
//             'email' => ['required', 'email'],
//             'password' => ['required'],
//         ]);

//         if (Auth::attempt($credentials)) {
//             $request->session()->regenerate();
//             return redirect()->intended('/');
//         }

//         return back()->withErrors([
//             'email' => 'Les informations d’identification fournies ne correspondent pas.',
//         ]);
//     }

//     /**
//      * Déconnecte l'utilisateur.
//      */
//     public function destroy(Request $request)
//     {
//         Auth::logout();
//         $request->session()->invalidate();
//         $request->session()->regenerateToken();
//         return redirect('/');
//     }
// }