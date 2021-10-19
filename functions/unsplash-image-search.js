const axios = require('axios');

exports.handler = async (event) => {
    try {
        const {
            // eslint-disable-next-line camelcase
            query, orientation, page, per_page, order_by, collections, content_filter, color,
        } = event.queryStringParameters;

        if (!query) {
            return {
                statusCode: 400,
                body: 'Bad request. "query" must be present',
            };
        }

        const { data } = await axios.get('https://api.unsplash.com/search/photos/',
            {
                params: {
                    client_id: process.env.UNSPLASH_ACCESS_KEY,
                    query,
                    page,
                    collections,
                    color,
                    orientation,
                    content_filter,
                    per_page,
                    order_by,
                },
            });

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTION',
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed fetching data' }),
        };
    }
};
