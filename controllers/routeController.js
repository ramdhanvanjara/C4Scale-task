const { getRoutes } = require('../utils/graphhopper');

exports.getRoute = async (req, res) => {
    const { from, to } = req.body;

    try {
        const routes = await getRoutes(from, to);
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
