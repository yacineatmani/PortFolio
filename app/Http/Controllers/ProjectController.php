<?php
namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index($category = null)
    {
        $query = Project::where('user_id', Auth::id());
        if ($category) {
            $query->where('category', $category);
        }
        $projects = $query->get();
        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'category' => $category,
        ]);
    }

    public function create(Request $request)
    {
        $category = $request->query('category');
        return Inertia::render('Projects/Create', [
            'category' => $category,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'github_link' => 'nullable|url',
            'demo_link' => 'nullable|url',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'category' => 'required|string|in:DevOps,Frontend,Backend',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image'] = $path;
        }

        Project::create(array_merge($validated, ['user_id' => Auth::id()]));
        return redirect()->route('projects.index')->with('success', 'Projet créé avec succès.');
    }
}