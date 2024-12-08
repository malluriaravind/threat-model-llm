const jwt = require('jsonwebtoken');

// STRIDE: Spoofing Prevention through JWT Authentication
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        // Verify token - STRIDE: Tampering Prevention
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = { authMiddleware };