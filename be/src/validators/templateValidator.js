const validateCreateTemplate = (payload = {}) => {
  const title = normalizeText(payload.title);
  const description = normalizeText(payload.description ?? payload.desc);
  const categoryId = Number(payload.category_id ?? payload.categoryId);
  const sourceUrl = normalizeOptionalUrl(payload.source_url);
  const demoUrl = normalizeOptionalUrl(payload.demo_url);
  const upload_type = payload.upload_type;

  if (!title) {
    return {
      valid: false,
      message: 'Title wajib diisi.',
    };
  }

  if (title.length < 3 || title.length > 100) {
    return {
      valid: false,
      message: 'Title harus antara 3-100 karakter.',
    };
  }

  if (!description) {
    return {
      valid: false,
      message: 'Description wajib diisi.',
    };
  }

  if (description.length < 10 || description.length > 1000) {
    return {
      valid: false,
      message: 'Description harus antara 10-1000 karakter.',
    };
  }

  // Validasi upload_type
  const validUploadTypes = ['file', 'link', 'both'];
  if (!upload_type || !validUploadTypes.includes(upload_type)) {
    return {
      valid: false,
      message: 'Upload type tidak valid. Pilih: file, link, atau both.',
    };
  }

  if (!Number.isInteger(categoryId) || categoryId < 1) {
    return {
      valid: false,
      message: 'Category wajib dipilih.',
    };
  }

  if (sourceUrl && !isValidUrl(sourceUrl)) {
    return {
      valid: false,
      message: 'Source URL tidak valid.',
    };
  }

  if (demoUrl && !isValidUrl(demoUrl)) {
    return {
      valid: false,
      message: 'Demo URL tidak valid.',
    };
  }

  return {
    valid: true,
    data: {
      title,
      description,
      category_id: categoryId,
      source_url: sourceUrl,
      demo_url: demoUrl,
      upload_type,
    },
  };
};

const normalizeText = value => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
};

const normalizeOptionalUrl = value => {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();

  return trimmed ? trimmed : null;
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
