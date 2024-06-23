import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../services/redux/root-reducer';
import { TaskListService } from '../../../services/api/taskListService';
import { getAllTaskList } from '../../../services/redux/tasList/actions';
import { useMessage } from '../../../context/useGlobalContext';

interface TasksRequest {
  id?: number;
  input?: inputs;
  clearButton?: any;
  taskListId?: number;
  status?: boolean;
  order?: number;
}

interface inputs {
  createTask?: string;
  updateTaskName?: string;
}

export const TaskRequest = () => {
  const userInfo = useSelector((state: RootState) => state.UserReducer);
  const taskListService = new TaskListService();
  const dispatch = useDispatch();

  const { setMessage } = useMessage();

  const createTask = async ({
    input,
    taskListId,
    clearButton,
    order,
  }: TasksRequest) => {
    if (!input?.createTask || !taskListId) {
      return setMessage({
        type: 'warning',
        message: 'Campo em branco!',
      });
    }
    try {
      await taskListService.createTask({
        name: input?.createTask,
        taskListId: taskListId,
        order,
      });
      setMessage({ type: 'success', message: 'Tarefa criada com sucesso!' });

      input.createTask = '';
      clearButton({});

      const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
      dispatch(getAllTaskList(newTasksList));
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao criar tarefa!' });
    }
  };

  const updateTaskStatus = async ({ id, status }: TasksRequest) => {
    if (!id) {
      return setMessage({
        type: 'warning',
        message: 'Tarefa não encontrada!',
      });
    }

    try {
      await taskListService.updateTaskStatus({ id, status });
      const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
      dispatch(getAllTaskList(newTasksList));
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao atualizar tarefa!' });
    }
  };

  const updateTaskName = async ({ id, input, clearButton }: TasksRequest) => {
    if (!input?.updateTaskName || !id) {
      return setMessage({
        type: 'warning',
        message: 'Campo em branco!',
      });
    }
    try {
      await taskListService.updateTask({ id, name: input.updateTaskName });
      setMessage({
        type: 'success',
        message: 'Tarefa atualizada com sucesso!',
      });

      input.updateTaskName = '';
      clearButton({});

      const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
      dispatch(getAllTaskList(newTasksList));
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao atualizar tarefa!' });
    }
  };

  const deleteTask = async ({ id }: TasksRequest) => {
    if (!id) {
      return setMessage({
        type: 'warning',
        message: 'Tarefa não encontrada!',
      });
    }

    try {
      await taskListService.deleteTask(id);
      setMessage({ type: 'success', message: 'Tarefa deletada com sucesso!' });

      const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
      dispatch(getAllTaskList(newTasksList));
    } catch (error) {
      setMessage({ type: 'error', message: 'Erro ao deletar tarefa!' });
    }
  };

  return { createTask, updateTaskStatus, updateTaskName, deleteTask };
};
