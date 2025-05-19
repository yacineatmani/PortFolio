<?php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Routes pour les projets
Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create')->middleware('auth:sanctum');
Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store')->middleware('auth:sanctum');
Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit')->middleware('auth:sanctum');
Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update')->middleware('auth:sanctum');
Route::get('/projects/{category?}', [ProjectController::class, 'index'])->name('projects.index');
Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy')->middleware('auth:sanctum');

// Routes pour les compétences
Route::get('/skills', [SkillController::class, 'index'])->name('skills.index');
Route::post('/skills', [SkillController::class, 'store'])->name('skills.store')->middleware('auth:sanctum');
Route::get('/skills/create', [SkillController::class, 'create'])->name('skills.create')->middleware('auth:sanctum');
Route::get('/skills/{skill}', [SkillController::class, 'show'])->name('skills.show');
Route::get('/skills/{skill}/edit', [SkillController::class, 'edit'])->name('skills.edit')->middleware('auth:sanctum');
Route::put('/skills/{skill}', [SkillController::class, 'update'])->name('skills.update')->middleware('auth:sanctum');
Route::delete('/skills/{skill}', [SkillController::class, 'destroy'])->name('skills.destroy')->middleware('auth:sanctum');

// Routes pour la section "À propos"
Route::get('/about', [ExperienceController::class, 'index'])->name('about.index');
Route::post('/about', [ExperienceController::class, 'store'])->name('about.store')->middleware('auth:sanctum');

// Routes pour l'authentification
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store')->middleware('guest');
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login')->middleware('guest');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout')->middleware('auth:sanctum');
// ...existing code...


Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
?>