import { useState } from "react";
import { ButtonComponent } from "../../components/buttons/button";
import { InputFormComponent } from "../../components/inputs/input-form";
import { LockIcon } from "../../components/svg/lock";
import { MailIcon } from "../../components/svg/mail";
import {
  bodyFormStyle,
  cardStyle,
  formStyle,
  inputErrorStyle,
  inputSuceessStyle,
} from "./sytles";
import { SpinSvg } from "../../components/svg/spin";
import { useChangeInput } from "../../util/hooks/useChangeInput";

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const initialFormState: FormState = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialErrorState: FormState = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { input, handleInput, setInput } =
    useChangeInput<FormState>(initialFormState);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [error, setError] =
    useState<Record<keyof FormState, string>>(initialErrorState);

  const validateInputs = () => {
    const newErrors: Record<keyof FormState, string> = { ...initialErrorState };

    let isValid = true;

    if (input.email.trim() === "") {
      newErrors.email = "Digite seu Email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Digite um email válido";
      isValid = false;
    }

    if (input.password.trim() === "") {
      newErrors.password = "Digite sua senha";
      isValid = false;
    } else if (input.password.length < 6) {
      newErrors.password = "Sua senha deve ter no mínimo 6 caracteres";
      isValid = false;
    }

    if (input.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirme sua senha";
      isValid = false;
    } else if (input.confirmPassword !== input.password) {
      newErrors.confirmPassword = "As senhas não conferem";
      isValid = false;
    }

    if (Object.keys(newErrors).length === 0) {
      setInput(initialFormState);
    } else {
      setError(newErrors);
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);
    if (!validateInputs()) {
      setIsLoad(false);
      return;
    }

    try {
      setTimeout(() => {
        setIsSubmit(true);
        setIsLoad(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setIsLoad(false);
    }
  };
  const handleFieldError = (fieldName: keyof FormState) =>
    error[fieldName] ? inputErrorStyle : isSubmit ? inputSuceessStyle : "";
  return (
    <div className={bodyFormStyle}>
      <div className={`${cardStyle}`}>
        <form action="" className={formStyle} onSubmit={handleSubmit}>
          <InputFormComponent
            name="email"
            placeholder="Email"
            type="text"
            onChange={handleInput("email")}
            value={input.email}
            className={handleFieldError("email")}
            icon={<MailIcon className={handleFieldError("email")} />}
          />

          <InputFormComponent
            placeholder="Password"
            type="password"
            icon={<LockIcon className={handleFieldError("password")} />}
            name="password"
            value={input.password}
            onChange={handleInput("password")}
            className={handleFieldError("password")}
          />

          <InputFormComponent
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            icon={<LockIcon className={handleFieldError("confirmPassword")} />}
            value={input.confirmPassword}
            onChange={handleInput("confirmPassword")}
            className={handleFieldError("confirmPassword")}
          />

          <div className="flex flex-col  w-full gap-3">
            <ButtonComponent>
              {isLoad ? (
                <SpinSvg />
              ) : (
                <span className="text-gray-50">Register</span>
              )}
            </ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};
