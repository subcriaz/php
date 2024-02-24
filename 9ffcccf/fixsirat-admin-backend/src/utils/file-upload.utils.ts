export const imageFileFilter = (req, file, callback) => {
  // Check if the uploaded file is an image
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
