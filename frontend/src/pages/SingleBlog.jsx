import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

export const SingleBlog = () => {
    const [post, setPost] = useState([]);
    const {id} = useParams()
    //console.log(id,'papa')
    let author_id = (sessionStorage.getItem('id'));
    useEffect(()=>{
        let token = (sessionStorage.getItem('data'));
        (async()=>{
          //console.log(token,'susususu')
         let fedata= await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/blog/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
         //console.log(fedata,'fish')
         //setEmail(fedata.data.data.email)
         setPost(fedata.data[0])
        })()
      },[])
 //console.log(post)
 const {_id,Title,image,content,createdBy} = post
    return (
    <div><div className="h-60 flex flex-col items-center justify-center bg-red-400">
    <div className="">
    <img className="object-cover h-72 rounded-full mt-96" src={image}></img>
    </div>
    <div className='w-full flex justify-end gap-6   px-5'>
    <Link to='/'> <button className='rounded-full p-2 flex bg-slate-300' >Back to HomePage</button></Link>
    {/* {
    (createdBy === author_id)&& 
  } */}
   <Link to={`/editblog/${_id}`}><button className='rounded  p-2 bg-black text-white' >Edit</button></Link>
    </div>
    <p className=" flex-col">Author:{createdBy}</p>
    <p className=" text-3xl font-bold italic">{Title}</p>
    <div className="flex flex-col max-w-xl h-28">
        <div dangerouslySetInnerHTML={{__html:content}}/>
  {/* <p dangerouslySetInnerHTML={{__html:content}}>{content} </p> */}
  </div>
  </div></div>
  )
}
