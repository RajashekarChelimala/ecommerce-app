import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmail } from './EmailContext';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
    });

    const { setEmail } = useEmail();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            setEmail(formData.email);
            const response = await fetch('http://localhost:8080/api/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // OTP sent successfully, show OTP verification component
                navigate(`/reset-password`);
            } else {
                // Handle error, e.g., display an error message
                console.error('Failed to send OTP');
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>Forgot Password</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleForgotPassword}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mt-3">
                                    Send OTP
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
