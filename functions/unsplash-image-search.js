const axios = require('axios');

exports.handler = async (event) => {
    try {
        const { query, orientation, page, perPage, orderBy, collections, contentFilter, color } = event.queryStringParameters;

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
                    content_filter: contentFilter,
                    per_page: perPage,
                    order_by: orderBy,
                }
            });


        return { statusCode: 200, body: JSON.stringify(data) };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed fetching data' }),
        };
    }
};
