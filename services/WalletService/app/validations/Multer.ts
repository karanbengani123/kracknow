
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the folder where uploaded files will be stored.
    },
    filename: (req, file, cb) => {
      console.log('============',req.body)
      const uniqueFilename = Date.now() + '-' + file.originalname; // Generate a unique filename for the uploaded file.
      cb(null, uniqueFilename);
    },
  });
  
 export const upload = multer({ storage: storage });
  