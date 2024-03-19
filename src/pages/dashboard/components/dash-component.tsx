import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserService } from '../../../services/api/userService';
import { SetUserInfo } from '../../../services/redux/user/actions';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { FrameService } from '../../../services/api/frameService';
import { getAllFrames } from '../../../services/redux/frame/actions';
import { ListService } from '../../../services/api/listService';
import { getAllList } from '../../../services/redux/list/actions';
import { HeaderTodo } from '../../../components/header/header';
import { BodyContainer } from '../../../components/list-container/body-container';
import { CardService } from '../../../services/api/cardService';
import { getAllCards } from '../../../services/redux/card/actions';

export const ListTodo = () => {
  const { token } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userService = new UserService();
  const frameService = new FrameService();
  const listService = new ListService();
  const cardService = new CardService();

  useEffect(() => {
    if (token) {
      const fetchUserInfo = async () => {
        const user = await userService.getInfoUser();

        if (!user) return navigate('/');
        dispatch(SetUserInfo(user));

        const frames = await frameService.getAllFrames(user?.id);
        const lists = await listService.getAllList(user?.id);
        const cards = await cardService.getAllCard(user?.id);

        if (!frames || !lists || !cards) return;

        dispatch(getAllFrames(frames));
        dispatch(getAllList(lists));
        dispatch(getAllCards(cards));
      };
      fetchUserInfo();
    } else {
      navigate('/');
    }
  }, [token]);

  return (
    <>
      <Sidebar />
      <div className="project-box p-4 w-full flex flex-col overflow-x-hidden">
        <HeaderTodo />
        <div className="overflow-hidden h-full">
          <BodyContainer />
        </div>
      </div>
    </>
  );
};
