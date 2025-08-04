import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
export const Header = () => {

    const [btnName, setBtnName] = useState("Login");
    console.log("Header render");

    //if no dependency array => useeffect is called on every render
    //if dependency array is empty => useEffect is called on initial render and just once
    //if dependency array is [btnName] => useEffect is called everytime btnName is updated
    useEffect(() => {
        console.log("useEffect called");
    }, [btnName]);


    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png?nwm=1&nws=1&industry=food&sf=&txt_keyword=All" />
            </div>
            <div className="nav-links">

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li>Cart</li>
                    <button className="login" 
                    onClick={() => {
                    btnName === 'Login' 
                    ? setBtnName("Logout") 
                    : setBtnName("Login");
                   }}
                   >
                    {btnName}
                    </button>
                </ul>
            </div>
        </div>
    );
};
