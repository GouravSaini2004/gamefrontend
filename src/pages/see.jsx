import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CardsPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // This could be used to clear messages or check for login state when the component mounts
        const userData = localStorage.getItem('user'); // Adjust the key as needed
        if (userData) {
            const use = JSON.parse(userData);
            if (use.role === "user") navigate("/");
        } else {
            navigate("/login")
        }
    }, [navigate]);

    // Fetch data from server when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://gamingbackend-dkf6.onrender.com/payment/get_payment'); // Replace with your API endpoint
                const result = await response.json();
                if (!response.ok) {
                    alert(result.msg)
                    setLoading(false);
                }
                if (result.success) {
                    const sortedData = result && result.Payment.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                    setData(sortedData)
                    setLoading(false);
                }
                else {
                    alert(result.msg)
                    setLoading(false);
                }
            } catch (error) {
                alert(result.msg, error.message)
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center text-blue-700 text-2xl pt-20">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 pt-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Cards Page</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data && data.length > 0 && data.map((item) => (
                        <div key={item._id} className="bg-gray-300 rounded-lg shadow-lg p-4">
                            <img
                                src={item.url}
                                alt={item.url}
                                className="w-full h-full object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-black">{item.gameId}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardsPage;
