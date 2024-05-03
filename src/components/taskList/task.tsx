import './style.css';
import { Tasks } from '../../interfaces/todo-list.interface';
import { CheckBoxCustom } from '../inputs/checkBox';
import { CheckedSvg } from '../svg/checked';
import { EditSvg } from '../svg/edit';
import { TreshSvg } from '../svg/tresh';
import { useState } from 'react';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { InputConditionComp } from '../inputs/inputCondition';
import { handleAddButton } from '../../util/functions/handleAddInput';
import { ModalComponent } from '../modal/modalAlert';
import { TaskRequest } from '../../util/functions/requests/tasksRequests';

interface taskProps {
  tasks: Tasks[];
}

export const TaskComp = ({ tasks }: taskProps) => {
  const [showEditInput, setShowEditInput] = useState<{
    [key: number]: boolean;
  }>({});

  const { input, handleInput } = useChangeInput({
    editTaskDscription: '',
  });

  const { handleTaskStatus, handleEditTask, handleDeleteTask } = TaskRequest();

  return (
    <>
      {tasks.map((task: Tasks) => (
        <li
          key={task.id}
          className="pl-2 flex flex-col text-sm bg-BlackTheme-card border border-gray-700 
          rounded-md mb-2 transition-all duration-150"
        >
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
              className="mt-px font-light text-gray-700 cursor-pointer select-none w-full 
              p-2 rounded-md transition-all duration-150 hover:text-gray-400 flex justify-between"
            >
              <InputConditionComp
                condition={task.id && showEditInput[task.id]}
                funcChange={handleInput('editTaskDscription')}
                funcCancel={() =>
                  handleAddButton({
                    setShowButton: setShowEditInput,
                    valueId: task.id,
                  })
                }
                funcConfirm={() =>
                  task.id &&
                  handleEditTask(
                    task.id,
                    input.editTaskDscription,
                    setShowEditInput,
                  )
                }
                valueInput={
                  input.editTaskDscription
                    ? input.editTaskDscription
                    : task.name
                }
                valueId={task.id}
              >
                <div className="flex justify-between w-full">
                  <div>
                    <span className={task.status ? 'line-through' : ''}>
                      {task.name}
                    </span>
                  </div>
                  <div className="flex gap-2 info-task-list-buttons">
                    <span>
                      <EditSvg
                        onClick={() =>
                          handleAddButton({
                            setShowButton: setShowEditInput,
                            valueId: task.id,
                          })
                        }
                      />
                    </span>
                    <ModalComponent
                      title={<TreshSvg />}
                      funcConfirm={() => task.id && handleDeleteTask(task.id)}
                    />
                  </div>
                </div>
              </InputConditionComp>
            </label>
          </div>
        </li>
      ))}
    </>
  );
};
