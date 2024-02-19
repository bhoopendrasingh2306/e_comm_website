import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Profile(){
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [userId , setuserId] = useState("");
    const [message , setMessage]= useState("");
    const [file, setFile]= useState();
    const params = useParams();
    useEffect(()=>{
        console.log("parii", params)
        getProfile();
    },[])

    const getProfile=()=>{
        console.log(params)
        axios.get(`http://localhost:3003/profile/${params.id}`)
        .then((result)=>{
            console.log(result)
            setName(result.data.name);
            setEmail(result.data.email)
            setuserId(result.data._id)

        })
    }

    const upload = () =>{
        console.log("userididid", userId);
        const formData = new FormData()
        formData.append('file',file)
        formData.append('userId', userId)
        axios.post("http://localhost:3003/profileUpload", formData)
        .then ((result)=>{
            if(result){
                setMessage("file uploaded successfully");
            }
        })
        .catch(err => console.log(err))
    }


    return(
        <div className="profile">
             <h1>User Profile</h1>
            <input type="text" className="inputbox"  onChange={(e)=>{setName(e.target.value)}} value={name}></input>
            <input type="text" className="inputbox" onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
            <input type="text" className="inputbox" onChange={(e)=>{setuserId(e.target.value)}} value={userId}></input> 
            <span className="profile_message">Upload Profile Picture</span><br></br>
            <input type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
            <button type="button" onClick={upload}>uploadFile</button>
            <span className="img_message">{message}</span>
        </div>
    )
}

export default Profile;