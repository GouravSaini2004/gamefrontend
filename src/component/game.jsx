import React from 'react';

function Game() {
    return (
        <div className='p-2 bg-indigo-600 '>
             {/* <h1 className='text-white pb-2 text-center text-4xl font-bold'>Available Game</h1> */}
            <div className='min-w-[320px] overflow-x-auto bg-violet-900 rounded-lg p-3 flex justify-around gap-6'>
                <div className='max-w-80 min-w-72 rounded-lg'>
                    <img src="https://dl.dir.freefiremobile.com/common/web_event/hash/54f31449f5f91cf0cc223cc635cd5952jpg" alt="" />
                </div>
                <div className='max-w-80 min-w-72 rounded-lg'>
                    <img src="https://wstatic-prod.pubg.com/web/live/static/og/img-og-pubg.jpg" alt="" />
                </div>
                <div className='max-w-80 min-w-72 rounded-lg'>
                    <img src="https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blackops6/meta/BO6_LP-meta_image.jpg" alt="" />
                </div>
                <div className='max-w-80 min-w-72 rounded-lg'>
                    <img src="https://wallpapers.com/images/featured/minecraft-background-cfljc4haleghnajo.jpg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Game;