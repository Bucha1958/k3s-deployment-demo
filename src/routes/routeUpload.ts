import { Router } from 'express';
import { upload } from '../config/multerConfig';

const router = Router();

router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.json({
      message: 'File uploaded successfully',
      url: req.file.path,
    });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
});

export default router;
