import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { ModalContext } from '../../../components/modal/modalContent';
import { RootState } from '../../../services/redux/root-reducer';
import { TaskListService } from '../../../services/api/taskListService';
import { getAllTaskList } from '../../../services/redux/tasList/actions';

export const ListTodo = () => {
  const { token } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const frameService = new FrameService();
  const userService = new UserService();
  const listService = new ListService();
  const cardService = new CardService();
  const taskListService = new TaskListService();

  const { selectedCard } = useSelector((state: RootState) => state.CardReducer);

  useEffect(() => {
    if (token) {
      const fetchUserInfo = async () => {
        const user = await userService.getInfoUser();

        if (!user) return navigate('/');
        dispatch(SetUserInfo(user));

        const frames = await frameService.getAllFrames(user?.id);
        const lists = await listService.getAllList(user?.id);
        const cards = await cardService.getAllCard(user?.id);
        const taskList = await taskListService.getAllTaskList(user?.id);

        if (!frames || !lists || !cards || !taskList) return null;

        dispatch(getAllFrames(frames));
        dispatch(getAllList(lists));
        dispatch(getAllCards(cards));
        dispatch(getAllTaskList(taskList));
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
        <div className="overflow-hidden h-full relative">
          {selectedCard && <ModalContext card={selectedCard} />}
          <BodyContainer />
        </div>
      </div>
    </>
  );
};
