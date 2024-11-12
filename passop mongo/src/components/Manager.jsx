import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from 'react'

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords);
        setpasswordArray(passwords)
        

    }


    useEffect(() => {
        getPasswords()

    }, [])



    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password"
        }
    }
    const savePassword =async() => {
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log([...passwordArray, form]);
        setform({ site: "", username: "", password: "" })
        toast.success('Password Saved!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    }
    const deletePassword =async(id) => {
        console.log("Delteting", id);
        let c = confirm("Do You Really Want To Delete This Password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost3000/",{method:"DELETE",headers:{"Content-Type":"appliation/json"},body:JSON.stringify(...passwordArray, {  id })})
            toast.success('Password Deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const editPassword = (id) => {
        console.log("elit", id);
        setform({...passwordArray.filter(i => i.id === id)[0],id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })
    }

    const copyText = (text) => {
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <div className="p-3 md:mycontainer min-h-[86.2vh]">
                <h1 className='text-4xl font-bold text-center '>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>You Own Password Manager</p>

                <div className='flex flex-col  p-4 text-black gap-5 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full w-full border border-green-800 p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex  flex-col md:flex-row w-full gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full w-full border border-green-800 p-4 py-1' type="text" name="username" id="username" />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full w-full border border-green-800 p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-[1px] top-[1px] lordiconcopy cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-2' width={35} src="/icons/eyecross.png" alt="" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 hover:bg-green-600 gap-1 rounded-full px-8 py-2 w-fit border border-green-950'>
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#000000">
                        </lord-icon>

                        Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-3 '>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='font-mono text-lg'>No Passwords To Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-50'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-black text-center'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='size-7 lordiconcopy cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/jectmwqf.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-black text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='size-7 lordiconcopy cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/jectmwqf.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-black text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='size-7 lordiconcopy cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/jectmwqf.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-black text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
