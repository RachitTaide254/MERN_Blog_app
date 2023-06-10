import React, { useEffect, useState } from 'react'
import Header from "../components/Header"
import axios from "axios";
import { AllBlogs } from '../pages/AllBlogs';

export const IndexCard = () => {
  const [post, setPost] = useState([]);

  useEffect(()=>{
    let token = (sessionStorage.getItem('data'));
    (async()=>{
      //console.log(token,'susususu')
     let fedata= await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/blogs`,{ headers: {"Authorization" : `Bearer ${token}`} })
     //console.log(fedata.data,'asd')
     //setEmail(fedata.data.data.email)
     setPost(fedata.data)
    })()
  },[])
  
  return (
    <div>
        <Header/>
        {/* <div className="container m-4 px-20 py-5  ">
        <div className="box-border h-full w-full p-4 border-4">
          <img
            className="float-left h-44 w-68 rounded-lg p-1 "
            src="https://www.hindustantimes.com/ht-img/img/2023/05/27/550x309/gill__dhoni_final_1685211986566_1685211996715.jpg"
          ></img>
          <p className='font-bold text-2xl'>Indian Official Who Drained a Reservoir to Retrieve His Phone Is Suspended</p>
          <div className='text-sm flex gap-4'>
            <div>author</div>
            <div>time</div>
            </div>
          <p className="px-20">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis quisquam officiis possimus voluptas perferendis enim
            non harum asperiores, atque porro a deleniti qui molestias dolor
            error alias beatae amet exercitationem.The incident drew criticism
            from some prominent pundits and politicians, including Raman Singh,
            a former Chhattisgarh State chief minister. “Today in the scorching
            heat people are dependent on tankers, there is no arrangement for
            even drinking water,” Mr. Singh, a leader from India’s governing
            Bharatiya Janata Party, which is in opposition in the state, wrote
            on Twitter on Friday. At the same time, he added, with the water
            drained in the effort to retrieve Mr. Vishwas’s phone, “one and a
            half thousand acres of land could have been irrigated.” India, which
            is amongrate in the area, said that local farmers did rely on it to
            irrigate their fields. “He will face consequences for draining the
            water, and this won't be tolerated,” she added.
          </p>
        </div>
        <div className="box-border h-full w-full p-4 border-4">
          <img
            className="float-left h-44 w-68 rounded-lg p-1 "
            src="https://www.hindustantimes.com/ht-img/img/2023/05/27/550x309/gill__dhoni_final_1685211986566_1685211996715.jpg"
          ></img>
            <p className='font-bold text-2xl'>Indian Official Who Drained a Reservoir to Retrieve His Phone Is Suspended</p>
            <p className='text-sm'>author</p>
          <p className="px-20">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis quisquam officiis possimus voluptas perferendis enim
            non harum asperiores, atque porro a deleniti qui molestias dolor
            error alias beatae amet exercitationem.The incident drew criticism
            from some prominent pundits and politicians, including Raman Singh,
            a former Chhattisgarh State chief minister. “Today in the scorching
            heat people are dependent on tankers, there is no arrangement for
            even drinking water,” Mr. Singh, a leader from India’s governing
            Bharatiya Janata Party, which is in opposition in the state, wrote
            on Twitter on Friday. At the same time, he added, with the water
            drained in the effort to retrieve Mr. Vishwas’s phone, “one and a
            half thousand acres of land could have been irrigated.” India, which
            is amongrate in the area, said that local farmers did rely on it to
            irrigate their fields. “He will face consequences for draining the
            water, and this won't be tolerated,” she added.
          </p>
        </div>
      </div> */}
      {post.length > 0 && post.map(p=><AllBlogs key={p._id} {...p}/>)}
    </div>
  )
}
