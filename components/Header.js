import React from 'react'

function Header({ name, img }) {
  return (
    <div className="flex items-center justify-between bg-[#101010]">
      <h1 className="ml-5 cursor-pointer p-2 text-3xl text-white">Edvora</h1>
      <div className="flex items-center p-2">
        <h1 className="cursor-default p-2 text-lg text-white">{name}</h1>
        <img className="h-16 rounded-full p-2" src={img} alt="" />
      </div>
    </div>
  )
}

export default Header
