import React,{useEffect} from 'react'
import { useState } from 'react';
import {Link ,useHistory} from "react-router-dom"


const Navbar = () => {
  const [user,userAuth]=useState();
  console.log("user -->",user)
   //check auth
   const history=useHistory();
   const getUser=async()=>{
    const res=await fetch('/auth',{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        credentials:'include'
    });
    const Data=await res.json();
    if(res.status===400){
            history.push('/signin')
    }
    console.log(res)
    console.log("auth user",Data)
    userAuth(Data);
 }
 useEffect(()=>{
     getUser();

 },[])
    return (
      <nav className="navbar navbar-expand-lg navbar-dark navclr my_header">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">CODERS_INSTAGRAM</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">signup</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin">signin</Link>
            </li>
           
              <li className="nav-item">
                 <Link className="nav-link" to="/create">create post</Link>
                </li>
                  
                 
                     <li className="nav-item">
                         <Link className="nav-link" to={`/profile/${user?._id}`}>
                           <option>profile</option>
                         </Link>
                      </li>
                    
          </ul>
        </div>
      </div>
    </nav>
    )
}

export default Navbar
