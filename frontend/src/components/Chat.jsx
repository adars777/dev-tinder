import React from 'react'
import { useParams } from 'react-router';
import { IoMdSend } from "react-icons/io";


const Chat = () => {
  const {targetUserId} = useParams;
  return (
    <div className='mt-20 w-2/3 h-[70vh]  mx-auto flex border-2 flex-col justify-between'>
      <div className='border-b-2 text-3xl '>Chat</div>
      <div className='flex'>
        <input className='border-2 w-[75%] m-3 rounded-xl p-2' type="text" placeholder='Enter Message here...'/>
        <button type="submit" className=' flex gap-2 m-3  px-3 rounded-xl items-center bg-blue-800 hover:bg-blue-900  transition-[background-color,width] duration-300 ease-in-out'>Send <IoMdSend />

</button>
      </div>
    </div>
  )
}

export default Chat
