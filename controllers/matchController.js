const { getMatch } = require('../utils/graphhopper');

const pointToSegmentDistance = (point, segStart, segEnd) => {
    const toRadians = (deg) => deg * (Math.PI / 180);

    const lat1 = toRadians(segStart[1]);
    const lon1 = toRadians(segStart[0]);
    const lat2 = toRadians(segEnd[1]);
    const lon2 = toRadians(segEnd[0]);
    const lat3 = toRadians(point.lat);
    const lon3 = toRadians(point.lng);

    const a = lat1 - lat2;
    const b = lon1 - lon2;
    const A = lat3 - lat1;
    const B = lon3 - lon1;
    const C = lat3 - lat2;
    const D = lon3 - lon2;

    const dist1 = A * b - B * a;
    const dist2 = C * b - D * a;

    if ((dist1 >= 0 && dist2 <= 0) || (dist1 <= 0 && dist2 >= 0)) {
        return Math.abs((lat1 - lat2) * (lon1 - lon3) - (lon1 - lon2) * (lat1 - lat3)) / Math.sqrt(a * a + b * b);
    }

    const dist3 = Math.sqrt(A * A + B * B);
    const dist4 = Math.sqrt(C * C + D * D);

    return Math.min(dist3, dist4) * 6371000; 
};

exports.matchPoint = async (req, res) => {
    const { from, to, point } = req.body;
    try {
        const routes = await getMatch(from, to);

        let falls_within = false;
        let nearest_line = null;

        routes.forEach(route => {
            const coordinates = route.points.coordinates;
            if (!Array.isArray(coordinates) || coordinates.length < 2) {
                throw new Error('Invalid route data structure: coordinates array not found or insufficient points');
            }

            coordinates.forEach((coord, index) => {
                if (index < coordinates.length - 1) {
                    const dist = pointToSegmentDistance(point, coord, coordinates[index + 1]);
                    if (dist <= 100) {
                        falls_within = true;
                        nearest_line = { from: coord, to: coordinates[index + 1] };
                    }
                }
            });
        });

        res.json({
            point,
            falls_within,
            line: nearest_line
        });
    } catch (error) {
        console.error('Error in matchPoint:', error.message);
        res.status(500).json({ error: error.message });
    }
};
