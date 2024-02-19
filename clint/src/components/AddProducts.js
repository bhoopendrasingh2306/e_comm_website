import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddProduct =()=>{
    const [name , setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company , setCompany]= useState("");
    const [error , setError] = useState(false);
    const navigate = useNavigate();

    const [successful , setSuccessful] = useState("");

    
    const handleAdd =()=>{

        const headers = {
            Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }


        console.log(!name);
    if(!name || !price ||!category || !company){
        setSuccessful("Fill All The Required Fields")
        setError(true);
        return false;
    }



        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(name,price,category,company,userId);
        axios.post("http://localhost:3003/add-product", {name , price , category , company, userId}, {headers:headers})
        .then((result)=>{

            navigate("/")

            console.log("added_product:", result);
            // if(result){
            //     setSuccessful("Item Added Successfully")
            // }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="product">
            <h1>add product</h1>
            <input className="inputbox" type="text" placeholder="Enter Product Name" onChange={(e)=>setName(e.target.value)} value={name}/>
            {error && !name && <span className="invalid-input">Enter valid name</span>}
            <input className="inputbox" type="text" placeholder="Enter Product Price" onChange={(e)=>setPrice(e.target.value)} value={price}/>
            {error && !price && <span className="invalid-input">Enter valid price</span>}
            <input className="inputbox" type="text" placeholder="Enter Product Category" onChange={(e)=>setCategory(e.target.value)} value={category}/>
            {error && !category && <span className="invalid-input">Enter valid category</span>}
            <input className="inputbox" type="text" placeholder="Enter Product Company" onChange={(e)=>setCompany(e.target.value)} value={company}/>
            {error && !company && <span className="invalid-input">Enter valid company</span>}
            <button className="loginbtn" onClick={handleAdd}>Add Proudct</button>
            {/* <span className="invalid-input">{successful}</span> */}
        </div>
    )
}

export default AddProduct;