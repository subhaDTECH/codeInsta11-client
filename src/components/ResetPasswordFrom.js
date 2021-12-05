import React,{useState} from 'react'
import { Link, useHistory,useParams } from 'react-router-dom'

const ResetPasswordForm = () => {
    const history=useHistory()
    const {token}=useParams();
    const [confirmerdPass,setconfirmerdPass]=useState("")
    const [password,setPassword]=useState("")
    const ResetPassForm=async(e)=>{
        e.preventDefault();
        const res=await fetch('/password/reset/'+token,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                
                password,
                confirmerdPass
            })
        });
        const data=await res.json();
        if(res.status===200){
            alert("Password reset  successfully ")
            alert(data.message)
            setconfirmerdPass('')
            setPassword('')
            history.push('/signin')
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
          <h3>Reset password</h3>
            
           <div className="form-group mt-3">
              <input 
              value={confirmerdPass}
              onChange={(e)=>setconfirmerdPass(e.target.value)}
              name="confirmerdPass"
              className="form-control" type="text " placeholder="Confirm password" />
           </div>
           <div className="form-group mt-3">
              <input 
               value={password}
              onChange={(e)=>setPassword(e.target.value)}
              name="password"
              className="form-control" type="text " placeholder="Enter your Password" />
           </div>
           <div className="form-group my-3">
            <button onClick={ResetPassForm} className="btn btn-primary w-100">submit</button>
           </div>
         
           
        </form>
   </div>
    
    )
}

export default ResetPasswordForm;
