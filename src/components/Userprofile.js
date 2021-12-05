import React,{useState,useEffect} from 'react'
import { Link, useHistory,useParams } from 'react-router-dom'

const Userprofile = () => {
   const [myposts,setMyposts]=useState([])
   const [user,setData]=useState();
   const [followUserData,SetfollowUser]=useState();
   const history=useHistory()
   const {id}=useParams();
   console.log("id-->",id);

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
      //amar data
      console.log("new coming data",Data)
      console.log(user?.followers?.length)
      console.log("userposts len",user?.userPosts)
      setData(Data);
   }
   useEffect(()=>{
       getUser();

   },[])





   //end auth
//get all user post
const getUserPost=async()=>{
   //   const res=await fetch('/get/myposts');
     const res=await fetch(`/profile/${id}`);
     const jsonData=await res.json();
     console.log("json data",jsonData);
     setMyposts(jsonData);
     SetfollowUser(jsonData);
}

const followUser=async(followId)=>{
   
   if(followId){
      const res=await fetch('/follow',{
         method:"PUT",
         headers:{
           Accept:"application/json",
           "Content-Type":"application/json"
       },
       body:JSON.stringify({followId}),
       credentials:'include'
     })
     const data=await res.json();
     alert("  User  Follow successful 😍 ")
     //call after follwing
     getUserPost();
     console.log("follow res",data);
     console.log("follow user data",data.data1);
     console.log("follow user data",data.data1.followers.length);
     SetfollowUser(data);
     console.log("len",followUserData?.data1?.followers.length);

   }
   


}


//unfollow user
const unFollowUser=async(unfollowId)=>{
   
   if(unfollowId){
      const res=await fetch('/unfollow',{
         method:"PUT",
         headers:{
           Accept:"application/json",
           "Content-Type":"application/json"
       },
       body:JSON.stringify({unfollowId}),
       credentials:'include'
     })
     const data=await res.json();
     alert("  User unFollow successful 😍  ")
     //call after follwing
     getUserPost();
     console.log("follow res",data);
     console.log("follow user data",data.data1);
     console.log("follow user data",data.data1.followers.length);
     SetfollowUser(data);
     console.log("len",followUserData?.data1?.followers.length);

   }
   


}





//end unfollow











   useEffect(()=>{
       getUserPost();
   },[])
    return (
        <div className="Userprofile__container p-4">
           <div className="container mt-4">
           <div className="row border-bottom">
              <div className="col-md-10 mx-auto d-flex justify-content-evenly ">
                 
            
                   {/* <div className="img__div">
                         <img width={200} height={200} src="https://tse2.mm.bing.net/th?id=OIP.fF2QC10UTINkE6u5mkAZlwAAAA&pid=Api&P=0&w=300&h=300" alt="" />
                   </div> */}
                   <div className="Userprofile__info">
                     <h3>{myposts?.User?.name}</h3>
                     <h5>{myposts?.User?.email}</h5>
                     
                     { user?._id!==myposts?.User?._id &&
                        <div className="follow_unfollow_box ">
                        {/* <button onClick={()=>followUser(myposts?.User?._id)} className="btn btn-primary m-3">follow</button> */}
                        {
                           myposts?.User?.followers.includes(user?._id) ? (<button
                            onClick={()=>unFollowUser(myposts?.User?._id)}
                           className="btn btn-danger">unfollow</button>):( <button onClick={()=>followUser(myposts?.User?._id)} className="btn btn-primary m-3">follow</button>) 
                        }
                        
                     </div>
                  }
                    
                     <div className="followers__div d-flex justify-content-evenly shadow p-4">
                          <p className="p-3">{myposts?.userPosts?.length} posts</p>
                            <p className="p-3">{myposts?.User?.followers.length} followers</p>
                            <p className="p-3">{myposts?.User?.following.length} folllowing</p>
                       
                        {
                           !followUserData?.data1?.followers?.includes(user._id) ? (
                            <>
                           
                             

                            {/* <p className="p-3">{followUserData?.data1?.followers?.length} followers</p>
                            <p className="p-3">{followUserData?.data1?.following?.length} folllowing</p> */}
                            {/* <p className="p-3">{myposts?.userPosts?.length} posts</p>
                        <p className="p-3">{myposts?.User?.followers?.length} followers</p>
                        <p className="p-3">{myposts?.User?.following?.length} folllowing</p> */}
                          </> ):(
                        <>
                     {/* <p className="p-3">{followUserData?.data2?.followers?.length} followers</p> */}
                     {/* <p className="p-3">{followUserData?.data2?.following?.length} folllowing</p> */}

                        {/* <p className="p-3">{myposts?.userPosts?.length} posts</p>
                        <p className="p-3">{user?.followers?.length} followers</p>
                        <p className="p-3">{user?.following?.length} folllowing</p>
                        <p className="p-3">{myposts?.User?.followers?.length}follwers posts</p>
                        <p className="p-3">{myposts?.User?.following?.length} following posts</p> */}
                         </>  )
                        }
                       

                     </div>
                     {/* <div className="user__info mr-auto bg-dark  text-white p-2">
                        <div className="mr-auto">
                           <h4 className="mr-auto">Subha duley</h4>
                        </div>
                        <p>Computer science engineering 2nd year student in University Institute of technology (Burdwan)</p>

                     </div> */}
                     <hr />
                       <div>
                        
                       </div>
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
                          myposts?.userPosts?.map((mypost,index)=>{
                             return (
                              <div className="img__div p-3 " key={index}>
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

export default Userprofile;