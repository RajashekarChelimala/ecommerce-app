import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ isAuthenticated }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'yellow' }}>
            <Link className="navbar-brand" to="/home">
                <img src="/logo.png" width="30" height="30" alt="Logo" className='mx-2 align-top' />
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/categories">Categories</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/vendor">Vendor</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/customer">Customer</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/material">Material</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                    </li>
                    {!isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Signup</Link>
                            </li>
                        </>
                    )}
                    {isAuthenticated && (
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>

    );
}
