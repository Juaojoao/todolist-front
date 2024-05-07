import { useState } from 'react';
import { Tasks, taskList } from '../../interfaces/todo-list.interface';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { TaskListService } from '../../services/api/taskListService';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTaskList } from '../../services/redux/tasList/actions';
import { RootState } from '../../services/redux/root-reducer';
import { CheckSvg } from '../svg/check';
import { EditSvg } from '../svg/edit';
import { TaskComp } from './task';
import { InputConditionComp } from '../inputs/inputCondition';
import { ModalComponent } from '../modal/modalAlert';
import { handleAddButton } from '../../util/functions/handleAddInput';
import { MoreSvg } from '../svg/more';

interface TaskListProps {
  taskList: taskList[];
  cardId?: number;
}

export const TaskList = ({ taskList, cardId }: TaskListProps) => {
  const [addButtonStates, setAddButtonStates] = useState<{
    [key: number]: boolean;
  }>({});

  const [addButtonEditTaskList, setAddButtonEditTaskList] = useState<{
    [key: number]: boolean;
  }>({});

  const { input, handleInput } = useChangeInput({
    editTaskList: '',
    createTask: '',
  });

  const userInfo = useSelector((state: RootState) => state.UserReducer);
  const taskListService = new TaskListService();
  const dispatch = useDispatch();

  const handleCreateTask = async ({ taskListId }: Tasks) => {
    if (input.createTask === '' || !taskListId) return;

    await taskListService.createTask({
      name: input.createTask,
      taskListId: taskListId,
    });

    input.createTask = '';
    setAddButtonStates({});

    const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
    dispatch(getAllTaskList(newTasksList));
  };

  const handleDeleteTaskList = async (id?: number) => {
    if (!id) return;

    await taskListService.deleteTaskList(id);
    const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
    dispatch(getAllTaskList(newTasksList));
  };

  const handleEditTaskList = async (id?: number) => {
    if (!id || input.editTaskList === '') return;

    const response = await taskListService.updateNameTaskList({
      id,
      name: input.editTaskList,
    });

    if (response?.status === 200) {
      input.editTaskList = '';
      setAddButtonEditTaskList({});

      const newTasksList = await taskListService.getAllTaskList(userInfo?.id);
      dispatch(getAllTaskList(newTasksList));
    }
  };

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
                funcConfirm={() => handleEditTaskList(tasksFilter.id)}
                funcChange={handleInput('editTaskList')}
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
                      funcConfirm={() => handleDeleteTaskList(tasksFilter.id)}
                    />
                  </div>
                </div>
              </InputConditionComp>
            </div>
            <ul className="pl-3 mb-5">
              {tasksFilter.tasks &&
                tasksFilter.tasks
                  .filter((tasks) => tasks.taskListId === tasksFilter.id)
                  .map((task) => <TaskComp tasks={[task]} key={task.id} />)}
              <div className="ml-4">
                <InputConditionComp
                  condition={tasksFilter.id && addButtonStates[tasksFilter.id]}
                  funcChange={handleInput('createTask')}
                  funcConfirm={() =>
                    handleCreateTask({ taskListId: tasksFilter.id })
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
                    className="text-sm bg-BlackTheme-roudend p-1 rounded-md hover:text-green-700
                      transition-all duration-150 border-2 border-gray-700 hover:border-green-700 mt-4 flex gap-2 items-center"
                  >
                    <MoreSvg />
                    Adicionar um item
                  </button>
                </InputConditionComp>
              </div>
            </ul>
          </div>
        ))}
    </div>
  );
};
