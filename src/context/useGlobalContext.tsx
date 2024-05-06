import React, { createContext, useContext, useState } from 'react';

type MessageType = 'success' | 'error' | 'warning';

interface MessageProviderProps {
  children: React.ReactNode;
}

interface MessageProps {
  type: MessageType;
  message: string;
}

interface MessageContextType {
  message: MessageProps | null;
  setMessage: (message: MessageProps | null) => void;
}

const MessageContext = createContext<MessageContextType>({
  message: null,
  setMessage: () => null,
});

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const [message, setMessage] = useState<MessageProps | null>(null);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
