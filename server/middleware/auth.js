const jwt=require('jsonwebtoken');

module.exports=(req, res, next) => {
    const authHeader=req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token=authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token error, authorization denied' });
    }

    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};
