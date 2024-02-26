interface FormValidation {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const initialRegisterError: FormValidation = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export const validateRegisterInputs = (input: FormValidation) => {
    const newErrors: Record<keyof FormValidation, string> = { ...initialRegisterError };

    let isValid = true;
    const emailTrim = input.email.trim();
    const emailRegex = /\S+@\S+\.\S+/;
    const nameTrim = input.name?.trim();
    const passwordTrim = input.password.trim();
    const passwordLength = input.password.length;
    const confirmPasswordTrim = input.confirmPassword ? input.confirmPassword.trim() : '';

    if (emailTrim === "") {
        newErrors.email = "Digite seu Email";
        isValid = false;
    }
    if (!emailRegex.test(input.email)) {
        newErrors.email = "Digite um email válido";
        isValid = false;
    }
    if (passwordTrim === "") {
        newErrors.password = "Digite sua senha";
        isValid = false;
    }
    if (passwordLength < 6) {
        newErrors.password = "Sua senha deve ter no mínimo 6 caracteres";
        isValid = false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(input.password)) {
        newErrors.password = "Sua senha deve conter pelo menos um caractere especial";
        isValid = false;
    }
    if (!/[A-Z]/.test(input.password)) {
        newErrors.password = "Sua senha deve conter pelo menos uma letra maiúscula";
        isValid = false;
    }
    if (!/[a-z]/.test(input.password)) {
        newErrors.password = "Sua senha deve conter pelo menos uma letra minúscula";
        isValid = false;
    }
    if (!/[0-9]/.test(input.password)) {
        newErrors.password = "Sua senha deve conter pelo menos um número";
        isValid = false;
    }
    if (passwordTrim === "") {
        newErrors.confirmPassword = "Confirme sua senha";
        isValid = false;
    }
    if (confirmPasswordTrim !== input.password) {
        newErrors.confirmPassword = "As senhas não conferem";
        isValid = false;
    }
    if (nameTrim === "") {
        newErrors.name = "Digite seu nome";
        isValid = false;
    }
    if (input.password !== input.confirmPassword) {
        newErrors.confirmPassword = "As senhas não conferem";
        isValid = false;
    }

    if (Object.keys(newErrors).length > 0) {
        return { isValid, newErrors };
    }

    return { isValid };

}