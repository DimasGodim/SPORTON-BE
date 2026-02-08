"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = upload;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function upload(pathname) {
    if (!fs_1.default.existsSync(pathname)) {
        fs_1.default.mkdirSync(pathname, { recursive: true });
    }
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathname);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
        },
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only images are allowed"));
        }
    };
    const uploader = (0, multer_1.default)({
        storage,
        fileFilter,
    });
    return uploader;
}
