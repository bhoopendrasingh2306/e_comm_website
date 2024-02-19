//this private components is used to restrict the user to enter the other sections of the page without login or authentication
//the will not permit the user to enter the other sections with out login or signup
//in this we make a function which get the information of user from localstorage and check if credencials given then permit otherwise not
//check in local storage if there is any user logged in the it will allow to navigate to other pages.
//if there is no user in local storage the it will not allow user to navigate to other pages


//we import this function in app.js  



import React from "react";
import {Navigate , Outlet} from "react-router-dom";

const PrivateComponent = ()=>{
    const auth = localStorage.getItem('user');
    return auth? <Outlet/> : <Navigate to ="/signup"/>
}

export default PrivateComponent;