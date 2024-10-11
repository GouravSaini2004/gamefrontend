import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const data = localStorage.getItem('user');
  const use = JSON.parse(data);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
        try {
            const response = await fetch(`https://gamingbackend-dkf6.onrender.com/user/get_user/${use._id}`);
            
            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                // throw new Error('Failed to fetch user data');
                // alert("response not okk check internet connection")
                setLoading(false)
            }

            // console.log(response)
            const data = await response.json();
            if(data.success){
              setUser(data.userWithoutPassword);
              // alert(data.msg);
              setLoading(false)
            }else{
              alert(data.msg)
              setLoading(false)
            }
            
        } catch (err) {
            setLoading(false)
            // alert("check internet connection, request not sent")
        } finally {
            setLoading(false);
        }
    };

    fetchUser();
}, [use._id]);

const HandleLogout = async()=>{
  localStorage.removeItem("user");
  navigate('/');
}

if (loading) {
  return <div className="text-3xl text-blue-900 font-bold text-center pt-20">Loading....</div> // Loading state
}


  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg p-6 mt-12 border-2 border-slate-400 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
            alt="User Photo"
            className="w-32 h-32 rounded-full border-2 border-indigo-600"
          />
          <div className="mt-4 md:mt-0 md:ml-6">
            <h1 className="text-2xl font-bold">{user && user.name}</h1>
            <p className="text-gray-600">{user && user.email}</p>
          </div>
        </div>
        <div className='text-2xl p-5 font-semibold'><button onClick={HandleLogout} className='bg-orange-700 hover:bg-blue-600 rounded-2xl p-1 text-white'>Logout</button></div>

        <h2 className="text-xl mt-6 font-semibold">Transaction History</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="border px-4 py-2">Transaction ID</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {user && user.transactionHistory && user.transactionHistory.length>0 && user.transactionHistory.map(transaction => (
                <tr key={transaction.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{transaction.transactionId}</td>
                  <td className="border px-4 py-2">{new Date(transaction.date).toLocaleString()}</td>
                  <td className="border px-4 py-2">{transaction.amount}</td>
                  <td className="border px-4 py-2">{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
   
  );
};

export default UserProfile;
