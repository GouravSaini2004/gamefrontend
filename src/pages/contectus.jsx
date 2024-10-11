// src/App.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: '',
        subscribe: true,
        gender: 'male',
    });
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch('https://getform.io/f/agdyklrb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Form submitted successfully!');
            setFormData({ name: '', email: '', comment: '', subscribe: true, gender: 'male' });
            setLoading(false)
            navigate('/')
        } else {
            alert('There was an error submitting the form.');
            setLoading(false)
        }
    };

    return (
        <div className='w-screen h-screen bg-indigo-950'>
            <div className="max-w-md mx-auto p-6 bg-indigo-950 text-white flex flex-col justify-center items-center w-full h-full shadow-md rounded-lg">
                <h1 className="text-xl font-bold text-center mb-4">Contact Us</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                    <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Your Comment"
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="subscribe"
                            checked={formData.subscribe}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Subscribe to newsletter
                    </label>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Female
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                checked={formData.gender === 'other'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Other
                        </label>
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                        {loading ? "Loading" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
