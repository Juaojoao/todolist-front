import { useState } from 'react';
import { taskList } from '../../interfaces/todo-list.interface';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { CheckSvg } from '../svg/check';
import { EditSvg } from '../svg/edit';
import { TaskComp } from './task';
import { InputConditionComp } from '../inputs/inputCondition';
import { ModalComponent } from '../modal/modalAlert';
import { handleAddButton } from '../../util/functions/handleAddInput';
import { MoreSvg } from '../svg/more';
import { TasksListsRequests } from '../../util/functions/requests/tasksListsRequests';
import { TaskRequest } from '../../util/functions/requests/tasksRequests';

interface TaskListProps {
  taskList: taskList[];
  cardId?: number;
}

export const TaskList = ({ taskList, cardId }: TaskListProps) => {
  const { deleteTaskList, updateTaskList } = TasksListsRequests();
  const { createTask } = TaskRequest();

  const [addButtonStates, setAddButtonStates] = useState<{
    [key: number]: boolean;
  }>({});

  const [addButtonEditTaskList, setAddButtonEditTaskList] = useState<{
    [key: number]: boolean;
  }>({});

  const { input, handleInput } = useChangeInput({
    updateTaskList: '',
    createTask: '',
  });

  return (
    <div className="task-list-content">
      {taskList
        .filter((taskLists) => taskLists.cardId === cardId)
        .map((tasksFilter) => (
          <div key={tasksFilter.id}>
            <div>
              <InputConditionComp
                condition={
                  tasksFilter.id && addButtonEditTaskList[tasksFilter.id]
                }
                childrenBefore={<CheckSvg />}
                funcCancel={() => setAddButtonEditTaskList({})}
                funcConfirm={() =>
                  updateTaskList({
                    id: tasksFilter.id,
                    input: input,
                    clearButton: setAddButtonEditTaskList,
                  })
                }
                funcChange={handleInput('updateTaskList')}
                valueId={tasksFilter.id}
              >
                <div className="task-list flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckSvg />
                    <span className="text-gray-300">{tasksFilter.name}:</span>
                  </div>
                  <div className="flex gap-3 ">
                    <span>
                      <EditSvg
                        onClick={() =>
                          handleAddButton({
                            setShowButton: setAddButtonEditTaskList,
                            valueId: tasksFilter.id,
                          })
                        }
                      />
                    </span>
                    <ModalComponent
                      dialog={tasksFilter.name}
                      funcConfirm={() => deleteTaskList({ id: tasksFilter.id })}
                    />
                  </div>
                </div>
              </InputConditionComp>
            </div>
            <ul className="pl-3 my-4">
              {tasksFilter.tasks &&
                tasksFilter.tasks
                  .filter((tasks) => tasks.taskListId === tasksFilter.id)
                  .map((task) => <TaskComp tasks={[task]} key={task.id} />)}
              <div className="ml-4">
                <InputConditionComp
                  condition={tasksFilter.id && addButtonStates[tasksFilter.id]}
                  funcChange={handleInput('createTask')}
                  funcConfirm={() =>
                    createTask({
                      taskListId: tasksFilter.id,
                      input: input,
                      clearButton: setAddButtonStates,
                    })
                  }
                  funcCancel={() =>
                    handleAddButton({
                      valueId: tasksFilter.id,
                      setShowButton: setAddButtonStates,
                    })
                  }
                >
                  <button
                    onClick={() =>
                      handleAddButton({
                        valueId: tasksFilter.id,
                        setShowButton: setAddButtonStates,
                      })
                    }
                    className="text-sm bg-BlackTheme-roudend p-1 rounded-md
                     hover:text-green-700 transition-all duration-150 
                     border-2 border-gray-700 hover:border-green-700 mt-4 
                     flex gap-2 items-center"
                  >
                    <MoreSvg />
                    Adicionar uma tarefa
                  </button>
                </InputConditionComp>
              </div>
            </ul>
          </div>
        ))}
    </div>
  );
};
