const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// STRIDE: Spoofing Prevention - Authentication Endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // In production, replace with database authentication
    if (username === "user" && password === "password") {
        // Generate JWT Token - STRIDE: Information Disclosure Prevention
        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});