const axios = require('axios');
const GRAPHOPPER_API_KEY = process.env.GRAPHHOPPER_API_KEY;

const getRoutes = async (from, to) => {
  
    const params = new URLSearchParams({
      profile: 'car',
      locale: 'en',
      elevation: 'false',
      instructions: 'true',
      calc_points: 'true',
      debug: 'false',
      points_encoded: 'true',
      'ch.disable': 'true',
      key: GRAPHOPPER_API_KEY ,
    });
    
    params.append('point', `${from.lat},${from.lng}`);
    params.append('point', `${to.lat},${to.lng}`);
  
    try {
        const response = await axios.get('https://graphhopper.com/api/1/route', {
            params: params
        });
    
        const data = response.data;;
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};





const getMatch = async (from, to) => {
    const params = new URLSearchParams({
        profile: 'car',
        locale: 'en',
        elevation: 'false',
        instructions: 'true',
        calc_points: 'true',
        debug: 'false',
        points_encoded: 'false', // changed to false to simplify decoding
        key: GRAPHOPPER_API_KEY,
    });

    params.append('point', `${from.lat},${from.lng}`);
    params.append('point', `${to.lat},${to.lng}`);

    try {
        const response = await axios.get('https://graphhopper.com/api/1/route', { params });
        const data = response.data;
        if (!data.paths || data.paths.length === 0) {
            throw new Error('No valid routes found');
        }
        return data.paths;
    } catch (error) {
        console.error('Error fetching routes:', error);
        throw new Error('Failed to fetch routes');
    }
};



module.exports = { getRoutes,getMatch};
