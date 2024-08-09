import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { useForm } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Inertia } from '@inertiajs/inertia';

function Dashboard({ auth, columns }) {
    const { data, setData, post, processing } = useForm({
        Items: '',
    });

    function submit(e) {
        e.preventDefault();

        post(route('todos.store'), {
            onSuccess: () => {
                setData("Items", ""); // Clear input field after submission
            },
        });
    }

    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this todo?')) {
            Inertia.delete(route('todos.destroy', id), {
                onSuccess: () => {
                    // Optionally refresh the data without reloading the page
                },
            });
        }
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const { source, destination } = result;

        // Clone columns object to work with
        const updatedColumns = { ...columns };

        // Remove item from the source column and add it to the destination column
        const [movedItem] = updatedColumns[source.droppableId].items.splice(source.index, 1);
        updatedColumns[destination.droppableId].items.splice(destination.index, 0, movedItem);

        Inertia.post(route('todos.reorder'), {
            columns: updatedColumns,
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gradient-to-br from-cyan-600 via-zinc-200 to-sky-400">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
                <div className='flex justify-center p-10'>
                    <form onSubmit={submit}>
                        <div className='flex gap-3'>
                            <input
                                type="text"
                                className='flex rounded-md w-96 shadow-lg shadow-slate-500'
                                placeholder='Enter your todo ...'
                                value={data.Items}
                                onChange={(e) => setData("Items", e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className='bg-blue-500 px-4 py-2 shadow-md shadow-sky-800 rounded-md'
                                disabled={processing}
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex justify-between gap-3">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        {Object.entries(columns).map(([status, column]) => (
                            <Droppable key={status} droppableId={status}>
                                {(provided) => (
                                    <div className="w-1/3 border rounded-lg" ref={provided.innerRef} {...provided.droppableProps}>
                                        <h2 className="text-center font-bold mb-4">{column.title}</h2>
                                        <ul className="w-full">
                                            {column.items.map((todo, index) => (
                                                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                                    {(provided) => (
                                                        <li
                                                            className='flex justify-between items-center p-4 mb-2 rounded-md text-white bg-black'
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            {todo.Items}
                                                            <div className="flex gap-3">
                                                                <Link href={`/todos/${todo.id}/edit`} className="bg-blue-600 rounded-md shadow-md shadow-stone-500 text-sm text-white px-4 py-2">
                                                                    Update
                                                                </Link>
                                                                <button
                                                                    className="bg-red-600 text-white rounded-md shadow-md shadow-gray-500 py-2 px-6"
                                                                    onClick={() => handleDelete(todo.id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </ul>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </DragDropContext>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
