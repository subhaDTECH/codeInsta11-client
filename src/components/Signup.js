import React,{useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

const Signup = () => {
    const history=useHistory()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const Signup=async(e)=>{
        e.preventDefault();
       const res=await fetch('/signup',{
           method:"POST",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               name,
               email,
               password
           })
       });
       const data= await res.json();
       if(res.status!==201){
           alert(data.error)
       }else{
           alert("Registation successfull  😍")
           history.push('/signin')

       }
       setName('')
       setPassword('')
       setEmail("")
      
       console.log(data)
    }
    return (
        <div className="signup  w-50 mx-auto m-5 p-5  shadow-lg">
        
             <form method="POST" className="  w-100 mx-auto" autoComplete="off">
             <div className="my-2 p-2">
                  <img  width={60} height={60} src="https://tse3.mm.bing.net/th?id=OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ&pid=Api&P=0&w=300&h=300" alt="" />
              </div>
             <h3>Signup</h3>
                 <div className="form-group mt-3">
                   <input 
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   name="name"
                   className="form-control" type="text " placeholder="Enter your Name" />
                </div>
                <div className="form-group mt-3">
                   <input 
                    value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   name="email"
                   className="form-control" type="text " placeholder="Enter your Email" />
                </div>
                <div className="form-group mt-3">
                   <input 
                    value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                   name="password"
                   className="form-control" type="text " placeholder="Enter your Password" />
                </div>
                <div className="form-group my-3">
                 <button onClick={Signup} className="btn btn-primary w-100">Signup</button>
                </div>
                <Link to="/signin">Already have an account?</Link>
                
             </form>
        </div>
    )
}

export default Signup
