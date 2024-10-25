import jwt from 'jsonwebtoken';

const generateToken = (res, userId , userType) => {
    const token = jwt.sign({ userId ,userType}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, {
       
       
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 gün
    });
};

export default generateToken;
