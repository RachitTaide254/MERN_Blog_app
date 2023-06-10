import React ,{useState} from "react";
//import { ImagetoBase64 } from '../utility/ImagetoBase64'
import axios from "axios";
import Header from "../components/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { Navigate } from "react-router-dom";

export const CreatePost = () => {
  const [data, setData] = useState({
    Title: "",
    image: "",
    //description: "",
  });
  const [content, setContent] = useState('')
  const [redirect, setRedirect] = useState(false)

//console.log(data,'data')
//console.log(content,'content')
  const handleOnChange =(e)=>{
    const {name,value} = e.target
    //console.log(name,value)
    setData((prev)=>{
        return{
          ...prev,
          [name] : value
        }
    })
  }

  const uploadImage =async(e)=>{
    const data = await ImagetoBase64(e.target.files[0]);
    //console.log(data)
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = (sessionStorage.getItem('data'));

    const {Title,image} = data
    //console.log(data)
    data.content = content;
     if(Title && image && content ){
        //console.log('alll')
    const fetchData = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/uploadBlog`,data,{ headers: {"Authorization" : `Bearer ${token}`} }
    ); 
    console.log(fetchData.data,'sd222');
    setData(()=>{
        return{
          Title : "",
          image : "",
        }
      })
    setContent('')
    if(fetchData.data.alert){
        setRedirect(true)
      }else{
        alert('email id is not correct')
      }
     }
     
  };
  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <>
      <Header />
      <div className="p-4">
        <form
          className="m-auto w-full bg-white max-w-md my-2 flex flex-col p-3 shadow"
          onSubmit={handleSubmit}
        >
          <label htmlFor="Title" className="">
            Title
          </label>
          <input
            type={"text"}
            className="bg-slate-200 p-1 my-1"
            name="Title"
            value={data.Title}
            onChange={handleOnChange}
          ></input>

          <label htmlFor="image">
            Image
            <div
            name="image"
              id="image"
              className="h-40 w-full flex items-center justify-center rounded cursor-pointer bg-slate-300"
            >
              {/* {
              data.image ? <img src={data.image} className="h-full" /> : <span className="text-8xl"><AiOutlineCloudUpload /></span> 
            } */}
              <input type={"file"}  accept="image/*" id="image" onChange={uploadImage}/>
            </div>
          </label>

          <label htmlFor="description" className="my-1">
            Description
          </label>

          <ReactQuill value={content} name="description" onChange={newValue=>setContent(newValue)}/>

          <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium my-2 drop-shadow">
            Save
          </button>
        </form>
      </div>
    </>
  );
};
