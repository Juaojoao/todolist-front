import { useState } from 'react';
import { ButtonComponent } from '../../components/buttons/button';
import { InputFormComponent } from '../../components/inputs/input-form';
import { LockIcon } from '../../components/svg/lock';
import { MailIcon } from '../../components/svg/mail';
import {
  bodyFormStyle,
  cardStyle,
  formStyle,
  inputErrorStyle,
  inputSuceessStyle,
} from './sytles';
import { SpinSvg } from '../../components/svg/spin';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { UserIcon } from '../../components/svg/user';
import {
  initialRegisterError,
  validateRegisterInputs,
} from '../../util/functions/validateRegister';
import { UserService } from '../../services/api/userService';
import { useMessage } from '../../context/useGlobalContext';
import { useNavigate } from 'react-router-dom';

// Validação com ZOD a ser implementada.
// import { z } from 'zod';

// const RegisterSchema = z
//   .object({
//     name: z.string().min(1, 'Digite um nome válido'),
//     email: z.string().email('Digite um email válido'),
//     password: z
//       .string()
//       .min(6, 'Sua senha deve ter no mínimo 6 caracteres')
//       .regex(
//         /[!@#$%^&*(),.?":{}|<>]/,
//         'Sua senha deve conter pelo menos um caractere especial',
//       )
//       .regex(/[A-Z]/, 'Sua senha deve conter pelo menos uma letra maiúscula')
//       .regex(/[a-z]/, 'Sua senha deve conter pelo menos uma letra minúscula')
//       .regex(/[0-9]/, 'Sua senha deve conter pelo menos um número'),
//     confirmPassword: z.string().min(1, 'Confirme sua senha'),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: 'As senhas não conferem',
//     path: ['confirmPassword'],
//   });

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const userService = new UserService();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const initialFormState: FormState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { input, handleInput } = useChangeInput<FormState>(initialFormState);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [error, setError] =
    useState<Record<keyof FormState, string>>(initialRegisterError);

  const { setMessage } = useMessage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);

    const { isValid, newErrors } = validateRegisterInputs(input);

    if (!isValid) {
      setError(newErrors || initialRegisterError);
      setIsLoad(false);
      return;
    }

    try {
      await userService.createUser({
        name: input.name,
        email: input.email,
        password: input.password,
      });
      setIsSubmit(true);
      setIsLoad(false);
      setMessage({
        type: 'success',
        message: 'Usuário cadastrado com sucesso!',
      });
      input.name = '';
      input.email = '';
      input.password = '';
      input.confirmPassword = '';
      navigate('/');
    } catch (error) {
      console.log(error);
      setIsLoad(false);
    }
  };

  const handleFieldError = (fieldName: keyof FormState) =>
    error[fieldName] ? inputErrorStyle : isSubmit ? inputSuceessStyle : '';

  return (
    <div className={bodyFormStyle}>
      <div className={`${cardStyle}`}>
        <form action="" className={formStyle} onSubmit={handleSubmit}>
          <InputFormComponent
            name="name"
            placeholder="Nome"
            type="text"
            onChange={handleInput('name')}
            value={input.name}
            className={handleFieldError('name')}
            icon={<UserIcon className={handleFieldError('name')} />}
          />

          <InputFormComponent
            name="email"
            placeholder="Email"
            type="text"
            onChange={handleInput('email')}
            value={input.email}
            className={handleFieldError('email')}
            icon={<MailIcon className={handleFieldError('email')} />}
          />

          <InputFormComponent
            placeholder="Password"
            type="password"
            icon={<LockIcon className={handleFieldError('password')} />}
            name="password"
            tooltip="Deve conter: Carateres especiais, letras maiúsculas e minúsculas e números."
            value={input.password}
            onChange={handleInput('password')}
            className={handleFieldError('password')}
          />

          <InputFormComponent
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            icon={<LockIcon className={handleFieldError('confirmPassword')} />}
            value={input.confirmPassword}
            onChange={handleInput('confirmPassword')}
            className={handleFieldError('confirmPassword')}
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
