import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'; // Import Axios

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
        if (token) {
            // Redirect to the home page or any other authenticated route
            navigate('/admin'); // Change '/home' to the appropriate route
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
            const response = await axios.post('http://localhost:8080/api/users/login', formData, {
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
                    navigate('/admin'); // Use the navigate function
                } catch (error) {
                    console.error('Error parsing response JSON:', error);
                    // Handle the error, e.g., display an error message to the user
                }
            } else {
                // Handle login failure, e.g., display an error message
                console.error('Login failed');
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
