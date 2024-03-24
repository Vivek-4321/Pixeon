import React from "react";
import "./Login.css";


function Login() {
  return (
    <div>
      <div className="navbar_pixeon">
      <h1>Pixeon</h1>
      </div>
      <div className="container_1">

        <h1>Sign in to Pixeon</h1>
       

               <button className="google_box"   >continue with google</button>
       
      
             <h1 className="or">or</h1>
               <input className="Email" type="Email" placeholder="Email"></input>
               <input className="password" type="password" placeholder="Password"></input>
               <button className="submit_button" type="text" >Login</button>
               <a href="">Reset Password</a>
               <div className="container_2">

               <h1 className="not_account">No account ?</h1>
               <a href="" className="create_account">Create one</a>
               </div>
 
      </div>
    </div>
  );
}

export default Login;
