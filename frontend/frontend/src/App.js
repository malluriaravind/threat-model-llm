import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogin = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <div className="App">
            {!token ? (
                <Login onLogin={handleLogin} />
            ) : (
                <Chat token={token} onLogout={handleLogout} />
            )}
        </div>
    );
}

export default App;