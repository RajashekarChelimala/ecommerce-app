import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import axiosInstance from './api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);

    useEffect(() => {
        // Check if the user is already logged in (token exists)
        const token = localStorage.getItem('token');
        console.log("Heloooooooooooooooo");
        if (token) {
            try {
                // Decode the JWT token to get the expiration timestamp
                const tokenPayload = JSON.parse(atob(token.split('.')[1]));
                const expirationTimestamp = tokenPayload.exp * 1000; // Convert to milliseconds
                console.log("Exp::::>"+expirationTimestamp);
                
                // Check if the token has expired
                if (Date.now() >= expirationTimestamp) {
                    // Token is  expired, remove it and log the user out
                    localStorage.removeItem('token');
                } else {
                    // Token is still valid, redirect to the home page
                    navigate('/');
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRecaptchaVerify = (response) => {
        // This callback will be called when reCAPTCHA is successfully verified
        setRecaptchaVerified(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!recaptchaVerified) {
            // reCAPTCHA is not verified, display an error message or alert
            alert('Please verify that you are not a robot.');
            return;
        }

        try {
            // Your login logic here...
            // If the reCAPTCHA is verified, you can proceed with login.
            const response = await axiosInstance.post('/api/users/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                try {
                    const data = response.data;

                    // Store the JWT token in your application state or local storage
                    // Example using local storage:
                    console.log(data.token);
                    localStorage.setItem('token', data.token);

                    // Navigate to the home page
                    navigate('/');
                } catch (error) {
                    console.error('Error parsing response JSON:', error);
                }
            } else {
                console.error('Login failed');
            }

        } catch (error) {
            console.error('Network error:', error);
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
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

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Add reCAPTCHA widget */}
                                <ReCAPTCHA
                                    sitekey="6LfSVSUoAAAAAHvkLCVL7mfDRA8stKNxp7_Wo2bd"
                                    onChange={handleRecaptchaVerify} className='mt-3'
                                />

                                <button type="submit" className="btn btn-primary btn-block mt-3">
                                    Login
                                </button>
                                <p className="mt-3 text-center">
                                    Don't have an account? <a href="/signup">Register</a>
                                </p>
                                <p className="mt-2 text-center">
                                    <a href="/forgot-password">Forgot Password?</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;