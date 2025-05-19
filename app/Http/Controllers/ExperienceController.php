<?php
namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::where('user_id', Auth::id())->get();
        return Inertia::render('About/Index', [
            'experiences' => $experiences,
        ]);
    }

    public function store(Request $request)
    {
        $this->middleware('auth:sanctum');

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        Experience::create(array_merge($validated, ['user_id' => Auth::id()]));
        return redirect()->route('about.index');
    }
}