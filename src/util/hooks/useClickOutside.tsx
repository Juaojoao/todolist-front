import { useEffect } from 'react';

type UseClickOutside = {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
};

export const useClickOutside = ({ ref, callback }: UseClickOutside) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
};
