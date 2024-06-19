import { useDispatch, useSelector } from 'react-redux';
import { TaskListService } from '../../../services/api/taskListService';
import { RootState } from '../../../services/redux/root-reducer';
import { getAllTaskList } from '../../../services/redux/tasList/actions';
import { useMessage } from '../../../context/useGlobalContext';

interface TasksListsRequests {
  id?: number;
  input?: inputs;
  clearButton?: any;
  cardId?: number;
  setState?: any;
}

interface inputs {
  createTaskList?: string;
  updateTaskList?: string;
}

export const TasksListsRequests = () => {
  const userInfo = useSelector((state: RootState) => state.UserReducer);
  const taskListService = new TaskListService();
  const dispatch = useDispatch();

  const { setMessage } = useMessage();

  const createTaskList = async ({
    cardId,
    input,
    clearButton,
  }: TasksListsRequests) => {
    if (!cardId || !input?.createTaskList) {
      return setMessage({ type: 'warning', message: 'Campo vazio!' });
    }
    try {
      await taskListService.createTaskList({
        cardId,
        name: input.createTaskList,
      });
      setMessage({
        type: 'success',
        message: 'Lista de tarefas criada com sucesso!',
      });

      input.createTaskList = '';
      clearButton(false);

      const newTaskList = await taskListService.getAllTaskList(userInfo.id);
      dispatch(getAllTaskList(newTaskList));
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao criar lista de tarefas!' });
    }
  };

  const deleteTaskList = async ({ id }: TasksListsRequests) => {
    if (!id) {
      return setMessage({ type: 'warning', message: 'Campo vazio!' });
    }

    try {
      await taskListService.deleteTaskList(id);
      setMessage({
        type: 'success',
        message: 'Lista de tarefas deletada com sucesso!',
      });

      const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
      dispatch(getAllTaskList(newTasksList));
    } catch (error) {
      setMessage({
        type: 'error',
        message: 'Erro ao deletar lista de tarefas!',
      });
    }
  };

  const updateTaskList = async ({
    id,
    input,
    clearButton,
  }: TasksListsRequests) => {
    if (!id || !input?.updateTaskList) {
      return setMessage({ type: 'warning', message: 'Campo vazio!' });
    }

    try {
      await taskListService.updateNameTaskList({
        id,
        name: input.updateTaskList,
      });
      setMessage({
        type: 'success',
        message: 'Lista de tarefas atualizada com sucesso!',
      });

      input.updateTaskList = '';
      clearButton(false);

      const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
      dispatch(getAllTaskList(newTasksList));
    } catch (error) {
      setMessage({
        type: 'error',
        message: 'Erro ao atualizar lista de tarefas!',
      });
    }
  };

  return { createTaskList, deleteTaskList, updateTaskList };
};
