import express from 'express';
import session from 'express-session'; // Thêm express-session

const app = express();

// Cấu hình session middleware
app.use(session({
    secret: 'your-secret-key', // Khóa bí mật để mã hóa session ID
    resave: false, // Không lưu lại session nếu không thay đổi
    saveUninitialized: true, // Lưu session chưa khởi tạo
    cookie: { secure: false } // Nếu sử dụng HTTPS, hãy đặt secure: true
}));

// Các middleware và router khác của bạn
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
