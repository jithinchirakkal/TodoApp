<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $todos = Todo::all();
        $todos = Todo::orderBy('order')->get();
        // $todos = Todo::latest();
        return Inertia::render('Dashboard', [
            'todos' => $todos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return inertia('List');
        return inertia('Dashboard');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Items' => 'required|string|max:255',
        ]);

        $lastOrder = Todo::max('order');

        Todo::create([
            'Items' => $request->Items,
            'order' => $lastOrder + 1,
        ]);

        return redirect()->route('todos.list');
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        return Inertia::render('Edit',['elament' =>$todo ]);
        // return redirect('/List');
        // return redirect('/Dashboard');

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'Items' => 'required|string|max:255',
        ]);

        $todo->update($request->all());

        return redirect()->route('todos.list');
    }


    public function updateOrderAndStatus(Request $request)
{
    foreach ($request->todos as $todoData) {
        $todo = Todo::find($todoData['id']);
        $todo->update([
            'order' => $todoData['order'],
            'status' => $todoData['status']
        ]);
    }
    return redirect()->route('todos.list');
    // return response()->json(['status' => 'success']);
}


    // public function reorder(Request $request)
    // {
    //     foreach ($request->todos as $index => $todo) {
    //         Todo::where('id', $todo['id'])->update(['order' => $index]);
    //     }

    //     return redirect()->back();
    // }

    // public function updateStatus(Request $request, Todo $todo)
    // {
    //     $request->validate([
    //         'status' => 'required|string|in:Pending,In Progress,Done',
    //     ]);

    //     $todo->update(['status' => $request->status]);

    //     return response()->json(['status' => 'success']);

    // }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return redirect()->route('todos.list');
    }
}
