const corsProxy = require('cors-anywhere');
const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Create CORS Anywhere server
const corsServer = corsProxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeaders: [],
    removeHeaders: [],
});

// Use CORS Anywhere server in Express middleware
app.use((req, res) => {
    corsServer.emit('request', req, res);
});

// Convert Express app to serverless function using serverless-http
exports.handler = serverless(app);