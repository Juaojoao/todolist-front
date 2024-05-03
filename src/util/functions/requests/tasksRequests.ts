import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../services/redux/root-reducer';
import { TaskListService } from '../../../services/api/taskListService';
import { Tasks } from '../../../interfaces/todo-list.interface';
import { getAllTaskList } from '../../../services/redux/tasList/actions';

export const TaskRequest = () => {
  const userInfo = useSelector((state: RootState) => state.UserReducer);
  const taskListService = new TaskListService();
  const dispatch = useDispatch();

  const handleTaskStatus = async ({ id, status }: Tasks) => {
    if (!id) return;

    await taskListService.updateTaskStatus({ id, status });
    const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
    dispatch(getAllTaskList(newTasksList));
  };

  const handleEditTask = async (
    id: number,
    input: string,
    clearButton: any,
  ) => {
    if (input === '' || !id) return;

    await taskListService.updateTask({ id, name: input });

    input = '';
    clearButton({});

    const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
    dispatch(getAllTaskList(newTasksList));
  };

  const handleDeleteTask = async (id: number) => {
    if (!id) return;

    await taskListService.deleteTask(id);

    const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
    dispatch(getAllTaskList(newTasksList));
  };

  return { handleTaskStatus, handleEditTask, handleDeleteTask };
};
