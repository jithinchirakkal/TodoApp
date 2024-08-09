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
        $columns = [
            'pending' => [
                'title' => 'To Do',
                'items' => Todo::where('status', 'pending')->get(),
            ],
            'in_progress' => [
                'title' => 'In Progress',
                'items' => Todo::where('status', 'in_progress')->get(),
            ],
            'done' => [
                'title' => 'Done',
                'items' => Todo::where('status', 'done')->get(),
            ],
        ];

        return Inertia::render('Dashboard', compact('columns'));
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

        Todo::create([
            'Items' => $request->Items,
            'status' => 'todo',
        ]);

        return redirect()->route('dashboard');

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

        // $todo->update($request->all());
        $todo->update([
            'Items' => $request->Items,
            'status' => $request->status, // Handle status change
        ]);
        return redirect()->route('dashboard');
        // return redirect()->route('todos.list');
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

        return redirect()->route('dashboard');
    }
    
    public function reorder(Request $request)
    {
        $columns = $request->columns;

        foreach ($columns as $status => $column) {
            foreach ($column['items'] as $index => $item) {
                Todo::where('id', $item['id'])->update([
                    'status' => $status,
                    'order' => $index,
                ]);
            }
        }
        return redirect()->route('dashboard');
        // return response()->json(['status' => 'success']);
    }
}
