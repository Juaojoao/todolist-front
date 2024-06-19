interface FormValidation {
    email: string;
    password: string;
}

export const initialLoginError: FormValidation = {
    email: "",
    password: "",
};

export const validateLoginInputs = (input: FormValidation) => {
    const newErrors: Record<keyof FormValidation, string> = { ...initialLoginError };

    let isValid = true;
    const emailTrim = input.email.trim();
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordTrim = input.password.trim();
    const passwordLength = input.password.length;

    if (emailTrim === "" || passwordTrim === "") {
        newErrors.email = "Email e senha são obrigatórios";
        isValid = false;
    }

    if (!emailRegex.test(input.email)) {
        newErrors.email = "Digite um email válido";
        isValid = false;
    }

    if (input.password.trim() === "") {
        newErrors.password = "Digite sua senha";
        isValid = false;
    }

    if (passwordLength < 6) {
        newErrors.password = "Sua senha deve ter no mínimo 6 caracteres";
        isValid = false;
    }

    if (Object.keys(newErrors).length > 0) {
        return { isValid, newErrors };
    }

    return { isValid };
}