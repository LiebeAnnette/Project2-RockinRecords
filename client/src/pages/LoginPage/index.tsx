import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    // handles form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (username && password) {
          navigate('/home');
        } else {
            setErrorMessage('Please enter both username and password');
        }
    };

    return (
        <div className='login-page'>
            <h1>Rockin' Records</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                      type='text'
                      id='username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder='Enter your username' required
                      />
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Enter your password' required
                      />
                </div>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <button type='submit' className='login-button'>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;