const multer = require('multer');
const path = require('path');

// 1. Nastavení úložiště
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

// 2. Kontrola typu souboru
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Nepovolený typ souboru. Povolené typy jsou JPEG, PNG a GIF.'), false);
    }
};

// 3. Middleware multer
const uploadMiddleware = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Omezení velikosti na 5 MB
    fileFilter,
}).array('images', 3);

// 4. Middleware pro zpracování
const multerMiddleware = (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: `Multer Error: ${err.message}` });
            } else {
                return res.status(400).json({ error: err.message });
            }
        }
        next();
    });
};

module.exports = multerMiddleware;