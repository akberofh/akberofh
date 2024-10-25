import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const userControlAuth = async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Unauthorized - invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized - token not found' });
    }
};

// Admin kontrolünde JWT token doğrulaması da yapıldı
import jwt from 'jsonwebtoken';

const adminControlAuth = (req, res, next) => {
  const token = req.cookies.jwt; // JWT'nin cookie'den alındığından emin olun

  if (!token) {
    return res.status(401).json({ message: 'Yetkilendirme hatası' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Geçersiz token' });
    
    // Doğrulanan kullanıcı bilgisini `req.user` içine ekleyin
    req.user = decoded;

    // Kullanıcı `admin` değilse erişimi engelleyin
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ message: 'Forbidden - admin deyilsen' });
    }

    next();
  });
};

export default adminControlAuth;


export { userControlAuth, adminControlAuth };
