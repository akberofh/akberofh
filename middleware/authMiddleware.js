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
const adminControlAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme hatası: Token bulunamadı' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (req.user.userType !== 'admin') {
          return res.status(403).json({ message: 'Yetki hatası: Admin değilsiniz' });
      }

      next();
  } catch (error) {
      console.error("Token doğrulama hatası:", error);
      return res.status(401).json({ message: 'Yetkilendirme hatası: Geçersiz token' });
  }
};


export { userControlAuth, adminControlAuth };
