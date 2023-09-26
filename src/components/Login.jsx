import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Use useNavigate hook here
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://quickmenu.onrender.com/login', {
                username,
                password,
            });
            if (response.status === 200) {
                console.log('Login successful');
                console.log(response.data.restaurantId);
                localStorage.setItem('restaurantId', response.data.restaurantId);

                // Redirect to the '/dashboard' page
                navigate('/dashboard');
            } else {
                console.log('Login failed');
                setErrorMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center">
            <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md flex flex-col justify-center items-center ">
                <h1 className="text-2xl font-bold mb-5">Restaurant Login</h1>
                <input autoComplete="off" type="text" placeholder="Username" className="input input-primary w-full mt-3 max-w-xs" value={username} onChange={(e) => setUsername(e.target.value)} name={`username-${Math.random()}`}/>
                <input onKeyPress={handleKeyPress} autoComplete="off" type="password" placeholder="Password" className="input input-primary w-full mt-3 max-w-xs" value={password} onChange={(e) => setPassword(e.target.value)} name={`password-${Math.random()}`}/>
                <button className="btn btn-outline mt-5 btn-primary px-6 sm:px-16" onClick={handleLogin}>Login</button>
                {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Login;
