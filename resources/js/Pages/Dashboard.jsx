import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,useForm ,Link,usePage } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Dashboard({ auth }) {

    const { data, setData, post, processing, errors } = useForm({
        Items: "",
    });

    const { todos } = usePage().props;

    const { delete:destroy } = useForm();

    function submit(e){
        e.preventDefault();
        post(route('todos.store'));

    }

    function handleDelete(todo){
        // e.preventDefault();
        destroy(`/todos/${todo}`);
    }
    

    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            {/* {data.Items}  */}

            <div className="py-12 bg-gradient-to-br from-cyan-600
             via-zinc-200 to-sky-400">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
                <div className='flex justify-center p-10'>
                    <form onSubmit={submit }>
                        <div className='flex gap-3'>
                            <input type="text" className='flex rounded-md w-96 shadow-lg shadow-slate-500' placeholder='Enter your todo ...'
                            value={data.Items} 
                            onChange={(e) => setData("Items", e.target.value)}
                            required
                             />
                            <button className='bg-blue-500 px-4 py-2 shadow-md shadow-sky-800 rounded-md'>
                                Create
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <h1 className='title text-center mb-4 text-2xl font-extrabold '>ToDo List</h1>
                </div>
                <div className="flex justify-between">
                    <ul className="w-full">
                        {todos?.map(todo => (
                            <div className=" p-1">
                                <li className='flex justify-between items-center p-4 rounded-md text-white bg-black' key={todo.id}>
                                    {todo.Items}
                                    <div className="flex  gap-3">
                                    <Link href={`/todos/${todo.id}/edit`} className="bg-blue-600 rounded-md shadow-md shadow-stone-500 text-sm text-white px-4 py-2">Update</Link>

                                    <button className="bg-red-600 text-white rounded-md shadow-md shadow-gray-500 py-2 px-6 " onClick={() => handleDelete(todo.id)}>Delete</button>

                                </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}





























// {data.Items && data.Items.map((item, index) => (
//     <div className=" p-3 border bg-slate-400 rounded-md ">
//         <li key={index}>
//             {item}
//         </li>
//     </div>  
// ))}