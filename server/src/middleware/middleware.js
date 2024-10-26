// import express from 'express';
// import session from 'express-session'; // Thêm express-session

// const app = express();

// // Cấu hình session middleware
// app.use(session({
//     secret: 'your-secret-key', // Khóa bí mật để mã hóa session ID
//     resave: false, // Không lưu lại session nếu không thay đổi
//     saveUninitialized: true, // Lưu session chưa khởi tạo
//     cookie: { secure: false } // Nếu sử dụng HTTPS, hãy đặt secure: true
// }));

// // Các middleware và router khác của bạn
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// =------------------------------
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv/config'

const createJWT = (payload) => {
    const key = process.env.JWT_SECRET;
    let token = null;

    try {

        token = jwt.sign(payload, key, { expiresIn: '1h' });
    } catch (err) {
        console.error('Lỗi tạo JWT:', err);
    }

    return token;
};

const verifyToken = (token) => {
    const key = process.env.JWT_SECRET;
    let decoded = null;
    
    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.error('Error verifying token:', err);
    }
    
    return decoded;
};

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt; // Lấy token từ cookie
    if (!token) return res.status(401).json({ message: 'Không tìm thấy token' });

    try {
        const decoded = verifyToken(token); // Xác minh token
        req.user = decoded; // Lưu thông tin người dùng vào request
        next(); // Tiếp tục đến middleware hoặc route tiếp theo
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

export default { createJWT, verifyToken, authMiddleware };