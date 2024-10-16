import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"

const AddGame = () => {
  const [gameDetails, setGameDetails] = useState({
    gameTitle: '',
    gameImage: '',
    gameDate: '',
    teamSize: '',
    fees: '',
    maxPlayers: '',
  });
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    // This could be used to clear messages or check for login state when the component mounts
    const userData = localStorage.getItem('user'); // Adjust the key as needed
    if (userData) {
      const use = JSON.parse(userData);
      if(use.role === "user") navigate("/");    
    }else{
      navigate("/login")
    }
}, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await fetch('https://gamingbackend-dkf6.onrender.com/game/add_game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameDetails),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.msg)
        setLoading(false)
      }
      
      if(result.success){
        setLoading(false)
        alert(result.msg)
        setGameDetails({
          gameTitle: '',
          gameImage: '',
          gameDate: '',
          teamSize: '',
          fees: '',
          maxPlayers: '',
        });
        navigate('/')
      }else{
        alert(data.msg)
        setLoading(false)
      }

    } catch (error) {
      setLoading(false)
      alert('Error adding game: ' + error.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-800 flex flex-col items-center justify-center pt-20 pb-2"
      style={{
        backgroundImage: "url(https://images.pexels.com/photos/3945688/pexels-photo-3945688.jpeg?auto=compress&cs=tinysrgb&w=600)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-4xl text-sky-500 font-bold mb-8">Add a Competition Game</h1>
      <form onSubmit={handleSubmit} className="bg-indigo-950 text-black p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-4">
          <label className="block mb-2 text-white" htmlFor="title">Game Title:</label>
          <input
            type="text"
            name="gameTitle"
            id="title"
            value={gameDetails.gameTitle}
            onChange={handleChange}
            required
            className="w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white" htmlFor="image">Game Image URL:</label>
          <input
            type="url"
            name="gameImage"
            id="image"
            value={gameDetails.gameImage}
            onChange={handleChange}
            required
            className="w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white" htmlFor="date">Date:</label>
          <input
            type="date"
            name="gameDate"
            id="date"
            value={gameDetails.gameDate}
            onChange={handleChange}
            required
            className="w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white" htmlFor="teamSize">Team Size:</label>
          <input
            type="text"
            name="teamSize"
            id="teamSize"
            value={gameDetails.teamSize}
            onChange={handleChange}
            required
            className="w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white" htmlFor="entryFees">Entry Fees:</label>
          <input
            type="number"
            name="fees"
            id="fees"
            value={gameDetails.fees}
            onChange={handleChange}
            required
            className="w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white" htmlFor="maxPlayers">Max Players:</label>
          <input
            type="number"
            name="maxPlayers"
            id="maxPlayers"
            value={gameDetails.maxPlayers}
            onChange={handleChange}
            required
            className="w-full p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
        >
          {loading ? "Sunmiting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddGame;
