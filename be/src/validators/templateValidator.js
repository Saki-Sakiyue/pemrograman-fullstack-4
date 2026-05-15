const validateCreateTemplate = (payload = {}) => {
  const { title, description, upload_type, source_url, category_id } = payload;

  // Validasi title
  if (!title || typeof title !== 'string' || !title.trim()) {
    return {
      valid: false,
      message: 'Title wajib diisi.',
    };
  }

  if (title.trim().length < 3 || title.trim().length > 100) {
    return {
      valid: false,
      message: 'Title harus antara 3-100 karakter.',
    };
  }

  // Validasi description
  if (!description || typeof description !== 'string' || !description.trim()) {
    return {
      valid: false,
      message: 'Description wajib diisi.',
    };
  }

  if (description.trim().length < 10 || description.trim().length > 1000) {
    return {
      valid: false,
      message: 'Description harus antara 10-1000 karakter.',
    };
  }

  // Validasi upload_type
  const validUploadTypes = ['file', 'url', 'both'];
  if (!upload_type || !validUploadTypes.includes(upload_type)) {
    return {
      valid: false,
      message: `Upload type harus salah satu dari: ${validUploadTypes.join(', ')}`,
    };
  }

  // Validasi source_url jika ada
  if (source_url) {
    if (typeof source_url !== 'string') {
      return {
        valid: false,
        message: 'Source URL harus berupa string.',
      };
    }

    if (!isValidUrl(source_url)) {
      return {
        valid: false,
        message: 'Source URL tidak valid.',
      };
    }
  }

  // Validasi category_id
  if (!category_id || typeof category_id !== 'number' || category_id < 1) {
    return {
      valid: false,
      message: 'Category ID wajib diisi dan harus berupa angka positif.',
    };
  }

  return { valid: true };
};

const isValidUrl = string => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

module.exports = {
  validateCreateTemplate,
};
