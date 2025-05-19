<?php
namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class SkillController extends Controller
{
    public function create()
    {
        return Inertia::render('Skills/Create');
    }

    public function index()
    {
        $skills = Skill::where('user_id', Auth::id())->get();
        return Inertia::render('Skills/Index', [
            'skills' => $skills->map(function ($skill) {
    return [
        'id' => $skill->id,
        'name' => $skill->name,
        'level' => $skill->level,
                ];
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|string|in:débutant,intermédiaire,avancé',
        ]);

        Skill::create(array_merge($validated, ['user_id' => Auth::id()]));
        return redirect()->route('skills.index')->with('success', 'Compétence créée avec succès.');
    }

    public function edit(Skill $skill)
    {
        return Inertia::render('Skills/Edit', [
            'skill' => $skill,
        ]);
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|string|in:débutant,intermédiaire,avancé',
        ]);

        $skill->update($validated);
        return redirect()->route('skills.index')->with('success', 'Compétence mise à jour avec succès.');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return redirect()->route('skills.index')->with('success', 'Compétence supprimée avec succès.');
    }

    public function show(Skill $skill)
    {
        return Inertia::render('Skills/Show', [
            'skill' => $skill,
        ]);
    }

    
    }
