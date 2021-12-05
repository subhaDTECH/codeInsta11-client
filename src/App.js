
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Userprofile from './components/Userprofile';
import Sidebar from './components/Sidebar';
import React,{useState} from "react";
import ResetPassword from './components/ResetPassword';
import ResetPasswordForm from './components/ResetPasswordFrom';





function App() {
   const [showbtn,setshowBtn]=useState(false);
   const show=()=>{
      setshowBtn(!showbtn);
        
   }
  return (
    <div className="App">
       <Router>
       <Navbar/>
       
           <Switch>
               <Route path='/signup' exact >
                  <Signup/>
                  
                </Route>
                <Route path="/signin" exact >
                   <Signin/>
                </Route>
                <Route path="/profile" exact>
                   <Profile/>
                </Route>
                <Route path="/create" exact>
                 <Create/>
                </Route>
                <Route path="/profile/:id" exact>
                 <Userprofile/>
                </Route>

                <Route path="/password/reset" exact>
                 <ResetPassword/>
                </Route>

                <Route path="/password/reset/:token" exact>
                 <ResetPasswordForm/>
                </Route>

                <Route path="/" >
                <div className="split_div">
                   <button onClick={show} className="btn btn-primary"></button>
                    {showbtn && <Sidebar/>}
                   <Home/>
                </div>
                  
                  
                </Route>
           </Switch>
       </Router>
          
    </div>
  );
}

export default App;
