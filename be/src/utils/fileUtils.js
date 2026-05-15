const fs = require('fs');
const path = require('path');
const logger = require('./logger');

/**
 * Utility function to delete a file from the public directory based on its URL.
 * @param {string} fileUrl - The URL of the file to be deleted (e.g., "/uploads/avatars/filename.jpg")
 */
const deletePublicFile = fileUrl => {
  if (!fileUrl) return;

  // Hapus leading slash jika ada
  const cleanPath = fileUrl.startsWith('/') ? fileUrl.slice(1) : fileUrl;

  // Mundur ke root BE dan gabungkan dengan path file
  const absolutePath = path.join(__dirname, '../../public', cleanPath);

  if (fs.existsSync(absolutePath)) {
    try {
      fs.unlinkSync(absolutePath);
    } catch (error) {
      logger.error(
        { err: error.message, stack: error.stack },
        `Failed to delete file at ${absolutePath}`
      );
    }
  }
};

module.exports = {
  deletePublicFile,
};
