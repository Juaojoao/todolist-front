import { useRef, useState } from 'react';
import { Tasks, taskList } from '../../interfaces/todo-list.interface';
import { CheckBoxCustom } from '../inputs/checkBox';
import { CheckedSvg } from '../svg/checked';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';
import { TaskListService } from '../../services/api/taskListService';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTaskList } from '../../services/redux/tasList/actions';
import { RootState } from '../../services/redux/root-reducer';

interface TaskListProps {
  taskList: taskList[];
  cardId?: number;
}

export const TaskList = ({ taskList, cardId }: TaskListProps) => {
  const [addButtonStates, setAddButtonStates] = useState<{
    [key: number]: boolean;
  }>({});

  const ref = useRef(null);
  const handleClickAddButton = (taskListId: number) => {
    setAddButtonStates((prevState) => ({
      ...prevState,
      [taskListId]: !prevState[taskListId],
    }));
  };

  const userInfo = useSelector((state: RootState) => state.UserReducer);
  useClickOutside({ ref: ref, callback: () => setAddButtonStates({}) });
  const { input, handleInput } = useChangeInput({ createTask: '' });
  const stopPropagation = useStopPropagation().stopPropagation;
  const taskListService = new TaskListService();
  const dispatch = useDispatch();

  const handleCreateTask = async ({ taskListId }: Tasks) => {
    if (input.createTask === '' || !taskListId) return;

    console.log('taskListId', taskListId);
    console.log('input.createTask', input.createTask);

    await taskListService.createTask({
      name: input.createTask,
      taskListId: taskListId,
    });

    input.createTask = '';
    setAddButtonStates({});

    const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
    dispatch(getAllTaskList(newTasksList));
  };

  const handleTaskStatus = async ({ id, status }: Tasks) => {
    if (!id) return;

    await taskListService.updateTaskStatus({ id, status });
    const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
    dispatch(getAllTaskList(newTasksList));
  };

  return (
    <div className="task-list-content">
      {taskList
        .filter((taskLists) => taskLists.cardId === cardId)
        .map((tasksFilter) => (
          <div key={tasksFilter.id}>
            <div className="task-list flex items-center">
              <label className="relative p-1 rounded-full cursor-pointer">
                <CheckBoxCustom checked={true} onChange={() => {}} />
                <span
                  className="absolute text-white transition-opacity opacity-0 pointer-events-none 
                  top-4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                >
                  <CheckedSvg />
                </span>
              </label>
              <label>{tasksFilter.name}:</label>
            </div>
            <ul className="pl-3 mb-5">
              {tasksFilter.tasks
                .filter((tasks) => tasks.taskListId === tasksFilter.id)
                .map((task) => (
                  <li key={task.id} className="pl-2 flex flex-col text-sm">
                    <div className="info-task-list flex items-center">
                      <label
                        className="relative flex items-center p-3 rounded-full cursor-pointer"
                        htmlFor={task.name}
                      >
                        <CheckBoxCustom
                          id={task.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleTaskStatus({
                              id: task.id,
                              status: e.target.checked,
                            })
                          }
                        />
                        <span
                          className="absolute text-white transition-opacity opacity-0 pointer-events-none 
                            top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                        >
                          <CheckedSvg />
                        </span>
                      </label>
                      <label
                        className="mt-px font-light text-gray-700 cursor-pointer select-none w-full hover:bg-gray-800 
                          p-2 rounded-md transition-all duration-150 hover:text-gray-400"
                        htmlFor={task.name}
                      >
                        {task.status ? (
                          <span className="line-through">{task.name}</span>
                        ) : (
                          <span>{task.name}</span>
                        )}
                      </label>
                    </div>
                  </li>
                ))}
              <div className="ml-4">
                {addButtonStates[tasksFilter.id] ? (
                  <div
                    className="flex gap-2"
                    onClick={stopPropagation}
                    ref={ref}
                  >
                    <input
                      onChange={handleInput('createTask')}
                      type="text"
                      name="name"
                      id="name"
                      className="overflow-hidden resize-none text-sm rounded-lg outline-none p-1 
                    bg-BlackTheme-list drop-shadow-lg text-gray-400
                      border border-gray-400"
                    />
                    <div className="flex gap-2">
                      <ButtonGreen
                        children="V"
                        buttonProps={{
                          onClick: () =>
                            handleCreateTask({ taskListId: tasksFilter.id }),
                        }}
                      />
                      <ButtonRed
                        children="X"
                        buttonProps={{
                          onClick: () => handleClickAddButton(tasksFilter.id),
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleClickAddButton(tasksFilter.id)}
                    className="text-sm bg-BlackTheme-roudend p-1 rounded-md hover:text-green-700
                  transition-all duration-150 border-2 border-gray-700 hover:border-green-700"
                  >
                    Adicionar um item
                  </button>
                )}
              </div>
            </ul>
          </div>
        ))}
    </div>
  );
};
