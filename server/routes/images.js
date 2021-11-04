const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const UserService = require("../services/UserService");

const { uploadFile, getFileStream } = require("../utils/s3");

router.get("/download/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

router.post("/upload", upload.single("image"), async (req, res) => {
  const file = req.file;
  const userId = req.body.userId;
  const result = await uploadFile(file);
  const image = `/api/images/download/${result.Key}`;
  await UserService.storeImage(image, userId);
  res.send({ imagePath: image });
});

module.exports = router;