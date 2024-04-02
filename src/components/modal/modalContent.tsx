import { useDispatch, useSelector } from 'react-redux';
import { Card, taskList } from '../../interfaces/todo-list.interface';
import { ExitIcon } from '../svg/exit';
import { TrelloSvg } from '../svg/trello';
import { unsetSelectedCard } from '../../services/redux/card/actions';
import { DescriptionSvg } from '../svg/description';
import { RootState } from '../../services/redux/root-reducer';
import { TaskList } from '../taskList/tasklist';

interface modalProps {
  card: Card;
}

export const ModalContext = ({ card }: modalProps) => {
  const taskListInfo: taskList[] = useSelector(
    (state: RootState) => state.TaskListReducer.taskList,
  );

  const dispatch = useDispatch();

  return (
    <section className="w-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center py-10">
        <div className="bg-BlackTheme-aside w-2/4 p-4 rounded-lg relative shadow-lg flex flex-col h-full overflow-y-auto gap-10">
          <div className="show-card-header flex text-gray-800 gap-2 items-center">
            <TrelloSvg />
            <h3 className="text-xl text-gray-600 font-bold font-sans">
              {card.name}
            </h3>
            <button
              className="text-red-500 absolute right-2 top-1"
              onClick={() => dispatch(unsetSelectedCard())}
            >
              <ExitIcon />
            </button>
          </div>
          <div className="description">
            <div className="flex gap-2 items-center">
              <DescriptionSvg />
              <span className="text-sm text-gray-600 font-bold font-sans">
                Descrição:
              </span>
            </div>
            <p className="text-sm">{card?.description}</p>
          </div>

          <div className="task-list text-gray-600 font-bold font-sans flex flex-col gap-2">
            <div className="task-list-header flex justify-between items-center">
              <span className="text-sm  ">Tarefas:</span>
              <button
                className="text-sm bg-BlackTheme-roudend p-1 rounded-md hover:text-green-700
               transition-all duration-150 border-2 border-gray-700 hover:border-green-700"
              >
                ADICIONAR NOVA LISTA
              </button>
            </div>
            <TaskList cardId={card.id} taskList={taskListInfo} />
          </div>
        </div>
      </div>
    </section>
  );
};
