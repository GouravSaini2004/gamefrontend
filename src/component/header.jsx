import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function Header() {
    const [auth, setAuth] = useState();
    const navigate = useNavigate();
    const data = localStorage.getItem('user');
    const use = JSON.parse(data);
    const [isActive, setIsActive] = useState(true);

    const toggleActive = () => setIsActive(!isActive);


    return (
        <div className="navbar bg-indigo-950 text-white w-[100vp] fixed t-o l-o z-50 ">
            <div className="flex-1 px-2 lg:flex-none">
                <a className="text-lg font-bold">gAme KaRao</a>
            </div>
            <div className="flex flex-1 justify-end px-2">
                <div className="flex items-stretch">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn"><GiHamburgerMenu size={25} onClick={toggleActive}/></div>
                        <ul
                            tabIndex={0}
                            className={`menu dropdown-content rounded-box z-[1] mt-4 w-32 p-2 shadow-xl shadow-indigo-800 bg-indigo-900 text-xl font-semibold ${isActive ? "block" : "hidden"}`}>
                            <ul>
                                {use && Object.keys(use).length > 0 ? (
                                    <>
                                        <li><Link to="/" onClick={toggleActive}>Home</Link></li>
                                        <li><Link to="/profile" onClick={toggleActive}>Account</Link></li>
                                        <li><Link to="/termsAndConditions" onClick={toggleActive}>Terms & Condition</Link></li>
                                        <li><Link to="/contactUs" onClick={toggleActive}>ContactUs</Link></li>
                                        <li><Link to="/aboutUs" onClick={toggleActive}>AboutUs</Link></li>
                                        {use.role === 'admin' && (
                                            <>
                                                <li><Link to="/addgame" onClick={toggleActive}>Add Game</Link></li>
                                                <li><Link to="/table" onClick={toggleActive}>Table</Link></li>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/" onClick={toggleActive}>Home</Link></li>
                                        <li><Link to="/login" onClick={toggleActive}>Login</Link></li>
                                        <li><Link to="/register" onClick={toggleActive}>Register</Link></li>
                                        <li><Link to="/termsAndConditions" onClick={toggleActive}>Terms & Condition</Link></li>
                                        <li><Link to="/contactUs" onClick={toggleActive}>ContactUs</Link></li>
                                        <li><Link to="/aboutUs" onClick={toggleActive}>AboutUs</Link></li>
                                    </>
                                )}
                            </ul>



                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;