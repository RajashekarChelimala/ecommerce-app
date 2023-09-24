import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useEmail } from './EmailContext';
import axios from 'axios';

const VerifyAndResetPassword = () => {
    const [formData, setFormData] = useState({
        otp: '',
        newPassword: '',
        isOtpVerified: false,
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        // Send a request to verify OTP
        try {
            const response = await axios.post('http://localhost:8080/api/users/verify-otp', {
                email: email,
                otp: formData.otp,
            });

            if (response.status === 200) {
                setFormData({ ...formData, isOtpVerified: true });
            } else {
                console.error('OTP verification failed');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        // Send a request to update the password
        try {
            const response = await axios.post('http://localhost:8080/api/users/reset-password', {
                email: email,
                newPassword: formData.newPassword,
            });

            if (response.status === 200) {
                console.log('Password updated successfully');
                navigate('/login');
            } else {
                console.error('Password update failed');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const { email } = useEmail();
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>Verify OTP and Reset Password</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formData.isOtpVerified ? handleUpdatePassword : handleVerifyOtp}>
                                {!formData.isOtpVerified && (
                                    <div className="form-group">
                                        <label htmlFor="otp">OTP</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="otp"
                                            name="otp"
                                            placeholder="Enter OTP"
                                            value={formData.otp}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                )}

                                {formData.isOtpVerified && (
                                    <div className="form-group">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="newPassword"
                                            name="newPassword"
                                            placeholder="Enter new password"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary btn-block mt-3">
                                    {formData.isOtpVerified ? 'Update Password' : 'Verify OTP'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default VerifyAndResetPassword;
