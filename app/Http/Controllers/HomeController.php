<?php
namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        // Fetch all projects and skills (no user_id filter for public access)
        $projects = Project::all();
        $skills = Skill::all();

        // Pass authenticated user data (if logged in) for dynamic CV link
        $authUser = Auth::user() ? [
            'id' => Auth::user()->id,
            'name' => Auth::user()->name,
            'email' => Auth::user()->email,
            'cv_path' => Auth::user()->cv_path ?? null, // Assumes cv_path column exists
        ] : null;

        return Inertia::render('Home/Index', [
            'projects' => $projects,
            'skills' => $skills,
            'auth' => ['user' => $authUser],
        ]);
    }
}