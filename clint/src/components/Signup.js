import React,{useState , useEffect} from "react";
import { Button} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom"


function Signup() {
  const [name,setText] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate =  useNavigate();


const collectiondata =()=>{
 
  console.log({name,email,password});
  // axios is used to send data from UI to database or from react to database  .then is used to resolve promise
  axios.post('http://localhost:3003/', { name, email, password })
      .then((result) => {
        console.log(result);    // result contain the response comming from axios
        if(result.data.auth){
          console.log("hellow");
          //this will store the result into the local storage while sign up
          localStorage.setItem("user",JSON.stringify(result.data.result));
          localStorage.setItem("token", JSON.stringify(result.data.auth));
          navigate('/');
        }
      })
      .catch(err => console.log(err));
}

//   const handleSubmit = (e) => {
//     console.log("ok done")
//     e.preventDefault()
//     emailValidation();
    
//   }

  // validation for email 

//   const emailValidation = () => {
//     const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

//     if (regEx.test(email)) {
//       setMessage("Email is valid");
//       axios.post('http://127.0.0.1:3002/', { email, password })
//       .then(result => console.log(result))
//       .catch(err => console.log(err))  
//     }
//     else if (!regEx.test(email) && email !== "") {
//       setMessage("Email is not Valid");
//     } else {
//       setMessage("");
//     }
//   }

  // validation for password

//   function PasswordHandler(f){
//     f.preventDefault();
//      setPassword(f.target.value)

//      // from here process 1 for password validation

//     // const passExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}/g
//     // if(password === ""){
//     //   setPassMessage("Please Enter Password");
//     // }else if(passExp.test(password)){
//     //   setPassMessage("Password is Valid");
//     // }else if(!passExp.test(password)){
//     //   setPassMessage("Password is NOT Valid");
//     // }else{
//     //   setPassMessage("");
//     // }


// //from here  process2
//     if(password===""){
//       setPassMessage("it can't be empty");
//     }
//     else if (validator.isStrongPassword(password, { 
//       minLength: 8, minLowercase: 1, 
//       minUppercase: 1, minNumbers: 1, minSymbols: 1 
//   })) { 
//       setPassMessage('Is Strong Password') 
//   } else { 
//       setPassMessage('Is Not Strong Password') 
//   } 

//     // if(val.length<8){
//     //   setPassErr(true);
//     // }
//     // else{
//     //   setPassErr(false);
//     // }
//   }



//this effect will restrict to user to access signup page after once he logged in. it will redirect him to "/"
useEffect(()=>{
  const auth = localStorage.getItem('user');
  if(auth){
    navigate("/")
  }
},[])

  return (
    <>
      <div className="page">
      <div className="form" >
        <div className="inner">
        <h1>Signup :)</h1>
        <br></br>
        <label>User Name:   </label>
        <input type="text" value={name} onChange={(e)=>setText(e.target.value)} placeholder="user name" className="input"></input>
        <br></br>
        <label>Email: </label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="input"></input>
        <br></br>
        <label>password:    </label>
        <input type="password"value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="input"></input>
        <br></br>
        <br></br>
        <Button type="submit" onClick={collectiondata} className="btn"> Sign In</Button> 
        </div>
      </div>
      </div>
    </>

  )
}

export default Signup;