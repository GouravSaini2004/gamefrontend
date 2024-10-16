import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"
import payment from '../assets/payment.jpg'

const PaymentPage = () => {
  const [gameId, setGameId] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  //   console.log(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a new FormData instance
    const formData = new FormData();
    formData.append('gameId', gameId);
    formData.append('image', image); // Adding the image file to formData

    try {
      const response = await fetch('https://gamingbackend-dkf6.onrender.com/payment/add_payment', {
        method: 'POST',
        body: formData, // Use formData instead of JSON
        // Do not include 'Content-Type' in the headers for FormData, it will be set automatically
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.msg);
        setLoading(false);
        return;
      }

      if (data.success) {
        alert(data.msg);
        setLoading(false);
        navigate('/profile');
      } else {
        alert(data.msg);
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen pt-16 bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Payment Page</h1>

        {/* QR Code Image */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Instructions for Payment</h2>

          <p className="text-lg mb-6">
            1. Scan the barcode below using your preferred payment app (e.g., Google Pay, Paytm, etc.).
            <br />
            2. Complete the payment as per the required amount.
            <br />
            3. Take a screenshot of the payment confirmation.
            <br />
            4. Upload the payment screenshot in the form provided below.
            <br />
            5. If you lost this page. So, go to <Link to={'/profile'} className='text-blue-600 underline pl-1'>Profile</Link> and click on payment button.
            <br />
            6. After successful payment, your payment status approvel will take maximum 24 hrs.
            <br />
            7. In case you face any issues during the payment process, please visit our 
            <Link to="/contactUs" className="text-blue-600 underline pl-2">Contact Us</Link> page for support.
          </p>
        </div>
        <div className="flex justify-center mb-6">
          <img
            src={payment} // Replace with your QR code image URL
            alt="QR Code"
            className="w-40 h-40 object-contain"
          />
        </div>
        

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Enter your GameID:</label>
            <input
              type="text"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your GameID"
              required
            />
            <p className="text-red-500 text-sm mt-1">Please Enter GameID Carefully!</p>
          </div>

          {/* Image Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Upload payment screenshot:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
