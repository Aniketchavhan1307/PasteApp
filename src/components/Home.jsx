import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // Destructure useSearchParams
  const pasteId = searchParams.get("pasteId"); // Get pasteId from the search params
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch()

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // If pasteId is present, update the paste
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("")
    setValue("");

    // Remove the pasteId from the URL after creating/updating a paste
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    // navigate("/");
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes])


  return (
    <div className="w-full h-full py-10 max-w-[1200px]  mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // Dynamic width based on whether pasteId is present
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            }   text-white border  border-input rounded-md p-2`}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={createPaste}
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>

        {pasteId &&  <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={resetPaste}
          >
            <PlusCircle size={20} />
          </button>}
        </div>

        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            {/* Circle and copy btn */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              {/*Copy  button */}
              <button
                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="group-hover:text-success-500" size={20} />
              </button>
            </div>
          </div>

          {/* TextArea */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            className="w-full p-3  focus-visible:ring-0"
            style={{
              caretColor: "#000",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;























// import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router';
// import { addToPastes, updateToPastes } from '../redux/pasteSlice';
// import Paste from './Paste';
// import { useDispatch, useSelector } from 'react-redux'

// const Home = () => {
//     const [title, setTitle] = useState('');
//     const [value, setValue] = useState('');
//     const [searchParam, setSearchParam] = useSearchParams();
//     const pasteId = searchParam.get('pasteId');
//     const dispatch = useDispatch();
//     const pastes= useSelector((state)=> state.paste.pastes)


   
    

//     const createPaste = ()=>
//     {
//         const paste = {
//             title : title,
//             content: value,
//             _id : pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2), 
//             createdAt : new Date().toISOString(),
//         }


//         if(pasteId)
//         {
//             //update
//             dispatch(updateToPastes(paste));
//         }
//         else
//         {
//             // create
//             dispatch(addToPastes(paste));
//         }

//         // after the creation or update 
//         setTitle("");
//         setValue("");
//         setSearchParam("");
//     };

//     const resetPaste = () => {
//         setTitle("");
//         setValue("");
//         setSearchParam({});
//         // navigate("/");
//       };

//     useEffect(() => {
//         if(pasteId)
//         {
//             const paste = pastes.find((p) => p._id === pasteId);
//          if (paste) {
//         setTitle(paste.title);
//         setValue(paste.content);
//       }
//         }
      
//     }, [pasteId, pastes])

//   return (
//   <div>
//       <div className='pt-4 flex flex-row gap-6 place-content-between'>
//         <input type="text" 
//     className="p-2 rounded-xl flex pl-3 mt-2 w-[65%]" 
//          placeholder='Enter text here...'
//          value={title}
//          onChange={(e)=> setTitle(e.target.value)}
//          />
//          <button onClick={createPaste}>
//             {
//                 pasteId? "UPdate Paste" : "Create my Paste"
//             }
//          </button>
//     </div>
   
//     <div>
//         <textarea className='rounded-2xl p-5 mt-5  h-96 min-w-[599px]'
//             value={value}
//             placeholder='Enter contents here...'
//             onChange={(e)=> setValue(e.target.value)}
//         />
        
//     </div>
//   </div>
//   )
// }

// export default Home