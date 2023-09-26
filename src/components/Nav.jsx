import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import main from '../assets/main.png'
const Nav = () => {
    return (
        <div className=" flex justify-center items-center flex-col navbar w-3/5 bg-base-100">
            <div className="container">
                <div className="flex-1">
                    <Link><img src={logo} alt="logo" /></Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li className="mr-10 text-sm font-semibold"><Link to="auth/restaurant/login">Restaurant Login</Link></li>
                    </ul>
                </div>
            </div>
            <img className="w-full" src={main} alt="main" />


        </div>
    )
}

export default Nav