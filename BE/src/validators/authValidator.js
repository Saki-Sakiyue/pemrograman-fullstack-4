const validateLoginPayload = (payload = {}) => {
    const { identifier, password } = payload;

    if (!identifier || typeof identifier !== 'string' || !identifier.trim()) {
        return {
            valid: false,
            message: 'Identifier wajib diisi (username atau email).'
        };
    }

    if (!password || typeof password !== 'string' || !password.trim()) {
        return {
            valid: false,
            message: 'Password wajib diisi.'
        };
    }

    return { valid: true };
};

module.exports = {
    validateLoginPayload
};
