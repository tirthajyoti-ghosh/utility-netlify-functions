const axios = require('axios');

exports.handler = async (event) => {
    const { httpMethod, body, headers } = event;

    let url = event.path.split('/.netlify/functions/cors-proxy/')[1];
    url = decodeURIComponent(url);
    url = new URL(url);

    Object.keys(event.queryStringParameters).forEach((key) => {
        url.searchParams.append(key, event.queryStringParameters[key]);
    });

    const response = await axios({
        method: httpMethod,
        url,
        data: body,
        headers,
    });

    return {
        statusCode: response.status,
        body: JSON.stringify(response.data),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    };
};
