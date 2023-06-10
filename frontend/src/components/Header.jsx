import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios";

const Header = () => {
  const [email,setEmail] = useState('')
  useEffect(()=>{
    let token = (sessionStorage.getItem('data'));
    (async()=>{
      //console.log(token,'susususu')
     let fedata= await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/profile`,{ headers: {"Authorization" : `Bearer ${token}`} })
     //console.log(fedata.data.data,'asd')
     setEmail(fedata.data.data.email)
    })()
  },[])

  const logout =()=>{
    sessionStorage.setItem('data',' ');
    setEmail('')
   // Navigate('/login')
  }

  return (
    <div>
      <div className="Parent flex">
        <div className=" bg-red-300 text-3xl font-bold w-full px-2"><Link to={""}>Blogs</Link></div>
        <nav className="flex flex-row px-4 text-lg justify-end items-center gap-6 bg-slate-500">
          {email ?<> <Link to="/newPost">newPost</Link>
          <Link  onClick={logout}>Logout</Link></>: 
         <> <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
          }
         
        </nav>
      </div>
    </div>
  )
}

export default Header
