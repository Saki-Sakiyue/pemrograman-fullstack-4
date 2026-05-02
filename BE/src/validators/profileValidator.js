const validateUpdateProfile = (payload = {}) => {
  const { username, password, avatar_url } = payload;
  const normalized = {
    username: null,
    password: null,
    avatar_url: null,
  };

  if (username && typeof username !== "string") {
    return { valid: false, message: "Username must be a string" };
  }
  if (password && typeof password !== "string") {
    return { valid: false, message: "Password must be a string" };
  }
  if (avatar_url && typeof avatar_url !== "string") {
    return { valid: false, message: "Avatar URL must be a string" };
  }

  if (typeof username === "string") {
    const trimmed = username.trim();
    normalized.username = trimmed.length > 0 ? trimmed : null;
  }

  if (typeof password === "string") {
    const trimmed = password.trim();
    normalized.password = trimmed.length > 0 ? trimmed : null;
  }

  if (typeof avatar_url === "string") {
    const trimmed = avatar_url.trim();
    normalized.avatar_url = trimmed.length > 0 ? trimmed : null;
  }

  return { valid: true, data: normalized };
};

module.exports = {
  validateUpdateProfile,
};
