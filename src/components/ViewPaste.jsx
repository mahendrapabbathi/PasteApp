import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {

    const {id} =useParams();
    const allPastes = useSelector((state)=>state.paste.pastes);
    const paste=allPastes.filter((p)=>p._id===id)[0];
    console.log("Final paste:",paste);

  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between text-black text-[18px]'>
      <input 
        className='p-3 rounded-2xl  mt-2 w-[100%] pl-4'
        type='text'
        placeholder='Enter title here'
        value={paste.title}
        disabled
        onChange={(e)=>setTitle(e.target.value)}
      />
      {/* <button 
      onClick={createPaste}
      className='p-2 rounded-2xl  mt-2'>
        {
            pasteId?"Update My Paste":"Create My Paste"
        }
      </button> */}
    </div>
    <div className='mt-8'>
        <textarea 
        className='rounded-2xl min-w-[500px] p-4 text-black text-[18px]'
            value={paste.content}
            placeholder="Enter content here"
            disabled
            onChange={(e)=>setValue(e.target.value)}
            rows={20}
            >
        </textarea>
    </div>
    </div>
  )
}

export default ViewPaste
