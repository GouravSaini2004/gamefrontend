import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Ensure you import useParams
import { useNavigate } from 'react-router-dom';
const CompetitionForm = () => {
  const { id } = useParams();
  const [card, setCard] = useState({});
  const data = localStorage.getItem('user');
  const user = JSON.parse(data);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    gameId: '', // Automatically set gameId from URL
    user: user ? user._id : '', // Ensure user ID is set
    gameTitle: '', // This will be set after fetching
  });
  const navigate = useNavigate();

  useEffect(() => {
    // This could be used to clear messages or check for login state when the component mounts
    const userData = localStorage.getItem('user'); // Adjust the key as needed
    if (!userData) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading1(true)
      try {
        const response = await fetch(`https://gamingbackend-dkf6.onrender.com/game/get_game/${id}`);

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          // alert("some error please try again or enter all field")
          setLoading1(false)
        }

        const data = await response.json();
        if (data.success) {
          setCard(data.game); // Assuming the response contains the game object
          setFormData((prev) => ({
            ...prev,
            gameTitle: data.game.gameTitle, // Set gameTitle from fetched data
          }));
          setLoading1(false)
          // alert(data.msg)
        }else{
          alert(data.msg)
          setLoading1(false)
        }
      } catch (err) {
        setLoading(false)
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]); // Added id to dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // if (phoneNumber.length !== 10) {
    //   setLoading(false)
    //   alert('Phone number must be 10 digits long.');
      
    //   return;
    // }
    try {
      // Send formData to the API
      const response = await fetch('https://gamingbackend-dkf6.onrender.com/player/add_player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        alert(data.msg);
        setLoading(false)
      }

      
      // console.log('Response from server:', data);

      // Optionally, you can reset the form or provide user feedback
      if (data.success) {
        alert(data.msg);
        setFormData({
          email: '',
          phoneNumber: '',
          gameId: '',
          user: user ? user._id : '',
          gameTitle: '',
        });
        setLoading(false)
        navigate('/payment')
      }else{
        setLoading(false)
        alert(data.msg)
      }
    } catch (error) {
      setLoading(false)
      alert(error.message);
    }
  };

  if (loading1) {
    return <div className="text-3xl text-blue-900 font-bold text-center pt-20">Loading....</div> // Loading state
  }


  return (
    <div className="flex flex-col lg:flex-row justify-center w-screen items-center h-screen bg-indigo-950 text-white">
      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-indigo-950 shadow-md rounded p-5 w-4/5 lg:w-1/2 flex flex-col justify-center gap-2"
      >
        <h2 className="text-4xl text-white font-bold mb-1 text-center">Apply for Competition</h2>

        {/* Display Game Title */}
        <div className="mb-2">
          {/* <label className="block text-white text-2xl font-bold mb-2 text-center">Game Title</label> */}
          <p className="text-2xl font-semibold text-white text-center">{card.gameTitle}</p>
        </div>

        <div className="mb-2">
          <label className="block text-white text-2xl font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border text-2xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
          />
        </div>

        <div className="mb-2">
          <label className="block text-white text-2xl font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="shadow appearance-none border text-2xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Phone Number"
          />
        </div>

        <div className="mb-2">
          <label className="block text-white text-2xl font-bold mb-2" htmlFor="gameId">
            Game ID
          </label>
          <input
            type="text"
            name="gameId"
            value={formData.gameId}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded text-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Game ID"
          />
          <p className="text-red-500 text-sm mt-1">! Please Enter GameID Carefully.</p>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            {loading ? "Submiting..." : "Submit Application"}
          </button >
        </div>
      </form>
    </div>
  );
};

export default CompetitionForm;
