import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [out, setOut] = useState("");
  const navigate = useNavigate();

  //this useeffect restricts the opening of login page while we are already logged in via entering /login
  useEffect(()=>{
    // this auth is about that the user is logged in 
    const auth = localStorage.getItem('user');
    if(auth){
      navigate("/");
    }
  },[])

  const handleLogin = async () => {
    console.log(email, password);
    // >>>>ALERT : method 1 : we have used fetch api to call the server api
    // below this result stores the output return by the server
//-->>Uncomment from here
    // let result = await fetch("http://localhost:3003/login", {
    //   method: "post",
    //   body: JSON.stringify({ email, password }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // // we need to convert the output comming form backend to json()
    // result = await result.json();
    // console.log("server output is", result);
    // if (result.name) {
    //   localStorage.setItem("user", JSON.stringify(result)); //local storage sets keya and value pair
    //   alert("user found .");
    //   navigate("/");
    // } else {
    //   //  alert("please enter correct details");
    //   setOut(result.result);
    // }

    // Now a days latest we use axios ......
    // >>>ALERT!!   method 2: we can also use Axios to call the server api .

    
    axios.post("http://localhost:3003/login", {email, password })
      .then((result) => {
        // result = result.json();
        console.log("server output is", result);
// result.data.auth  contains the jwt token
        if (result.data.auth) {
          localStorage.setItem("user", JSON.stringify(result.data.user)); //local storage sets key and value pair , user as key and result as value
          localStorage.setItem("token", JSON.stringify(result.data.auth));//we will set jwt token to localstorage which is coming from backend . result.data.auth contains the jwt token
          navigate("/");
        } else {
          // alert("please enter correct details");
          setOut(result.data.result);
        }
      });
  };

  return (
    <div className="login">
      <h1>Login :)</h1>
      <input
        className="inputbox"
        type="text"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="inputbox"
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="loginbtn" type="button" onClick={handleLogin}>
        Login
      </button>
      <h4>{out}</h4>
    </div>
  );
};

export default Login;
