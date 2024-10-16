import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Card() {
    const [card, setCard] = useState([]);
    const [cards, setCards] = useState([])
    const [loadingGames, setLoadingGames] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [error, setError] = useState(null);
    const data = localStorage.getItem('user');
    const use = JSON.parse(data);

    const toggleStatus = async (gameId) => {
        setLoadingUpdate(true);
        try {
            const response = await fetch(`https://gamingbackend-dkf6.onrender.com/game/update_game/${gameId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // alert("Some error, please try again");
                return; // Exit early if there was an error
            }

            const result = await response.json();
            // alert(result.msg);
            window.location.reload(); // Show success message
        } catch (err) {
            setError(err.message);
            alert('Error updating status: ' + err.message);
        } finally {
            setLoadingUpdate(false); // Ensure loading is turned off regardless of success or error
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoadingGames(true); // Start loading when the function is called
            try {
                const response = await fetch(`https://gamingbackend-dkf6.onrender.com/game/get_game`);
                if (!response.ok) {
                    throw new Error("Failed to fetch games");
                }

                const data = await response.json();
                // console.log(data);

                const activeCards = data.games?.filter(item => item.status === 1) || [];
                const inactiveCards = data.games?.filter(item => item.status === 0) || []; // Handle case if games is undefined
                setCard(activeCards);
                setCards(inactiveCards);
            } catch (err) {
                setError(err.message || "Error fetching game data.");
            } finally {
                setLoadingGames(false); // Ensure loading is turned off regardless of success or error
            }
        };

        fetchUser();
    }, []); // No need to include toggleStatus in dependencies, it won't change

    if (loadingGames) {
        return <div className="text-3xl text-blue-900 font-bold text-center pt-10 pb-10">Loading....</div>// Loading state
    }

    if (error) {
        return <div className="text-red-500 text-center pt-10 pb-10">{error} please refresh the page</div>; // Error state
    }

    return (
        <>
            <div className='bg-indigo-950 p-5'>
                <h1 className='text-white pb-1 text-center text-4xl font-bold'>Browse Tournaments</h1>
                <p className='text-white pb-8 pt-0 text-center text-xl'>Find the perfect tournaments for you.</p>
                <div className='flex flex-wrap justify-center gap-5'>
                    {card && card.length > 0 ? (
                        card.map((item) => (
                            <div key={item._id} className="card w-96 shadow-xl">
                                <figure className="px-5 pt-5">
                                    <img
                                        src={item.gameImage}
                                        alt={item.gameTitle}
                                        className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center w-full">
                                    <h2 className="card-title text-white">{item.gameTitle}</h2>
                                    <div className='flex flex-col gap-2 text-white w-full'>
                                        <div className='bg-violet-900 text-white p-1 rounded-lg w-full'>
                                            <p>Time: {new Date(item.gameDate).toLocaleString()}</p>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='flex justify-between gap-2 bg-violet-800 rounded-lg p-1'>
                                                <div className='border rounded border-gray-400 w-full'>
                                                    <p className='font-bold'>Entry/Player</p>
                                                    <p className='text-sky-500 font-bold'>{item.fees} Rupess</p>
                                                </div>
                                                <div className='border rounded border-gray-400 w-full'>
                                                    <p className='font-bold'>Max Player</p>
                                                    <p className='text-sky-500 font-bold'>{item.maxPlayers}</p>
                                                </div>
                                            </div>
                                            <div className='flex justify-between gap-2 bg-violet-800 rounded-lg p-1'>
                                                <div className='border rounded border-gray-400 w-full'>
                                                    <p className='font-bold'>Enrolled</p>
                                                    <p className='text-sky-500 font-bold'>25</p> {/* Replace with actual data if available */}
                                                </div>
                                                <div className='border rounded border-gray-400 w-full'>
                                                    <p className='font-bold'>Team Size</p>
                                                    <p className='text-sky-500 font-bold'>{item.teamSize}</p> {/* Update accordingly */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-actions">
                                        <Link to={`/apply/${item._id}`} className="btn bg-orange-600 font-bold text-xl text-white">Apply Now</Link>
                                    </div>
                                    {use && use.role === "admin" && (
                                        <div className="card-actions">
                                            <button onClick={() => toggleStatus(item._id)} className="btn bg-orange-600 font-bold text-xl text-white" disabled={loadingUpdate}>
                                                {loadingUpdate ? "Updating..." : "Complete"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-white text-center">No active tournaments available.</div>
                    )}
                </div>
            </div>
            <div className='bg-indigo-950 p-5'>
            <h1 className='text-white pb-1 text-center text-4xl font-bold'>Completed Tournaments</h1>
            {/* <p className='text-white pb-8 pt-0 text-center text-xl'>Find the perfect taurnaments for you.</p> */}
            <div className='flex flex-wrap justify-center gap-5'>
                {cards && cards.length > 0 && cards.map((item) => (
                    <div key={item._id} className="card w-96 shadow-xl">
                        <figure className="px-5 pt-5">
                            <img
                                src={item.gameImage}
                                alt="Shoes"
                                className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center w-full">
                            <h2 className="card-title text-white">{item.gameTitle}</h2>
                            <div className='flex flex-col gap-2 text-white w-full'>
                                <div className='bg-violet-900 text-white p-1 rounded-lg w-full'><p>{new Date(item.gameDate).toLocaleString()}</p></div>
                                {use && use.role === "admin" && (
                                    <div className='bg-orange-700 text-white p-1 rounded-lg'><button>Delete</button></div>
                                )
                                }
                                

                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
        </>
    );
}

export default Card;
