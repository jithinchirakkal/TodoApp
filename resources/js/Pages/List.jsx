// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head,usePage,useForm,Link, } from "@inertiajs/react";


export default function List(){



    const { delete:destroy } = useForm();

    // const { edit:update } = useForm();
    
    const { todos } = usePage().props;

    function handleDelete(todo){
        // e.preventDefault();
        destroy(`/todos/${todo}`);
    }


    console.log(todos)

    return(

        <>
            <div className="flex justify-between items-center p-3 mb-2  bg-orange-300">
                <h1 className="title text-white text-lg  ">ToDo List</h1>

                <Link href={route('dashboard')} className="bg-black rounded-md  px-4 py-2 text-white ">Create</Link>
            </div>
            <div className="flex justify-between">
                <ul className="w-full">
                    {todos.map(todo => (
                        <div className=" p-3 border bg-slate-400 rounded-md ">
                            <li key={todo.id}>
                                {todo.Items}
                                <div className="flex  gap-3">
                                    <Link href={`/todos/${todo.id}/edit`} className="bg-blue-600 rounded-md text-sm text-white px-4 py-2">Update</Link>
                                    {/* <button href={`/todos/${todo.id}/edit`}  className="bg-blue-600 text-white rounded-md py-2 px-6 " onClick={() => handleEdit(todo.id)}>Update</button> */}

                                    <button className="bg-red-600 text-white rounded-md py-2 px-6 " onClick={() => handleDelete(todo.id)}>Delete</button>

                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>

        
        </>
    )
}