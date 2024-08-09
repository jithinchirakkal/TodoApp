import { Head,useForm,usePage } from '@inertiajs/react';


export default function Edit({elament}){

    const { data, setData, put, processing, errors } = useForm({
        Items: elament.Items,
    });

    function submit(e){
        e.preventDefault();
        put(route('todos.update',elament.id));

    }

    return(
        <>
            <div className='flex justify-center p-10 bg-gradient-to-br from-cyan-600
             via-zinc-200 to-sky-400 h-screen'>
                <form className='flex-col w-full' onSubmit={submit}>
                    <div className='flex justify-center m-10 text-5xl font-extrabold'>Edit Your Todo</div>
                    <div className='flex gap-3 justify-center'>
                        <input type="text" className='flex rounded-md shadow-md w-full shadow-gray-700  p-3 bg-black text-white' placeholder='Enter your todo ...'
                        value={data.Items} 
                        onChange={(e) => setData("Items", e.target.value)}
                        required
                            />
                        <button className='bg-green-500 text-white shadow-md shadow-lime-600 px-4 py-2 rounded-md'>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}