import React from 'react'
import "./Forget.css";

function Forget() {
  return (
    <div>
<div className='navbar_pixeon_forgot'> 
<h1>Pixeon</h1>
</div>
<div className='container_forgot'>
    <h1>Forgot Password ?</h1>
    <div className='container_forgot_1'>
<input className="Email_forgot" type="Email" placeholder="Email"></input>

               <input className="Email_retype" type="Email" placeholder="Retype Email"></input>
               <button className='submit_reset'>Send Reset Link</button>
               </div>
               <div className='container_forgot_2'>
               <h1 className='Go_back'>Go back to </h1>
               <h1 className='sa'>-</h1>
               <a className='Home_page' href=''>login page</a>
               </div>

</div>

    </div>
  )
}

export default Forget
