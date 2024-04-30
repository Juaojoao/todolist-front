import { ProgressSvg } from '../svg/progress';
import { Progress } from '@material-tailwind/react';
import { Card, User, taskList } from '../../interfaces/todo-list.interface';
import { DropDownButton } from '../buttons/dropDown';
import { ModalComponent } from '../modal/modalAlert';
import { useRef, useState } from 'react';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { useClickOutside } from '../../util/hooks/useClickOutside';
import {
  getAllCards,
  setSelectedCard,
} from '../../services/redux/card/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/redux/root-reducer';
import { CardService } from '../../services/api/cardService';
import { formatDate } from '../../util/functions/formatDate';
import { progressBar } from '../../util/functions/progressBar';
import { EditSvg } from '../svg/edit';
import { TreshSvg } from '../svg/tresh';
import { useStopPropagation } from '../../util/hooks/useStopPropagation';

type CardTodoProps = {
  card: Card;
};

export const CardTodo = ({ card }: CardTodoProps) => {
  const userInfo: User = useSelector((state: RootState) => state.UserReducer);

  const taskListInfoForCard: taskList[] | undefined = card.tasklist;

  let totTask = 0;
  let completedTasks = 0;

  if (taskListInfoForCard) {
    totTask = taskListInfoForCard.reduce((acc, curr) => {
      return acc + (curr.tasks ? curr.tasks.length : 0);
    }, 0);

    completedTasks = taskListInfoForCard.reduce((acc, curr) => {
      return (
        acc + (curr.tasks ? curr.tasks.filter((task) => task.status).length : 0)
      );
    }, 0);
  }

  const [addInputEdit, setAddInputEdit] = useState(false);
  if (completedTasks === undefined || totTask === undefined) return;

  const progress = progressBar({ completedTasks, totalTasks: totTask });
  const progressPercent = progress?.percent;
  const progressBarColor = progress?.color;
  const cardService = new CardService();
  const dispatch = useDispatch();

  const { input, handleInput } = useChangeInput({
    updateCardName: '',
  });

  const refInput = useRef(null);
  useClickOutside({ ref: refInput, callback: () => setAddInputEdit(false) });

  const handleaddInputEdit = () => setAddInputEdit(!addInputEdit);

  const handleUpdateCard = async () => {
    if (!card.id || input.updateCardName === '') return;

    try {
      await cardService.updateCard({
        id: card.id,
        name: input.updateCardName,
      });
      input.updateCardName = '';
      setAddInputEdit(false);

      const newCards = await cardService.getAllCard(userInfo.id);
      if (!newCards) return;

      dispatch(getAllCards(newCards));
    } catch (error) {
      console.error('Error deleting List', error);
    }
  };

  const handleDeleteCard = async () => {
    if (!card.id) return;

    try {
      await cardService.deleteCard(card.id);

      const newCards = await cardService.getAllCard(userInfo.id);
      if (!newCards) return;

      dispatch(getAllCards(newCards));
    } catch (error) {
      console.error('Error deleting List', error);
    }
  };

  const handleCardSelect = () => {
    if (!card.id) return;
    dispatch(setSelectedCard(card.id));
  };

  return (
    <div
      key={card.id}
      onClick={() => handleCardSelect()}
      className="card-todo cursor-pointer w-full h-44 bg-BlackTheme-card 
      p-5 rounded-xl drop-shadow-md hover:drop-shadow-2xl hover:-translate-y-2 transition-all 
      duration-300"
    >
      <div className="card-desc flex justify-between items-center">
        {!addInputEdit ? (
          <>
            <div
              className={`card-desc-wrapper flex flex-col ${card.description && 'gap-1'}`}
            >
              <p className="text-xs font-sans">
                {card.name && card.name?.length > 30
                  ? `${card.name.substring(0, 10)}...`
                  : card.name}
              </p>

              <p className="font-medium text-xs opacity-50">
                {card.description}
              </p>
            </div>
            <DropDownButton textName="...">
              <button onClick={handleaddInputEdit}>
                <EditSvg />
              </button>
              <ModalComponent
                title={<TreshSvg />}
                funcConfirm={handleDeleteCard}
              />
            </DropDownButton>
          </>
        ) : (
          <div
            className="flex gap-2 items-center justify-center"
            ref={refInput}
            onClick={useStopPropagation().stopPropagation}
          >
            <input
              type="text"
              name="updateCardName"
              id="updateCardName"
              onChange={handleInput('updateCardName')}
              placeholder={card.name}
              className="overflow-hidden resize-none text-sm drop-shadow-2xl py-2
                 w-full rounded-lg outline-none p-2 bg-BlackTheme-card
               text-gray-400 border-2 border-gray-800"
            />
            <div className="flex gap-2">
              <ButtonGreen
                children="V"
                buttonProps={{
                  onClick: handleUpdateCard,
                }}
              />
              <ButtonRed
                children="X"
                buttonProps={{ onClick: () => setAddInputEdit(false) }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="task-progress flex flex-col gap-1">
        <div className="task-progress-task flex justify-between pt-5">
          <div className="task-progress-task-wrapper flex gap-1">
            <ProgressSvg />
            <p className="font-medium text-xs opacity-50">Progresso</p>
          </div>
          <div className="task-progress-task-wrapper">
            <p className="font-semiboldnt text-sm">{`${completedTasks}/${totTask}`}</p>
          </div>
        </div>
        <div className="task-progress-bar w-full">
          <Progress
            color={progressBarColor}
            value={progressPercent}
            size="sm"
          />
        </div>
      </div>
      <div className="task-footer pt-5 flex">
        <div className="task-date font-semibold text-sm bg-BlackTheme-roudend rounded-xl p-1">
          {card.createdAt && formatDate(card.createdAt)}
        </div>
        <div className="task-users"></div>
      </div>
    </div>
  );
};
