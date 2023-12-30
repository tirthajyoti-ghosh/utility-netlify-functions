const axios = require('axios').default;
const https = require('https');

exports.handler = async (event) => {
    const { httpMethod, body, headers } = event;

    let url = event.path.split('/.netlify/functions/cors-proxy/')[1];
    url = decodeURIComponent(url);

    // Disable SSL certificate verification (use with caution)
    const agent = new https.Agent({
        rejectUnauthorized: false,
    });

    try {
        const response = await axios({
            method: httpMethod,
            url,
            data: body,
            headers,
            httpsAgent: agent, // Use the agent to bypass SSL verification
        });

        return {
            statusCode: response.status,
            body: JSON.stringify(response.data),
            headers: {
                'Access-Control-Allow-Origin': '*', // Adjust as needed
                'Access-Control-Allow-Headers': 'Content-Type', // Adjust as needed
            },
        };
    } catch (error) {
        return {
            statusCode: error.response ? error.response.status : 500,
            body: JSON.stringify({ error: 'Failed to fetch data' }),
            headers: {
                'Access-Control-Allow-Origin': '*', // Adjust as needed
                'Access-Control-Allow-Headers': 'Content-Type', // Adjust as needed
            },
        };
    }
};
