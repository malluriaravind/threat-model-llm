import React, { useState } from 'react';

function Chat({ token, onLogout }) {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();

            if (response.ok) {
                setResponse(data.response);
            } else {
                if (response.status === 401) {
                    onLogout();
                } else {
                    setError(data.error || 'Failed to get response');
                }
            }
        } catch (error) {
            setError('Connection error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>ChatGPT Secure API</h2>
                <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>

            <div className="chat-interface">
                <div className="response-area">
                    {response && <div className="response">{response}</div>}
                    {error && <div className="error">{error}</div>}
                </div>

                <form onSubmit={handleSubmit} className="prompt-form">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your prompt..."
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading || !prompt.trim()}>
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;