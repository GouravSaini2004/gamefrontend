import React from 'react';
import { GiHumanPyramid } from "react-icons/gi";
import { MdPaid } from "react-icons/md";
import { MdMobileFriendly } from "react-icons/md";
import { RiLuggageDepositFill } from "react-icons/ri";

function Guide() {
    return (
        <div className='flex justify-center w-full bg-indigo-950 p-8'>
            <div className='hidden sm:block p-8 w-11/12 text-white'>
            <h1 className='text-4xl text-white font-bold text-center p-1'>HOW IT WORKS</h1>
            <p className='text-xl text-white text-center pb-10'>It is easier then you think</p>
                <div className='flex justify-around'>
                    <div className="indicator flex flex-col h-32">
                        <span className="indicator-item badge badge-secondary font-semibold text-3xl p-4">1</span>
                        <div className="bg-violet-900 rounded-lg grid h-32 w-32 place-items-center"><MdMobileFriendly size={50} /></div>
                        <p className='text-center text-2xl font-semibold'>Signup</p>
                    </div>

                    <div className="indicator flex flex-col h-32">
                        <span className="indicator-item badge badge-secondary font-semibold text-3xl p-4">2</span>
                        <div className="bg-violet-900 rounded-lg grid h-32 w-32 place-items-center"><RiLuggageDepositFill size={50} /></div>
                        <p className='text-center text-2xl font-semibold'>deposit</p>
                    </div>

                    <div className="indicator flex flex-col h-32">
                        <span className="indicator-item badge badge-secondary font-semibold text-3xl p-4">3</span>
                        <div className="bg-violet-900 rounded-lg grid h-32 w-32 place-items-center"><GiHumanPyramid size={50} /></div>
                        <p className='text-center text-2xl font-semibold'>Compete</p>
                    </div>
                    <div className="indicator flex flex-col h-32">
                        <span className="indicator-item badge badge-secondary font-semibold text-3xl p-4">4</span>
                        <div className="bg-violet-900 rounded-lg grid h-32 w-32 place-items-center"><MdPaid size={50} /></div>
                        <p className='text-center text-2xl font-semibold'>Win</p>
                    </div>

                </div>
                {/* <div className='flex justify-center pt-8'><button className="btn bg-orange-600 text-3xl rounded-3xl font-bold text-white">Join</button></div> */}
            </div>
            <div className='sm:hidden p-2'>
                <div className="flex flex-col justify-center gap-5 items-center shadow md:hidden text-white">
                    <h1 className='text-3xl text-white font-bold text-center p-2 pb-0'>HOW IT WORKS</h1>
                    <p className='text-xl text-white text-center p-2 pt-0'>It is easier then you think</p>
                    <div className="indicator flex flex-col h-32">
                        <span className="indicator-item badge badge-secondary font-semibold text-3xl p-4">1</span>
                        <div className="bg-violet-900 rounded-lg grid h-32 w-32 place-items-center"><MdMobileFriendly size={50} /></div>
                        <p className='text-center text-2xl font-semibold'>Signup</p>
                    </div>

                    <div className="indicator flex flex-col h-32">
                        <span className="indicator-item badge badge-secondary font-semibold text-3xl p-4">2</span>
                        <div className="bg-violet-900 rounded-lg grid h-32 w-32 place-items-center"><RiLuggageDepositFill size={50} /></div>
                        <p className='text-center text-2xl font-semibold'>deposit</p>
                    </div>

                    <div className="indicator flex flex-col h-32">
                        <span className="indicator-item badge badge-secondary font-semibold text-3xl p-4">3</span>
                        <div className="bg-violet-900 rounded-lg grid h-32 w-32 place-items-center"><GiHumanPyramid size={50} /></div>
                        <p className='text-center text-2xl font-semibold'>Compete</p>
                    </div>
                    <div className="indicator flex flex-col h-32">
                        <span className="indicator-item badge badge-secondary font-semibold text-3xl p-4">4</span>
                        <div className="bg-violet-900 rounded-lg grid h-32 w-32 place-items-center"><MdPaid size={50} /></div>
                        <p className='text-center text-2xl font-semibold'>Win</p>
                    </div>
                    {/* <button className="btn bg-orange-600 text-3xl rounded-3xl font-bold text-white">Join</button> */}
                </div>
            </div>
        </div>
    );
}

export default Guide;