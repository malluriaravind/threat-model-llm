const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// STRIDE: Authorization & Authentication
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // Input validation - STRIDE: Tampering Prevention
        if (!prompt || typeof prompt !== 'string' || prompt.length > 1000) {
            return res.status(400).json({ error: 'Invalid prompt' });
        }

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        });

        res.json({ response: completion.data.choices[0].message.content });
    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ error: 'Failed to get response' });
    }
});

module.exports = router;