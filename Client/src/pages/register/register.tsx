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
import { UserService } from '../../services/api/userService';
import { useMessage } from '../../context/useGlobalContext';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Validação com ZOD a ser implementada.

const RegisterSchema = z
  .object({
    name: z.string().min(1, 'Digite um nome válido'),
    email: z.string().email('Digite um email válido'),
    password: z
      .string()
      .min(6, 'Sua senha deve ter no mínimo 6 caracteres')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Sua senha deve conter pelo menos um caractere especial',
      )
      .regex(/[A-Z]/, 'Sua senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Sua senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Sua senha deve conter pelo menos um número'),
    confirmPassword: z.string().min(1, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });

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
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const { setMessage } = useMessage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);

    try {
      RegisterSchema.parse(input);
      const response = await userService.createUser({
        name: input.name,
        email: input.email,
        password: input.password,
      });

      if (response?.status === 201) {
        setMessage({
          type: 'success',
          message: response.data.message,
        });
        setIsSubmit(true);
        navigate('/');
      } else {
        setMessage({
          type: 'error',
          message: response?.data.message,
        });
      }
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<FormState> = {};
        err.errors.forEach((error) => {
          if (error.path.length > 0) {
            fieldErrors[error.path[0] as keyof FormState] = error.message;
          }
        });
        setErrors(fieldErrors);
        setMessage({
          type: 'warning',
          message: err.errors[0].message,
        });
      } else {
        setMessage({ type: 'error', message: 'Ocorreu um erro inesperado' });
      }
    } finally {
      setIsLoad(false);
    }
  };

  const handleFieldError = (fieldName: keyof FormState) =>
    errors[fieldName] ? inputErrorStyle : isSubmit ? inputSuceessStyle : '';

  return (
    <div className={bodyFormStyle}>
      <div className={`${cardStyle}`}>
        <form className={formStyle} onSubmit={handleSubmit}>
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
            name="password"
            tooltip="Deve conter: Carateres especiais, letras maiúsculas e minúsculas e números."
            value={input.password}
            onChange={handleInput('password')}
            icon={<LockIcon className={handleFieldError('password')} />}
            className={handleFieldError('password')}
          />

          <InputFormComponent
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleInput('confirmPassword')}
            icon={<LockIcon className={handleFieldError('confirmPassword')} />}
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
          <div className="flex flex-col items-center gap-2 text-sm p-2">
            <p>Já contém uma conta?</p>
            <a href="/" className="uppercase text-sm hover:underline">
              Entre aqui!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
