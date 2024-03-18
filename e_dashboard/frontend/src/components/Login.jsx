import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth){
      navigate("/");
    }
  },[])
  const handleSubmit=async ()=>{
    console.log(email,password);
    let result=await fetch('http://localhost:5000/login',{
      method:'POST',
      body:JSON.stringify({email,password}),
      headers:{
        "Content-Type":"application/json"
        }
    });
    result=await result.json();
    console.warn(result);
    if(result.name)
    {
      localStorage.setItem("user",JSON.stringify(result));
      navigate("/");
    }
    else{
      alert("please enter correct details")
    }
  }
  return (
    <div className='login'>
        <h1>Login Page</h1>
        <input type="text" className='inputBox' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter Email'/>
        <input type="password" className='inputBox' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Password" />
        <button type='button'onClick={handleSubmit} className='appButton'>Login</button>
    </div>
  )
}

export default Login;