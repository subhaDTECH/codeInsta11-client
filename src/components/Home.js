import React,{useState,useEffect, forwardRef } from 'react'
import { useHistory,Link } from 'react-router-dom'

import "../components/../App.css"

const Home = () => {
    const history=useHistory()
    const [posts,setPosts]=useState()
    const [islike,setIslike]=useState(false)
    const[user,setUser]=useState("")
    const [input,setInput]=useState('');
    console.log("posts",posts)
    console.log("user",user)
    //auth check 
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
        if(res.status==400){
                history.push('/signin')
        }
        console.log(res)
          setUser(Data)
        console.log(Data)
     }
     useEffect(()=>{
         getUser();
 
     },[])

     //end auth

     //get all post from database
     const getAllPosts=async()=>{
         const res=await fetch('/get/allposts',{
             method:"GET",
             headers:{
                 "Content-Type":"appliaction/json"
             },

         })
         const postsData=await res.json();
         console.log(postsData)
         setPosts(postsData)
         }
     useEffect(()=>{
         getAllPosts();

     },[])


    //end get all post


    //get all comments
   

    //like post
    const LikePost=async(id)=>{
        const res=await fetch('/likes',{
            method:"PUT",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:id
            }),
            credentials:'include',
            
        });
        const jsonData=await res.json();
        if(res.status===200){
            setIslike(true);
            getAllPosts();
           
        }
        console.log(jsonData)
    }
    //end like
    //unlike
    const UnLikePost=async(id)=>{
        const res=await fetch('/unlikes',{
            method:"PUT",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:id
            }),
            credentials:'include',
            
        });
        const jsonData=await res.json();
        if(res.status===200){
            setIslike(false);
            getAllPosts();
           
        }
        console.log(jsonData)
    }

    //end unlike
    //add comment 
    const addComment=async(id)=>{
     
      const resData=await fetch('/post/comment',{
          method:"PUT",
          headers:{
              Accept:'application/json',
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              text:input,
              timestamp:Date.now(),
              postId:id
          }),
          credentials:'include'

      })
      const Jsondata=await resData.json();
      if(resData.status===200){
          setInput("")
        getAllPosts();
      }
      console.log(Jsondata)
    }

   //delete post
   const DeletePost=async(postId)=>{
       const resData=await fetch(`/deletepost/${postId}`,{
           method:"DELETE",
           headers:{
               Accept:"application/json",
               "Content-Type":"application/json"
           },
           credentials:'include'
       })
       const JosnData=await resData.json();
       if(resData.status===200){
           alert("Delete Successfully")
           getAllPosts();
       }else{
           alert("post not deleted")
       }
       console.log(JosnData)

   }
//    612f63bebf9105278806668a

    return (
        <div class="home__container mb-5">
         <div className="container">
           <div className="row">
             <div className='col-md-10 post__container mr-5'>
            

               {
                   posts?.map((post)=>{
                       return (
                        <div key={post?._id} className="post__box shadow-lg  mx-auto my-3 mb-3 ">
                        {/* <Link to={`/proflie/${post.postedby._id}`}>
                            <img className="mx-auto post__img text-center img-fluid" src={post.photo} alt="photo" />    
                        </Link> */}
                        <Link className="nav-link" to={`/profile/${post?.postedby?._id}`}>
                           <img className="mx-auto post__img text-center img-fluid" src={post?.photo} alt="photo" /> 
                        </Link>
               
           
     
                <div className="post__info mt-2 mx-3">
                     <h3>{post.title}</h3>
                     <p>{post.body}</p>
                     {/* {
                         !islike? (<p className="heart">♥️</p>):( <p className="heart">❤️</p>)
                     } */}
                     {
                         post.likes.includes(user._id) ? 
                         ( <p className="heart">❤️</p>):(<p className="heart">♥️</p>)

                     }
                     
                    
                     
                     <p className="ml-1">{post?.likes?.length} likes</p>
                </div>
                <div className="likes__unlikes__btn pb-4 ">
                {
                    post.likes.includes(user._id)? (<button onClick={()=>UnLikePost(post._id)}  className='btn btn-primary mx-3'>Unlike</button>)
                    :(<button onClick={()=>LikePost(post._id)} className="btn btn-info  mx-3">Like</button>)
                }
                  {
                      post.postedby._id===user._id ? (<button onClick={()=>DeletePost(post._id)} className="btn btn-danger">Delete</button>):('')
                      
                  }  
                  {
                      console.log(post.postedby._id)
                  }
                    
                </div>
                
                <div className='comment__box form-group p-3 mb-3'>
                {
                    post?.comments?.map((comment)=>{
                       
                        return (
                            <p key={comment._id}><span><strong>{comment.postuser} </strong> {comment.text} </span></p>
                        )
                    })
                }
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    addComment(post._id);

                }} action="" className="mb-3">
                  <input 
                  value={input}
                  onChange={(e)=>setInput(e.target.value)}
                  type="text " className='form-control' placeholder="add a comment..." />
                 
                </form>
                   

                </div>

             </div>

                          
                        

                       )
                   })
               }
                 
                

             </div>

           </div>
         </div>
              
        </div>
    )
}

export default Home
