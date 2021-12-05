
import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

const ResetPassword = () => {
    const history=useHistory()
    const [email,setEmail]=useState("")
   
    const ResetPasswordForm=async(e)=>{
        e.preventDefault();
        const res=await fetch('/password/reset',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
              
            })
        });
        const data=await res.json();
        if(res.status===200){
            alert(" Mail send ckech your mail ")
            setEmail('')
            
            history.push('/signin');
        }else{
            alert(data.message)
        }
        console.log(data)
    }
    return (
        
             <div className="signup w-50 text-center mx-auto m-5 p-5  shadow-lg">
              <div className="my-2 p-2">
                  <img  width={60} height={60} src="https://tse3.mm.bing.net/th?id=OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ&pid=Api&P=0&w=300&h=300" alt="" />
              </div>
        <form method="POST" className=" w-100 mx-auto" autoComplete="off">
        <h3>ResetPassword</h3>
            
           <div className="form-group mt-3">
              <input 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              name="email"
              className="form-control" type="text " placeholder="Enter your Email" />
           </div>
          
           <div className="form-group my-3">
            <button onClick={ResetPasswordForm} className="btn btn-primary w-100">Reset Password</button>
           </div>
          
           
        </form>
   </div>
    
    )
}

export default ResetPassword;
