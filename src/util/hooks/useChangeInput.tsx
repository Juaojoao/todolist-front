import { useState } from "react";

export const useChangeInput = <T,>(initialState: any) => {
  const [input, setInput] = useState<T>(initialState);

  const handleInput =
    (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput({ ...input, [field]: e.target.value });
    };

  return { input, handleInput, setInput };
};
