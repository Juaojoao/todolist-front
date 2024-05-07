import { useDispatch, useSelector } from 'react-redux';
import { Card, taskList } from '../../interfaces/todo-list.interface';
import { TrelloSvg } from '../svg/trello';
import {
  getAllCards,
  unsetSelectedCard,
} from '../../services/redux/card/actions';
import { DescriptionSvg } from '../svg/description';
import { RootState } from '../../services/redux/root-reducer';
import { TaskList } from '../taskList/tasklist';
import { useEffect, useState } from 'react';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { TaskListService } from '../../services/api/taskListService';
import { getAllTaskList } from '../../services/redux/tasList/actions';
import { EditSvg } from '../svg/edit';
import { CardService } from '../../services/api/cardService';
import { MoreSvg } from '../svg/more';
import { CloseIcon } from '../svg/close';
import { InputConditionComp } from '../inputs/inputCondition';

interface modalProps {
  cardSelected: number;
}

export const ModalCardComp = ({ cardSelected }: modalProps) => {
  const taskListService = new TaskListService();
  const cardService = new CardService();
  const dispatch = useDispatch();

  const [addButtonStates, setAddButtonStates] = useState<Boolean>(false);
  const [addButtonEdit, setAddButtonEdit] = useState<Boolean>(false);
  const [cardInfo, setCardInfo] = useState<Card | undefined>(undefined);

  const userInfo = useSelector((state: RootState) => state.UserReducer);
  const cards: Card[] = useSelector(
    (state: RootState) => state.CardReducer.cards,
  );

  const taskListInfo: taskList[] = useSelector(
    (state: RootState) => state.TaskListReducer.taskList,
  );

  useEffect(() => {
    if (!cardSelected) return;
    const card = cards.find((card) => card.id === cardSelected);
    setCardInfo(card);
  }, [cardSelected, cards]);

  const { input, handleInput } = useChangeInput({
    createTaskList: '',
    editDescription: '',
  });

  const handleClickAddButton = () => setAddButtonStates(!addButtonStates);
  const handleClickEditButton = () => setAddButtonEdit(!addButtonEdit);

  const handleCreateTaskList = async () => {
    if (!cardInfo?.id || input.createTaskList === '') return;

    await taskListService.createTaskList({
      cardId: cardInfo?.id,
      name: input.createTaskList,
    });

    input.createTaskList = '';
    setAddButtonStates(false);

    const newTaskList = await taskListService.getAllTaskList(userInfo.id);
    dispatch(getAllTaskList(newTaskList));
  };

  const handleEditDescrition = async () => {
    if (!cardInfo?.id || input.editDescription === '') return;

    await cardService.updateDescription({
      id: cardInfo?.id,
      description: input.editDescription,
    });

    input.editDescription = '';
    setAddButtonEdit(false);

    const newCardDesc = await cardService.getAllCard(userInfo?.id);
    if (!newCardDesc) return;
    dispatch(getAllCards(newCardDesc));
  };

  return (
    <section className="w-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center py-10">
        <div className="bg-BlackTheme-aside w-2/4 p-4 rounded-lg relative shadow-lg flex flex-col h-full overflow-y-auto gap-10">
          <div className="show-card-header flex text-gray-800 gap-2 items-center justify-between">
            <div className="flex text-gray-800 gap-2 items-center">
              <TrelloSvg />
              <h3 className="text-xl text-gray-600 font-bold font-sans">
                {cardInfo?.name}
              </h3>
            </div>
            <CloseIcon onClick={() => dispatch(unsetSelectedCard())} />
          </div>
          <div className="description">
            <div className={`flex gap-2 flex-col`}>
              <div className="flex items-center gap-2">
                <DescriptionSvg />
                <span className="text-sm text-gray-600 font-bold font-sans">
                  Descrição:
                </span>
                <EditSvg onClick={() => handleClickEditButton()} />
              </div>
              <InputConditionComp
                funcChange={handleInput('editDescription')}
                funcCancel={() => setAddButtonEdit(false)}
                funcConfirm={() => handleEditDescrition()}
                inputOrTextArea="textarea"
                condition={addButtonEdit}
                valueId={cardInfo?.id}
                flexCol={true}
              >
                <div>
                  {!addButtonEdit && cardInfo?.description && (
                    <span
                      className="text-sm text-gray-400 font-sans
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
            <div className="task-list-header flex justify-between items-center mb-4">
              <span className="text-sm w-full">Tarefas:</span>
              <InputConditionComp
                funcCancel={() => setAddButtonStates(false)}
                funcConfirm={() => handleCreateTaskList()}
                funcChange={handleInput('createTaskList')}
                condition={addButtonStates}
                valueId={cardInfo?.id}
              >
                <button
                  onClick={handleClickAddButton}
                  className="text-smp-1 rounded-md border border-gray-600 hover:text-green-700
                  transition-all duration-150  hover:border-green-700 flex 
                  items-center gap-2 p-1 w-1/2 justify-center"
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
