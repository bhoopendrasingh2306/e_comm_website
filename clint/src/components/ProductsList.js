import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const userobj = JSON.parse(localStorage.getItem("user"));
  console.log("usrireed", userobj);
  const userId = userobj._id;
  console.log("idof user", userId);

  //------->by using fetch method to get data

  //   const getProducts = async () => {
  //     let result = await fetch("http://localhost:3003/products");
  //     result = await result.json();
  //     setProducts(result);
  //     console.log("out", result);
  //   };
  //   console.log("product list is=", products);

  //-------> by using axios to get data
  const getProducts = () => {
    const headers = {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };

    axios
      .get("http://localhost:3003/products", {
        headers: headers,     
      })
      .then((result) => {
        console.log(result.data);

        setProducts(result.data);
      });
  };

  //-------> by using axios to delete data

  const deleteProduct = (id) => {
    const headers = {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };
    axios
      .delete(`http://localhost:3003/product/${id}`, { headers: headers })
      .then((result) => {
        if (result) {
          //if a entry is deleted then we need to call getProducts function again because it contains the remaining product list
          getProducts();
        }
      });
  };

  //-----> by using axios to search data
  const searchHandle = (event) => {
    const headers = {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };

    console.log(event.target.value);
    let key = event.target.value;
    if (key) {
      axios
        .get(`http://localhost:3003/search/${key}`, { headers: headers })
        .then((result) => {
          if (result) {
            setProducts(result.data);
          }
        });
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        className="search-product"
        type="text"
        placeholder="search Product"
        onChange={searchHandle}
      ></input>
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      <br></br>

      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button
                onClick={() => {
                  deleteProduct(item._id);
                }}
              >
                Delete
              </button>
              <Link to={"/update/" + item._id}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductsList;
