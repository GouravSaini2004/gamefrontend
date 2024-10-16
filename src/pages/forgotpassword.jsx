import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const ForgetPasswordForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      try {
        setLoading(true);
        // Send a POST request to send OTP
        const response = await fetch('https://gamingbackend-dkf6.onrender.com/user/send_otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        // Parse the response
        const data = await response.json();

        if (!response.ok) {
          alert(data.msg);
          setLoading(false);
          return;
        }

        if (data.success) {
          alert(data.msg);
          Cookies.set("token", data.token);
          setLoading(false);
          nextStep(); // Move to the next step if OTP was successfully sent
        } else {
          alert(data.msg);
          setLoading(false);
        }
      } catch (err) {
        console.error("Request failed", err);
        alert("Request not sent");
        setLoading(false);
      }
    } else if (step === 2) {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const response = await fetch(`https://gamingbackend-dkf6.onrender.com/user/verify_otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userOtp, token }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.msg);
          setLoading(false);
          return;
        }

        if (data.success) {
          alert("OTP Verified Successfully");
          Cookies.remove("token");
          setLoading(false);
          nextStep();
        } else {
          alert(data.msg);
          setLoading(false);
        }
      } catch (err) {
        console.error("Request failed", err);
        alert(data.msg);
        setLoading(false);
      }
    } else if (step === 3) {
      try {
        setLoading(true);
        const response = await fetch(`https://gamingbackend-dkf6.onrender.com/user/generate_password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword, email }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.msg);
          setLoading(false);
          return;
        }

        if (data.success) {
          alert("Password Changed Successfully");
          setUserOtp('');
          setNewPassword('');
          setEmail('');
          setLoading(false);
          navigate('/login');
        } else {
          alert(data.msg);
          setLoading(false);
        }
      } catch (err) {
        console.error("Request failed", err);
        alert(data.msg);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-8">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">Enter Email</h2>
              <label className="block text-gray-700 font-medium mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >{loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
              <label className="block text-gray-700 font-medium mb-2">OTP:</label>
              <input
                type="text"
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="flex justify-between">
                {/* <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Back
                </button> */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  {loading ? 'Verifying OTP...' : 'Verify OTP'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">Set New Password</h2>
              <label className="block text-gray-700 font-medium mb-2">New Password:</label>
              <div className='bg-green-950 h-12 rounded-3xl'>
                <label className="input input-bordered flex items-center gap-2 h-full overflow-hidden">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="grow"
                    placeholder="Password"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                  >
                    {showPassword ? <BiSolidHide /> : <BiSolidShow />}
                  </button>
                </label>
              </div>
              <div className="flex justify-between">
                {/* <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Back
                </button> */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  {loading ? 'Changing Password...' : 'Change Password'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );

}

export default ForgetPasswordForm;
