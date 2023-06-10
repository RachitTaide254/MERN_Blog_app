import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header.jsx"
import { IndexCard } from "./components/IndexCard";
import {Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login"
import { Register } from "./pages/Register";
import { CreatePost } from "./pages/CreatePost";
import { SingleBlog } from "./pages/SingleBlog";
import { EditBlog } from "./pages/EditBlog";

function App() {
  //const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )

  return (
    <Routes>
      <Route path="/" element={<IndexCard/>} />
      <Route index element ={<IndexCard/>} />
      <Route path='/login' element ={<Login />}/>
      <Route path='/register' element ={<Register/>}/>
      <Route path='/newPost' element ={<CreatePost/>}/>
      <Route path='/blog/:id' element ={<SingleBlog/>}/>
      <Route path='/editBlog/:id' element ={<EditBlog/>}/>

    </Routes>
  );
  //   return (
  //   <>
  //   <IndexCard/>
  //   </>  
  // );
}

export default App;
