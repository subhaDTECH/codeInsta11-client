import React,{useState,useEffect}from 'react'
import { Link, useHistory } from 'react-router-dom'

const Create = () => {
    const history=useHistory()
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("");
    const [url,setUrl]=useState("")

    //  useeffect 
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



    // end auth






    const postData=async(e)=>{
        try{
        e.preventDefault();
        const data=new FormData();
        data.append('file',image)
        data.append("upload_preset","coders-insta")
        data.append('cloud_name',"redocgnik11")
       const res=await fetch('https://api.cloudinary.com/v1_1/redocgnik11/image/upload',{
           method:"POST",
           body:data
       })
       const JsonData=await res.json()
       console.log(JsonData)
       setUrl(JsonData.url)
       console.log(url)

       //data post to database

      
      const resData=await fetch('/createpost',{
          method:"POST",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              title,
              body,
              photo:url

          }),
          credentials:"include"
      });
      const SaveData=await resData.json()
      if(resData.status===201){
          alert("POST submit")
         
          setUrl("")
          setTitle("")
          setBody("")
          setImage("")
          history.push('/');
      }else{
        alert(`${SaveData.error}  or click the sumbit button again`)
      }
      console.log(SaveData)
    

        }catch(e){
            console.log(e,"or Click post button once again")
        }
        
    }
    
    return (
        <div className="create  w-50 mx-auto m-5 p-5  shadow-lg">
        
        <form className="  w-100 mx-auto" autoComplete="off">
        
        <h3>Create Post</h3>
            <div className="form-group mt-3">
              <input 
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              name="title"
              className="form-control" type="text " placeholder="Post title" />
           </div>
           <div className="form-group mt-3">
              <input
              value={body}
              onChange={(e)=>setBody(e.target.value)} 
              name="body"
              className="form-control" type="text " placeholder="post body " />
           </div>
           <div className="form-group mt-3">
              <input 
             
              onChange={(e)=>setImage(e.target.files[0])}
              name="file"
             type="file" placeholder="Upload image " />
           </div>
          
           <div className="form-group my-3">
            <button onClick={postData} className="btn btn-primary w-100">Post</button>
           </div>
           <Link to="/">Home</Link>
           
        </form>
   </div>
    )
}

export default Create
