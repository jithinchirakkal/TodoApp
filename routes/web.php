<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::post('/List',[TodoController::class, 'index']);

// Route::middleware(['auth', 'verified'])->group(function () {
//     // Route::get('/List', [TodoController::class, 'index'])->name('todos.list');
//     Route::get('/Dashboard', [TodoController::class, 'index'])->name('todos.list');
//     // Route::post('/List', [TodoController::class, 'store'])->name('todos.store');
//     Route::post('/Dashboard', [TodoController::class, 'store'])->name('todos.store');
//     Route::put('/todos/{todo}', [TodoController::class, 'update'])->name('todos.update');
//     Route::get('/todos/{todo}/edit', [TodoController::class, 'edit'])->name('todos.edit');
//     Route::delete('/todos/{todo}', [TodoController::class, 'destroy'])->name('todos.destroy');
//     // Route::post('/todos/reorder', [TodoController::class, 'reorder'])->name('todos.reorder');
//     Route::post('/todos/{todo}/status', [TodoController::class, 'updateOrderAndStatus'])->name('todos.updateOrderAndStatus');


// });

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [TodoController::class, 'index'])->name('dashboard');
    Route::post('/todos', [TodoController::class, 'store'])->name('todos.store');
    Route::get('/todos/{todo}/edit', [TodoController::class, 'edit'])->name('todos.edit');
    Route::put('/todos/{todo}', [TodoController::class, 'update'])->name('todos.update');
    Route::delete('/todos/{todo}', [TodoController::class, 'destroy'])->name('todos.destroy');
    Route::post('/todos/reorder', [TodoController::class, 'reorder'])->name('todos.reorder');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
