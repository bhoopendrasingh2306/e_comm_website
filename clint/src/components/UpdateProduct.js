import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const UpdateProduct =()=>{
    const [name , setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company , setCompany]= useState("");
    const [successful , setSuccessful] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        console.log("params",params)
        getProductDetails();
    },[])
    
    const getProductDetails = () =>{
        const headers = {
            Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        console.log(params);
        axios.get(`http://localhost:3003/product/${params.id}`, {headers:headers})
        .then((result)=>{
            console.log(result)
            setName(result.data.name);
            setPrice(result.data.price);
            setCategory(result.data.category);
            setCompany(result.data.company)
        })
    }

    const handleUpdate =()=>{

        const headers = {
            Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }

        console.log(name, price , category, company)
        axios.put(`http://localhost:3003/product/${params.id}`,{name, price , category, company},{headers:headers})
        .then((result)=>{
            // if(result){
            //     setSuccessful("Item Updated Successfully")
            // }

            navigate("/")

            console.log("updated result", result)
        })
   
    }

    return (
        <div className="product">
            <h1>Update product</h1>
            <input className="inputbox" type="text"  onChange={(e)=>setName(e.target.value)} value={name}/>
           
            <input className="inputbox" type="text" placeholder="Enter Product Price" onChange={(e)=>setPrice(e.target.value)} value={price}/>
            
            <input className="inputbox" type="text" placeholder="Enter Product Category" onChange={(e)=>setCategory(e.target.value)} value={category}/>
            
            <input className="inputbox" type="text" placeholder="Enter Product Company" onChange={(e)=>setCompany(e.target.value)} value={company}/>
            
            <button className="loginbtn" onClick={handleUpdate}>Update Proudct</button>
            {/* <span className="invalid-input">{successful}</span> */}
           
        </div>
    )
}

export default UpdateProduct;