import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);

    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    return (
        <div className='leading-9'>
            <input
                className='p-2 rounded-2xl min-w-[600px] mt-5'
                type='text'
                placeholder='Search here'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='flex flex-col gap-5 mt-4'>
                {
                    filteredData.length > 0 &&
                    filteredData.map((paste) => {
                        return (
                            <div className='border text-white'>
                                <div>
                                    {paste.title}
                                </div>
                                <div>
                                    {paste.content}
                                </div>
                                <div className='flex flex-row text-black place-content-evenly'>
                                    <button >
                                        <a href={`/?pasteId=${paste?._id}`}>
                                            Edit
                                        </a>
                                    </button>
                                    <button>
                                        <a href={`/pastes/${paste?._id}`}>
                                            View
                                        </a>
                                    </button>
                                    <button onClick={() => handleDelete(paste?._id)}>
                                        Delete
                                    </button>
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(paste?.content)
                                        toast.success("Copied to Clipboard");
                                    }}>
                                        Copy
                                    </button>
                                    {/* <button> */}
                                    {/* homework */}
                                    {/* Share
                                    </button> */}
                                    <button
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator
                                                    .share({
                                                        title: paste?.title || "Untitled Paste",
                                                        text: paste?.content,
                                                        url: window.location.origin + `/pastes/${paste?._id}`, // URL of the paste
                                                    })
                                                    .then(() => {
                                                        toast.success("Paste shared successfully!");
                                                    })
                                                    .catch((error) => {
                                                        toast.error("Error sharing paste: " + error.message);
                                                    });
                                            } else {
                                                toast.error("Sharing is not supported in your browser.");
                                            }
                                        }}
                                    >
                                        Share
                                    </button>

                                </div>
                                <div>
                                    {paste.createdAt}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Paste
