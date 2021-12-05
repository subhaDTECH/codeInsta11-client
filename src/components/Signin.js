import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

const Signin = () => {
    const history=useHistory()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const signinForm=async(e)=>{
        e.preventDefault();
        const res=await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        });
        const data=await res.json();
        if(res.status===200){
            alert("User Login successfully 😍")
            setEmail('')
            setPassword('')
            history.push('/')
        }else{
            alert(data.error)
        }
        console.log(data)
    }
    return (
        
             <div className="signup w-50 text-center mx-auto m-5 p-5  shadow-lg">
              <div className="my-2 p-2">
                  <img  width={60} height={60} src="https://tse3.mm.bing.net/th?id=OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ&pid=Api&P=0&w=300&h=300" alt="" />
              </div>
        <form method="POST" className=" w-100 mx-auto" autoComplete="off">
        <h3>SignIn</h3>
            
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
            <button onClick={signinForm} className="btn btn-primary w-100">SignIn</button>
           </div>
           <Link to="/signup" className="mt-3 mx-3">Dont have an account?</Link>
           <Link to="/password/reset" className="mt-3"  mx-3>forgot password ?</Link>
           
        </form>
   </div>
    
    )
}

export default Signin
