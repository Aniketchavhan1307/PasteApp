import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import { FormatDate } from "../utlis/formatData";

const Paste = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const pastes = useSelector((state) => state.paste.pastes);
    console.log(pastes);

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(removeFromPastes(id));
      };
    

   // Filter pastes based on search term (by title or content)
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (



    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
    <div className="flex flex-col gap-y-3">
      {/* Search */}
      <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
        <input
          type="search"
          placeholder="Search paste here..."
          className="focus:outline-none w-full bg-transparent"
          value={searchTerm} // Bind the input to searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
        />
      </div>

      {/* All Pastes */}
      <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
        <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
          All Pastes
        </h2>
        <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
          {filteredPastes.length > 0 ? (
            filteredPastes.map((paste) => (
              <div
                key={paste?._id}
                className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
              >
                {/* heading and Description */}
                <div className="w-[50%] flex flex-col space-y-3">
                  <p className="text-4xl font-semibold ">{paste?.title}</p>
                  <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                    {paste?.content}
                  </p>
                </div>

                {/* icons */}
                <div className="flex flex-col gap-y-4 sm:items-end">
                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <button
                      className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                      // onClick={() => toast.error("Not working")}
                    >
                      <a href={`/?pasteId=${paste?._id}`}>
                        <PencilLine
                          className="text-black group-hover:text-blue-500"
                          size={20}
                        />
                      </a>
                    </button>
                    <button
                      className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                      onClick={() => handleDelete(paste?._id)}
                    >
                      <Trash2
                        className="text-black group-hover:text-pink-500"
                        size={20}
                      />
                    </button>

                    <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                      <a href={`/pastes/${paste?._id}`} target="_blank">
                        <Eye
                          className="text-black group-hover:text-orange-500"
                          size={20}
                        />
                      </a>
                    </button>
                    <button
                      className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to Clipboard");
                      }}
                    >
                      <Copy
                        className="text-black group-hover:text-green-500"
                        size={20}
                      />
                    </button>
                  </div>

                  <div className="gap-x-2 flex ">
                    <Calendar className="text-black" size={20} />
                    {FormatDate(paste?.createdAt)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-2xl text-center w-full text-chileanFire-500">
              No Data Found
            </div>
          )}
        </div>
      </div>
    </div>
  </div>












    // <div >
    //     <input type="text" 
    //     className = "p-4  rounded-2xl flex pl-3 mt-5 min-w-[600px]"
    //     placeholder='Search here'
    //     value={searchTerm}
    //     onChange={(e)=> setSearchTerm(e.target.value)}
    //     />

    //     <div className='flex flex-col gap-5 mt-9'>
    //         {
    //             filteredData.length > 0 && 
    //             filteredData.map(
    //                 pastes =>{
    //                     return <div className='border rounded-lg' key={pastes?._id}>
    //                        <div>
    //                        {pastes.title}
    //                        </div>
                           
    //                        <div>
    //                         {pastes.content}
    //                        </div>

    //                        <div className='flex flex-row fap-4 place-content-evenly'>
    //                        <button ><a href={`/?pastes=${pastes?._id}`}>Edit</a> </button>
    //                        <button > <a href={`/pastes/${Paste?._id}`}>View</a> </button>
    //                        <button onClick={() => handleDelete(Paste?._id)}>Delete</button>
                          
    //                        <button onClick={()=>{navigator.clipboard.writeText(pastes?.content) 
    //                         toast.success("Copied to clipboard")}}>Copy</button>
                          
    //                        <button onClick={handleShare}>Share</button>
    //                        </div>

    //                        <div>
    //                         {pastes.createdAt}
    //                        </div>
                       
    //                     </div>
    //                 }
    //             )
    //         }

    //     </div>

    // </div>
  )
}

export default Paste