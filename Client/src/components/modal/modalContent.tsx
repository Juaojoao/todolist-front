import { useDispatch, useSelector } from 'react-redux';
import { Card, taskList } from '../../interfaces/todo-list.interface';
import { TrelloSvg } from '../svg/trello';
import { unsetSelectedCard } from '../../services/redux/card/actions';
import { DescriptionSvg } from '../svg/description';
import { RootState } from '../../services/redux/root-reducer';
import { TaskList } from '../taskList/tasklist';
import { useEffect, useState } from 'react';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { EditSvg } from '../svg/edit';
import { MoreSvg } from '../svg/more';
import { CloseIcon } from '../svg/close';
import { InputConditionComp } from '../inputs/inputCondition';
import { TasksListsRequests } from '../../util/functions/requests/tasksListsRequests';
import { CardsRequest } from '../../util/functions/requests/cardsRequests';

interface modalProps {
  cardSelected: number;
}

export const ModalCardComp = ({ cardSelected }: modalProps) => {
  const [addButtonStates, setAddButtonStates] = useState<Boolean>(false);
  const [cardInfo, setCardInfo] = useState<Card | undefined>(undefined);
  const [addButtonEdit, setAddButtonEdit] = useState<Boolean>(false);

  const { createTaskList } = TasksListsRequests();
  const { updateCardDescrition } = CardsRequest();
  const { input, handleInput } = useChangeInput({
    createTaskList: '',
    updateCardDescription: '',
  });

  const cards = useSelector((state: RootState) => state.CardReducer.cards);
  const taskListInfo: taskList[] = useSelector(
    (state: RootState) => state.TaskListReducer.taskList,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cardSelected) return;
    const card = cards.find((card: Card) => card.id === cardSelected);
    setCardInfo(card);
  }, [cardSelected, cards]);

  const handleClickAddButton = () => setAddButtonStates(!addButtonStates);
  const handleClickEditButton = () => setAddButtonEdit(!addButtonEdit);

  return (
    <section className="w-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-2 md:py-10">
        <div className="bg-BlackTheme-aside w-full md:w-2/4 p-4 rounded-lg relative shadow-lg flex flex-col h-full overflow-y-auto gap-10">
          <div
            className="show-card-header flex text-gray-800 gap-2 items-center justify-between fixed md:static w-[96%]
           md:w-auto top-0 left-0 p-5 bg-BlackTheme-aside z-10 m-2 md:m-0 shadow-xl md:shadow-none"
          >
            <div className="flex text-gray-800 gap-2 items-center">
              <TrelloSvg />
              <h3 className="text-xl text-gray-600 font-bold font-sans">
                {cardInfo?.name}
              </h3>
            </div>
            <CloseIcon onClick={() => dispatch(unsetSelectedCard())} />
          </div>
          <div className="description mt-20 md:mt-0">
            <div className={`flex gap-2 flex-col`}>
              <div className="flex items-center gap-2">
                <DescriptionSvg />
                <span className="text-sm text-gray-600 font-bold font-sans">
                  Descrição:
                </span>
                <EditSvg onClick={() => handleClickEditButton()} />
              </div>
              <InputConditionComp
                funcChange={handleInput('updateCardDescription')}
                funcCancel={() => setAddButtonEdit(false)}
                funcConfirm={() =>
                  updateCardDescrition({
                    id: cardInfo?.id,
                    clearButton: setAddButtonEdit,
                    input,
                  })
                }
                inputOrTextArea="textarea"
                condition={addButtonEdit}
                valueId={cardInfo?.id}
                flexCol={true}
              >
                <div className="max-w-full break-words">
                  {!addButtonEdit && cardInfo?.description && (
                    <span
                      className="text-sm text-gray-400 font-sans pre-wrap
                     bg-BlackTheme-card w-full block p-2 rounded-md"
                    >
                      {cardInfo?.description}
                    </span>
                  )}
                </div>
              </InputConditionComp>
            </div>
          </div>

          <div className="task-list text-gray-600 font-bold font-sans flex flex-col gap-2">
            <div
              className={`task-list-header flex justify-between items-center mb-4 ${addButtonStates ? 'flex-col md:flex-row' : ''}`}
            >
              <span className="text-sm w-full">Tarefas:</span>
              <InputConditionComp
                funcCancel={() => setAddButtonStates(false)}
                funcConfirm={() =>
                  createTaskList({
                    cardId: cardInfo?.id,
                    input: input,
                    clearButton: setAddButtonStates,
                    order:
                      taskListInfo.filter(
                        (taskList) => taskList.cardId === cardInfo?.id,
                      ).length + 1,
                  })
                }
                funcChange={handleInput('createTaskList')}
                condition={addButtonStates}
                valueId={cardInfo?.id}
              >
                <button
                  onClick={handleClickAddButton}
                  className="text-sm bg-BlackTheme-roudend p-1 rounded-md
                  hover:text-green-700 transition-all duration-150 
                  border-2 border-gray-700 hover:border-green-700
                  flex gap-0 md:gap-2 items-center w-full md:w-1/2 justify-center"
                >
                  <MoreSvg />
                  NOVA LISTA
                </button>
              </InputConditionComp>
            </div>
            <TaskList cardId={cardInfo?.id} taskList={taskListInfo} />
          </div>
        </div>
      </div>
    </section>
  );
};
