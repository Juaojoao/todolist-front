import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Tasks } from '../../interfaces/todo-list.interface';
import { TaskListService } from '../../services/api/taskListService';
import { CheckBoxCustom } from '../inputs/checkBox';
import { RootState } from '../../services/redux/root-reducer';
import { getAllTaskList } from '../../services/redux/tasList/actions';
import { CheckedSvg } from '../svg/checked';
import { EditSvg } from '../svg/edit';
import { TreshSvg } from '../svg/tresh';
import { useState } from 'react';
// import { useChangeInput } from '../../util/hooks/useChangeInput';
import { InputConditionComp } from '../inputs/inputCondition';

interface taskProps {
  tasks: Tasks[];
}

export const TaskComp = ({ tasks }: taskProps) => {
  
  const [showEditInput, setShowEditInput] = useState<{
    [key: number]: boolean;
  }>({});

  // const handleEditInput = (taskId?: number) => {
  //   if (!taskId) return;

  //   setShowEditInput((prevState) => ({
  //     ...prevState,
  //     [taskId]: !prevState[taskId],
  //   }));
  // };

  // const { input, handleInput } = useChangeInput({
  //   editTaskDscription: '',
  // });

  const userInfo = useSelector((state: RootState) => state.UserReducer);
  const taskListService = new TaskListService();
  const dispatch = useDispatch();

  const handleTaskStatus = async ({ id, status }: Tasks) => {
    if (!id) return;

    await taskListService.updateTaskStatus({ id, status });
    const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
    dispatch(getAllTaskList(newTasksList));
  };

  return (
    <>
      {tasks.map((task) => (
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
                checked={task.status}
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
              p-2 rounded-md transition-all duration-150 hover:text-gray-400 flex justify-between"
            >
              {task.id && (
                <InputConditionComp
                  condition={showEditInput[task.id]}
                  // funcCancel={() => setShowEditInput({})}
                  // funcConfirm={() => 'foi papai'}
                  // funcChange={handleInput('editTaskDscription')}
                >
                  <div className="flex gap-2">
                    <div>
                      <span className={task.status ? 'line-through' : ''}>
                        {task.name}
                      </span>
                    </div>
                    <button>
                      <EditSvg />
                    </button>
                    <button>
                      <TreshSvg />
                    </button>
                  </div>
                </InputConditionComp>
              )}
            </label>
          </div>
        </li>
      ))}
    </>
  );
};
