// src/TermsAndConditions.js

import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center bg-indigo-950'>
            <div className="max-w-4xl mx-auto p-6 pt-20 h-full overflow-y-auto text-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
                <p className="mb-4">
                    Welcome to our online mobile game competition! By participating in our competitions, you agree to the following terms and conditions.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
                <p className="mb-4">
                    Participants must be at least 18 years old or have parental consent to enter. Participants must reside in countries where the competition is legally allowed.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">2. Registration</h2>
                <p className="mb-4">
                    All participants must complete the registration form and pay the entry fee before the competition starts. Registration is non-transferable and fees are non-refundable.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">3. Refund Policy</h2>
                <p className="mb-4">
                    All entry fees are non-refundable. Once the registration is completed and payment is processed, participants cannot request a refund under any circumstances. Please ensure you are committed to participating before registering.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">4. Code of Conduct</h2>
                <p className="mb-4">
                    Participants must behave respectfully towards other players and adhere to fair play standards. Any form of cheating, harassment, or inappropriate behavior will result in disqualification.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">5. Prizes</h2>
                <p className="mb-4">
                    Prizes will be awarded according to the competition rules. Winners will be notified via email, and prizes must be claimed within a specified time frame.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
                <p className="mb-4">
                    We are not responsible for any technical issues, losses, or damages resulting from participation in the competition.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">7. Modifications</h2>
                <p className="mb-4">
                    We reserve the right to modify these terms and conditions at any time. Participants will be notified of any changes via email or through our website.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">8. Governing Law</h2>
                <p className="mb-4">
                    These terms and conditions are governed by the laws of [Your Country/Region]. Any disputes arising from these terms will be resolved in the appropriate courts of [Your Country/Region].
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">9. Acceptance of Terms</h2>
                <p>
                    By registering for our competitions, you acknowledge that you have read, understood, and agree to these terms and conditions.
                </p>
            </div>
        </div>
    );
};

export default TermsAndConditions;
