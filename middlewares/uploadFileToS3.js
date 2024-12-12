import multer from "multer"
import { envKeys } from "../config/keys.js";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!envKeys.PROFILE_IMAGE_TYPE.includes(file.mimetype)) {
            cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"))
        }

        cb(null, true);
    },
    limits: { fileSize: 1000000 },
});  