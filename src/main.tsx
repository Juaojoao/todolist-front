import './index.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import store from './services/redux/store';
import ReactDOM from 'react-dom/client';
import { Router } from './routes/routes';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </AuthProvider>
  </BrowserRouter>,
);
