import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [mail, setMail] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://gamingbackend-dkf6.onrender.com/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            if (!response.ok) {
                setLoading(false);
                const data = await response.json();
                alert(data.msg);
                return;
            }

            const data = await response.json();
            if (response.ok && data.success) {
                setMail(true); // Set mail to true to show the verification message
                alert(data.msg);
                // Optionally, navigate or reset form here
            } else {
                alert(data.msg);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister();
    };

    return (
        <div className='flex justify-center gap-2 h-screen w-screen bg-indigo-950'>
            <div className='flex justify-center items-center p-5 w-full lg:w-1/2'>
                <div className='flex flex-col justify-center items-center gap-10 shadow-2xl h-full w-full p-2'>
                    {mail ? (
                        <div className="text-white text-center">
                            <h1 className='text-3xl font-bold'>Verification Email Sent!</h1>
                            <p>Please check your email to verify your account. please click on the link and back website and then login.</p>
                        </div>
                    ) : (
                        <div className='flex flex-col justify-center items-center gap-10 shadow-2xl h-full w-full p-2'>
                            <h1 className='text-white text-center text-5xl font-bold'>REGISTER</h1>
                            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-10">
                                <div className='bg-green-950 h-12 w-4/5 rounded-3xl'>
                                    <label className="input input-bordered flex items-center gap-2 h-full overflow-hidden">
                                        <input
                                            type="text"
                                            className="grow"
                                            placeholder="Username"
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className='bg-green-950 h-12 w-4/5 rounded-3xl'>
                                    <label className="input input-bordered flex items-center gap-2 h-full overflow-hidden">
                                        <input
                                            type="email"
                                            className="grow"
                                            placeholder="Email"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className='bg-green-950 h-12 w-4/5 rounded-3xl'>
                                    <label className="input input-bordered flex items-center gap-2 h-full overflow-hidden">
                                        <input
                                            type="password"
                                            className="grow"
                                            placeholder="Password"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className='bg-green-950 w-4/5 rounded-3xl'>
                                    <button type="submit" className="btn btn-active btn-secondary w-full h-full text-3xl hover:bg-blue-900">
                                        {loading ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                            <div className='flex flex-col justify-center items-center text-white'>
                                <p>If you have an account, please <Link to={'/login'} className='text-blue-700 underline'>Login</Link></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='hidden lg:block p-4 w-1/2'>
                <div className='w-full h-full flex justify-center p-5 shadow-2xl shadow-black'>
                    <img src="https://images.pexels.com/photos/3945688/pexels-photo-3945688.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Register;
