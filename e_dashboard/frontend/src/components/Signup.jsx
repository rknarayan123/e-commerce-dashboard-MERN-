import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"

const Signup=()=>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate=useNavigate();
    useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth)
    {
        navigate('/')
    }
    })


    const collectData=async ()=>{
        console.log(name,email,password);
        let result=await fetch('http://localhost:5000/register',{
            method:"POST",
            body:JSON.stringify({name,email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
       result= await result.json()
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result));   //user naam se key banao uske andr result store kroo...in case of result we can't send the json data firstly we need to convert it into string...
        if(result)
        {
            navigate('/');
        }
            

        }
    
    return(
        <div className='register'>
        <h1>Register</h1>
        <input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' />
        <input className='inputBox' type="text" value={email} onChange={(e)=>setEmail(e.target.value)}placeholder='Enter Email' />
        <input className='inputBox' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' />
        <button type='button' onClick={collectData} className='appButton'>Sign Up</button>
        </div>
    )
}
export default Signup;