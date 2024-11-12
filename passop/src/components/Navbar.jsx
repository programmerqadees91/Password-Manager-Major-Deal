import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between items-center px-4 h-14 py-5 ">

        <div className="logo font-bold text-2xl">
        <span className='text-green-700'>&lt;</span>
            Pass
            <span className='text-green-700'>OP/&gt;</span>
            </div>
      <ul>
        {/* <li className='flex gap-11'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/">About</a>
            <a className='hover:font-bold' href="/">Contact</a>
        </li> */}
      </ul>
      <button className='text-white bg-green-700 my-5 flex rounded-full justify-center items-center ring-white ring-1'>
        <img className='p-2 w-12' src="/icons/github 2.png" alt="" />
        <span className='font-bold px-2'>Github</span>
      </button>
        </div>
    </nav>
  )
}

export default Navbar
