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
import { validateLoginInputs } from '../../util/functions/validateLogin';
import { useMessage } from '../../context/useGlobalContext';

interface FormState {
  email: string;
  password: string;
}

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
  const [error, setError] =
    useState<Record<keyof FormState, string>>(initialFormState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);

    const { isValid, newErrors } = validateLoginInputs(input);

    if (!isValid) {
      setError(newErrors || initialFormState);
      setMessage({ type: 'warning', message: 'Campos em branco!' });
      setIsLoad(false);
      return;
    }

    try {
      setIsLoad(true);
      await login(input.email, input.password);
      setIsSubmit(true);
      setIsLoad(false);
    } catch (error: any) {
      setIsLoad(false);
      setMessage({ type: 'error', message: 'Email ou Senha Inválida' });
    }
  };

  const handleFieldError = (fieldName: keyof FormState) =>
    error[fieldName] ? inputErrorStyle : isSubmit ? inputSuceessStyle : '';

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
