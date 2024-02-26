import { useState } from 'react';

export const useChangeInput = <T extends Record<string, any>>(
  initialState: T,
) => {
  const [input, setInput] = useState<T>(initialState);

  const handleInput =
    <K extends keyof T>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput({ ...input, [field]: e.target.value });
    };

  return { input, handleInput, setInput };
};
