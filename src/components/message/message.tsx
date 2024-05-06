import './style.css';
import { useEffect, useState } from 'react';
import { useMessage } from '../../context/useGlobalContext';
import { InfoSvg } from '../svg/info';

export const Message = () => {
  const [isVisibled, setIsVisibled] = useState<boolean>(false);
  const { message, setMessage } = useMessage();

  useEffect(() => {
    if (message) {
      setIsVisibled(true);
      const timer = setTimeout(() => {
        setMessage(null);
        setIsVisibled(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!isVisibled || !message) return null;

  return (
    <div className={`message-container ${isVisibled ? 'show' : 'hide'}`}>
      {isVisibled && message && (
        <div
          className={`flex items-center p-4 gap-2 text-sm rounded-lg 
             bg-BlackTheme-fundo border 
            ${message.type === 'success' ? 'border-green-500 shadow-green-500 text-green-500' : ''}
            ${message.type === 'error' ? 'border-red-500 shadow-red-500 text-red-500' : ''}
            ${message.type === 'warning' ? 'border-yellow-500 shadow-yellow-500 text-yellow-500' : ''}
          `}
        >
          <InfoSvg
            fill={
              message.type === 'success'
                ? 'green'
                : message.type === 'error'
                  ? 'red'
                  : 'yellow'
            }
          />
          <div>
            <span className="font-bold">{message?.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
