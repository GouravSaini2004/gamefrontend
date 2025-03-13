import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

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
        const response = await fetch(`https://gamingbackend-26xx.onrender.com/player/get_player/${use._id}`);

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          // throw new Error('Failed to fetch user data');
          // alert("response not okk check internet connection")
          setLoading(false)
        }

        // console.log(response)
        const data = await response.json();
        // console.log(data)
        if (data.success) {
          const sortedData = data && data.participants.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setUser(sortedData);
          // alert(data.msg);
          setLoading(false)
        } else {
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

  const HandleLogout = async () => {
    localStorage.removeItem("user");
    navigate('/');
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0'); // Pad day with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear(); // Get the full year

    return `${day}-${month}-${year}`;
  };

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
            <h1 className="text-2xl font-bold text-center">{use.name}</h1>
            <p className="text-gray-600">{use.email}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-start gap-5 w-full">
          {/* Logout Button */}
          <div className="text-2xl p-2 font-semibold">
            <button
              onClick={HandleLogout}
              className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>

          {/* Payment Button for 'user' role */}
          {use.role === 'user' && (
            <div className="text-2xl p-2 font-semibold">
              <Link
                to={'/payment'}
                className="bg-gradient-to-r from-green-500 to-teal-400 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                Payment
              </Link>
            </div>
          )}
        </div>

        {use.role == 'user' && (<div>
          <h2 className="text-xl mt-6 font-semibold">Applied Game History</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Game Title</th>
                  <th className="border px-4 py-2">Game ID</th>
                  <th className="border px-4 py-2">Payment Status</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {user && user.length > 0 && user.map(transaction => (
                  <tr key={transaction._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{transaction.email}</td>
                    <td className="border px-4 py-2">{transaction.phoneNumber}</td>
                    <td className="border px-4 py-2">{transaction.gameTitle}</td>
                    <td className="border px-4 py-2">{transaction.gameId}</td>
                    <td className="border px-4 py-2">
                      {transaction.status}
                    </td>

                    <td className="border px-4 py-2">{formatDate(transaction.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </div>
    </div>

  );
};

export default UserProfile;
