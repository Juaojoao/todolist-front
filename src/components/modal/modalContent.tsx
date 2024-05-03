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
import { ButtonRed } from '../buttons/buttonRed';
import { ButtonGreen } from '../buttons/buttonGreen';
import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';
import { TaskListService } from '../../services/api/taskListService';
import { getAllTaskList } from '../../services/redux/tasList/actions';
import { EditSvg } from '../svg/edit';
import { CardService } from '../../services/api/cardService';
import { MoreSvg } from '../svg/more';
import { CloseIcon } from '../svg/close';

interface modalProps {
  cardSelected: number;
}

export const ModalCardComp = ({ cardSelected }: modalProps) => {
  const taskListService = new TaskListService();
  const cardService = new CardService();
  const dispatch = useDispatch();
  const ref = useRef(null);

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

  useClickOutside({
    ref: ref,
    callback: () => {
      setAddButtonStates(false);
      setAddButtonEdit(false);
    },
  });

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
                <button onClick={() => handleClickEditButton()}>
                  <EditSvg />
                </button>
              </div>
              {addButtonEdit ? (
                <div
                  className="flex flex-col gap-2"
                  onClick={useStopPropagation().stopPropagation}
                  ref={ref}
                >
                  <div className="w-full ">
                    <textarea
                      onChange={handleInput('editDescription')}
                      name="editTask"
                      id="editTask"
                      value={
                        input.editDescription
                          ? input.editDescription
                          : cardInfo?.description
                      }
                      className="overflow-hidden resize-none text-sm drop-shadow-2xl py-4 h-auto w-full rounded-lg outline-none p-2 bg-BlackTheme-card text-gray-400"
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <ButtonGreen
                      children="V"
                      buttonProps={{
                        onClick: () => handleEditDescrition(),
                      }}
                    />
                    <ButtonRed
                      children="X"
                      buttonProps={{
                        onClick: () => setAddButtonEdit(false),
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  {!addButtonEdit && cardInfo?.description && (
                    <span className="text-sm text-gray-400 font-sans bg-BlackTheme-card w-full block p-2 rounded-md">
                      {cardInfo?.description}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="task-list text-gray-600 font-bold font-sans flex flex-col gap-2">
            <div className="task-list-header flex justify-between items-center mb-4">
              <span className="text-sm ">Tarefas:</span>
              {addButtonStates ? (
                <div
                  className="flex gap-2"
                  onClick={useStopPropagation().stopPropagation}
                  ref={ref}
                >
                  <input
                    onChange={handleInput('createTaskList')}
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
                        onClick: () => handleCreateTaskList(),
                      }}
                    />
                    <ButtonRed
                      children="X"
                      buttonProps={{
                        onClick: () => setAddButtonStates(false),
                      }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleClickAddButton}
                  className="text-smp-1 rounded-md hover:text-green-700
                  transition-all duration-150  hover:border-green-700 flex items-center gap-2"
                >
                  <MoreSvg />
                  NOVA LISTA
                </button>
              )}
            </div>
            <TaskList cardId={cardInfo?.id} taskList={taskListInfo} />
          </div>
        </div>
      </div>
    </section>
  );
};
