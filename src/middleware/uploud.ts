import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

export default function upload(pathname: string) {
  if (!fs.existsSync(pathname)) {
    fs.mkdirSync(pathname, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, pathname);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  };

  const uploader = multer({
    storage,
    fileFilter,
  });

  return uploader;
}
