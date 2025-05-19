<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function create()
{
    return inertia('Contact/Create');
}
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:1000',
        ]);

        // Handle message (e.g., send email or save to database)
        return redirect()->back()->with('success', 'Message envoyé !');
    }
}

// routes/web.php
