import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'

const Profile = () => {
   const [myposts,setMyposts]=useState([])
   const history=useHistory()

   //check auth
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
      console.log(Data)
   }
   useEffect(()=>{
       getUser();

   },[])





   //end auth
//get all user post
const getUserPost=async()=>{
     const res=await fetch('/get/myposts');
     const jsonData=await res.json();
     console.log(jsonData);
     setMyposts(jsonData)
}
   useEffect(()=>{
       getUserPost();
   },[])
    return (
        <div className="profile__container p-4">
           <div className="container mt-4">
           <div className="row border-bottom">
              <div className="col-md-10 mx-auto d-flex justify-content-evenly ">
            
                   <div className="img__div">
                         <img width={200} height={200} src="https://tse2.mm.bing.net/th?id=OIP.fF2QC10UTINkE6u5mkAZlwAAAA&pid=Api&P=0&w=300&h=300" alt="" />
                   </div>
                   <div className="profile__info">
                     <h3>subhaduleygba</h3>
                     <div className="followers__div d-flex justify-content-evenly">
                        <p className="p-3">100 posts</p>
                        <p className="p-3">26 followers</p>
                        <p className="p-3">43 folllowing</p>

                     </div>
                     <div className="user__info mr-auto bg-dark  text-white p-2">
                        <div className="mr-auto">
                           <h4 className="mr-auto">Subha duley</h4>
                        </div>
                        <p>Computer science engineering 2nd year student in University Institute of technology (Burdwan)</p>

                     </div>
                     <hr />
                   </div>
                  

              </div>

           </div>
          

           </div>
           <div className="main__section">
             <div className='container'>
              <div className='row gx-3 gy-3'>
                  <div className='col-md-10 mx-auto'>
                       <div className="img__box d-flex justify-content-evenly flex-wrap">
                       {
                          myposts?.map((mypost)=>{
                             return (
                              <div className="img__div p-3 ">
                               <img height={300} width={300} src={mypost.photo} alt="" />
                             </div>

                             )
                          })
                       }
                          
                          
                        
                       </div>
                  </div>

              </div>

             </div>

           </div>
        </div>
    )
}

export default Profile
