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
} from '../register/sytles';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { useEffect, useState } from 'react';
import { SpinSvg } from '../../components/svg/spin';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../context/useGlobalContext';
import { z } from 'zod';

interface FormState {
  email: string;
  password: string;
}

const LoginSchema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'Digite uma senha válida'),
});

export const LoginPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { login, getAuhToken, itsTokenExpired } = useAuth();
  const { setMessage } = useMessage();
  const navigate = useNavigate();
  const token = getAuhToken();

  useEffect(() => {
    if (token && !itsTokenExpired(token)) {
      navigate('dashboard');
    }
  }, [token, navigate]);

  const initialFormState: FormState = {
    email: '',
    password: '',
  };

  const { input, handleInput } = useChangeInput<FormState>(initialFormState);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);

    try {
      LoginSchema.parse(input);
      setIsLoad(true);
      await login(input.email, input.password);
      setIsLoad(false);
      setIsSubmit(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<FormState> = {};
        err.errors.forEach((error) => {
          if (error.path.length > 0) {
            fieldErrors[error.path[0] as keyof FormState] = error.message;
          }
        });
        setErrors(fieldErrors);
        setMessage({ type: 'warning', message: err.errors[0].message });
        setIsLoad(false);
      }
    }
  };

  const handleFieldError = (fieldName: keyof FormState) =>
    errors[fieldName] ? inputErrorStyle : isSubmit ? inputSuceessStyle : '';

  return (
    <div className={bodyFormStyle}>
      <div className={cardStyle}>
        <form action="" className={formStyle} onSubmit={handleSubmit}>
          <InputFormComponent
            placeholder="Email"
            type="text"
            icon={<MailIcon className={handleFieldError('email')} />}
            onChange={handleInput('email')}
            value={input.email}
            className={handleFieldError('email')}
          />
          <InputFormComponent
            placeholder="Password"
            type="password"
            icon={<LockIcon className={handleFieldError('password')} />}
            onChange={handleInput('password')}
            value={input.password}
            className={handleFieldError('password')}
          />

          <div className="flex flex-col  w-full gap-3">
            <a href="/forgot-pass" className="italic text-sm">
              Forgot password?
            </a>
            <ButtonComponent>{isLoad ? <SpinSvg /> : 'Login'}</ButtonComponent>
          </div>
          <a href="/register" className="uppercase text-sm hover:underline">
            Criar Conta
          </a>
        </form>
      </div>
    </div>
  );
};
