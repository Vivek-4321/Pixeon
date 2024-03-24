import React from "react";
import "./Signup.css";

function Signup() {
  return (
  
      <div>
      <div className="navbar_pixeon_1">
      <h1>Pixeon</h1>
      </div>
      <div className="container_3">

        <h1>Sign up to Pixeon</h1>
       

               <button className="google_box_1"   >continue with google</button>
       
      
             <h1 className="or">or</h1>
               <input className="Email_1" type="Email" placeholder="Email"></input>
               <input className="password_1" type="password" placeholder="Password"></input>
               <input className="password_1" type="password" placeholder="Retype Password"></input>
               <button className="submit_button_1" type="text" >Create Account </button>
            
               <div className="container_4">

               <h1 className="have_account">Have an account ?</h1>
               <a href="" className="log_in">Login in</a>
               </div>
 
      </div>
    </div>
   
  );
}

export default Signup;
