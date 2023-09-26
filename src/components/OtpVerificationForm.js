import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useEmail } from './EmailContext';
import axios from 'axios';

const OtpVerificationForm = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    const { email } = useEmail();

    const handleInputChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/users/verify-otp', {
                email: email,
                otp: otp,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response);
            if (response.status === 200) {
                // Successful OTP verification, navigate to login
                navigate('/login');
            } else {
                // Handle OTP verification failure, e.g., display an error message
                console.error('OTP verification failed');
            }
        } catch (error) {
            // Handle network errors, e.g., display a network error message
            console.error('Network error:', error);
        }
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>OTP Verification</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="otp">Enter OTP</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="otp"
                                        name="otp"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mt-3">
                                    Verify OTP
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerificationForm;