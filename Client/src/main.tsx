import './index.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { MessageProvider } from './context/useGlobalContext';
import { App } from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MessageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MessageProvider>
  </BrowserRouter>,
);
