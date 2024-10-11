import React from 'react';

function Hero() {
    return (
        <div
            className="hero min-h-[300px] lg:min-h-[400px] pt-10"
            style={{
                backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4uqC53vRdQiiwcijGdiIeBUXU80Lku4YXNA&s)",
            }}>
            {/* <div className="hero-overlay bg-opacity-60"></div> */}
            <div className="hero-content text-neutral-content text-center pt-10">
                <div className="w-full text-wrap">
                    <h1 className="mb-1 md:text-3xl font-bold text-sky-500">PLAY UNLIMITED</h1>
                    <h1 className="mb-5 md:text-5xl font-bold text-sky-500">TOURNAMENTS</h1>
                    <p className="mb-5">
                        Maybe it’s because people who aren’t into gaming just don’t get what it’s about. Maybe it’s because they live partially in an alternate reality that not everyone is experiencing. Or maybe it’s just because gaming isn’t for everyone.
                    </p>
                    {/* <button className="btn hover:bg-blue-700 bg-orange-600 rounded-lg text-xl text-white font-bold">Get Started</button> */}
                </div>
            </div>
        </div>
    );
}

export default Hero;