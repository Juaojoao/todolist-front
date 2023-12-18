import { ButtonComponent } from "../../components/buttons/button";
import { InputFormComponent } from "../../components/inputs/input-form";
import { LockIcon } from "../../components/svg/lock";
import { UserIcon } from "../../components/svg/user";
import { MailIcon } from "../../components/svg/mail";
import {
  avatarFormStyle,
  bodyFormStyle,
  cardStyle,
  formStyle,
  inputErrorStyle,
} from "../register/sytles";
import { useChangeInput } from "../../util/hooks/useChangeInput";
import { useState } from "react";
import { SpinSvg } from "../../components/svg/spin";

interface FormState {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const initialFormState: FormState = {
    email: "",
    password: "",
  };

  const initialErrorState: FormState = {
    email: "",
    password: "",
  };

  const { input, handleInput, setInput } =
    useChangeInput<FormState>(initialFormState);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [error, setError] =
    useState<Record<keyof FormState, string>>(initialFormState);

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
        setIsLoad(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsLoad(false);
    }
  };

  return (
    <div className={bodyFormStyle}>
      <div className={cardStyle}>
        <div className={avatarFormStyle}>
          <UserIcon />
        </div>
        <form action="" className={formStyle} onSubmit={handleSubmit}>
          <InputFormComponent
            placeholder="Email"
            type="text"
            icon={<MailIcon className={error.email ? "text-red-500" : ""} />}
            onChange={handleInput("email")}
            value={input.email}
            className={error.email ? inputErrorStyle : ""}
          />
          <InputFormComponent
            placeholder="Password"
            type="password"
            icon={<LockIcon className={error.password ? "text-red-500" : ""} />}
            onChange={handleInput("password")}
            value={input.password}
            className={error.password ? inputErrorStyle : ""}
          />

          <div className="flex flex-col  w-full gap-3">
            <a href="/forgot-pass" className="italic text-sm">
              Forgot password?
            </a>
            <ButtonComponent>{isLoad ? <SpinSvg /> : "Login"}</ButtonComponent>
          </div>
          <a href="/register" className="uppercase text-sm hover:underline">
            Create an account
          </a>
        </form>
      </div>
    </div>
  );
};
