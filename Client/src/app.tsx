import { Router } from './routes/routes';
import { Provider } from 'react-redux';
import store from './services/redux/store';
import { Message } from './components/message/message';
import { useMessage } from './context/useGlobalContext';

export const App = () => {
  const { message } = useMessage();
  return (
    <Provider store={store}>
      {message && <Message />}
      <Router />
    </Provider>
  );
};
