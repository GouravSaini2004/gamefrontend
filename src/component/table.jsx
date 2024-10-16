import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';



const GameTable = () => {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGameTitle, setSelectedGameTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // This could be used to clear messages or check for login state when the component mounts
    const userData = localStorage.getItem('user'); // Adjust the key as needed
    if (userData) {
      const use = JSON.parse(userData);
      if (use.role === "user") navigate("/");
    }else{
      navigate("/login")
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://gamingbackend-dkf6.onrender.com/player/get_players`);
        const data = await response.json();
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          // throw new Error('Failed to fetch user data');
          alert(data.msg)
        }

        console.log(response)
        

        console.log(data)
        const sortedData = data && data.participants.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUser(sortedData);

      } catch (err) {
        // setError(err.message || "Error fetching user data.");
        alert("check internet connection, request not sent",data.msg)
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleStatusChange = async (itemId, newStatus) => {
    // Update the status in your state or make an API call
    // console.log(`Updated item ID: ${itemId}, New Status: ${newStatus}`)
      try{
        setLoading(true)
        const response =  await fetch(`https://gamingbackend-dkf6.onrender.com/player/update_player/${itemId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });

        const data = await response.json();

        if(!response.ok){
          alert(data.msg)
          setLoading(false)
        }
        if(data.success){
          alert(data.msg)
          setLoading(false)

        } 
        else{
          alert(data.msg)
          setLoading(false)

        }       

      }
      catch(err){
        alert("request not sent")
      }
    
    
    // Implement your logic here, like updating state or sending a request to the server
  };
  
  const filteredData = Array.isArray(user) ? user.filter(item => {
    const matchesSearchTerm =
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phoneNumber.includes(searchTerm) ||
      item.gameId.includes(searchTerm);
    const matchesDate = selectedDate ? item.date === selectedDate : true;
    const matchesGameTitle = selectedGameTitle ? item.gameTitle === selectedGameTitle : true;

    return matchesSearchTerm && matchesDate && matchesGameTitle;
  }) : [];

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
    <div className="p-4 bg-gray-200 min-h-screen pt-20">
      <h1 className="text-2xl mb-4 text-center font-bold">Participants Table</h1>

      <div className="mb-4 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search by name, phone, or game ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={selectedGameTitle}
          onChange={(e) => setSelectedGameTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Games</option>
          <option value="Freefire">Freefire</option>
          <option value="PUBG">PUBG</option>
        </select>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
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
            {filteredData && filteredData.length > 0 && filteredData.map(item => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.phoneNumber}</td>
                <td className="border px-4 py-2">{item.gameTitle}</td>
                <td className="border px-4 py-2">{item.gameId}</td>
                <td className="border px-4 py-2">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)} // Call a function to handle the change
                    className="border rounded-md px-2 py-1"
                  ><option value="Pending">Pending</option>
                    <option value="Verified">Verified</option>               
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>

                <td className="border px-4 py-2">{formatDate(item.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameTable;
