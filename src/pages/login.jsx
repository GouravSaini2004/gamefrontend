// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom"
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // This could be used to clear messages or check for login state when the component mounts
        const userData = localStorage.getItem('user'); // Adjust the key as needed
        if (userData) {
            // setIsAuthenticated(true);
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async () => {
        setLoading(true)
        try {
            const response = await fetch('https://gamingbackend-26xx.onrender.com/user/login', { // Adjust the URL as necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                alert(data.msg)
                setLoading(false)
            }


            // console.log(data)


            if (response.ok && data.success) {

                // console.log(data.userWithoutSensitiveData, data.msg)
                localStorage.setItem('user', JSON.stringify(data.userWithoutSensitiveData));
                alert(data.msg)
                navigate('/')
                setLoading(false)
                // Handle successful login, e.g., redirect or save user data
            } else {
                alert(data.msg);
                setLoading(false)
            }
        } catch (error) {
            // console.error("Error during login:", error);
            setLoading(false)
            alert(error.message)

        }
    };

    useEffect(() => {
        // This could be used to clear messages or check for login state when the component mounts
        const userData = localStorage.getItem('user'); // Adjust the key as needed
        if (userData) {
            // setIsAuthenticated(true);
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className='flex justify-center gap-2 h-screen w-screen bg-indigo-950'>
            <div className='flex justify-center items-center p-5 w-full lg:w-1/2'>
                <div className='flex flex-col justify-center items-center gap-10 shadow-2xl h-full w-full p-2'>
                    <h1 className='text-white text-center text-5xl font-bold'>LOGIN</h1>
                    <div className='bg-green-950 h-12 w-4/5 rounded-3xl'>
                        <label className="input input-bordered flex items-center gap-2 h-full overflow-hidden">

                            <input
                                type="email"
                                className="grow"
                                placeholder="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className='bg-green-950 h-12 w-4/5 rounded-3xl'>
                        <label className="input input-bordered flex items-center gap-2 h-full overflow-hidden">

                            <input
                                type={showPassword ? "text" : "password"}
                                className="grow"
                                placeholder="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="focus:outline-none"
                            >
                                {showPassword ? <BiSolidHide /> : <BiSolidShow />}
                            </button>

                           

                        </label>
                        <div className='text-white flex justify-end pr-5 underline'><Link to={'/forgot'}>forgot password</Link></div>
                    </div>

                    <div className='bg-green-950 w-4/5 rounded-3xl'>
                        <button onClick={handleSubmit} className="btn btn-active btn-secondary w-full h-full text-3xl hover:bg-blue-900">{loading ? "Submiting..." : "Submit"}</button>
                    </div>
                    <div className='flex flex-col justify-center items-center text-white h-auto'>
                        <p>If you have not an account. so, please <Link to={'/register'} className='text-blue-700 underline'>Sign up</Link></p>
                        {/* <br /> */}
                        {/* <h1 className='text-2xl'>OR</h1>
                        <button className="btn btn-active btn-warning w-full text-xl hover:bg-blue-900 h-auto"><FcGoogle size={30}/> Login with Google</button> */}
                    </div>
                </div>
            </div>
            <div className='hidden lg:block p-4 w-1/2'>
                <div className='w-full h-full flex justify-center p-5 shadow-2xl shadow-black'>
                    <img src="https://images.pexels.com/photos/1337247/pexels-photo-1337247.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='' />
                </div>
            </div>
        </div>
    );
}

export default Login;
