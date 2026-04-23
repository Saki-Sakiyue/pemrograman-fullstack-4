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

const validateRegisterPayload = (payload = {}) => {
    const { username, email, password, passwordConfirm } = payload;

    // Validasi username
    if (!username || typeof username !== 'string' || !username.trim()) {
        return {
            valid: false,
            message: 'Username wajib diisi.'
        };
    }

    if (username.trim().length < 3 || username.trim().length > 20) {
        return {
            valid: false,
            message: 'Username harus antara 3-20 karakter.'
        };
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username.trim())) {
        return {
            valid: false,
            message: 'Username hanya boleh mengandung huruf, angka, underscore, dan dash.'
        };
    }

    // Validasi email
    if (!email || typeof email !== 'string' || !email.trim()) {
        return {
            valid: false,
            message: 'Email wajib diisi.'
        };
    }

    if (!isValidEmail(email.trim())) {
        return {
            valid: false,
            message: 'Format email tidak valid.'
        };
    }

    // Validasi password
    if (!password || typeof password !== 'string') {
        return {
            valid: false,
            message: 'Password wajib diisi.'
        };
    }

    if (password.length < 8) {
        return {
            valid: false,
            message: 'Password minimal 8 karakter.'
        };
    }

    if (!/[A-Z]/.test(password)) {
        return {
            valid: false,
            message: 'Password harus mengandung minimal 1 huruf besar.'
        };
    }

    if (!/[a-z]/.test(password)) {
        return {
            valid: false,
            message: 'Password harus mengandung minimal 1 huruf kecil.'
        };
    }

    if (!/[0-9]/.test(password)) {
        return {
            valid: false,
            message: 'Password harus mengandung minimal 1 angka.'
        };
    }

    // Validasi password confirmation
    if (!passwordConfirm || passwordConfirm !== password) {
        return {
            valid: false,
            message: 'Konfirmasi password tidak cocok.'
        };
    }

    return { valid: true };
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

module.exports = {
    validateLoginPayload,
    validateRegisterPayload
};
