import { ProgressSvg } from '../svg/progress';
import { Progress } from '@material-tailwind/react';
import { Card } from '../../interfaces/todo-list.interface';
import { DropDownButton } from '../buttons/dropDown';
import { ModalComponent } from '../modal/modalAlert';
import { useRef, useState } from 'react';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { useClickOutside } from '../../util/hooks/useClickOutside';

type Colors = 'red' | 'yellow' | 'green';

type CardTodoProps = {
  card: Card;
  updateCard?: (cardId: number, name: string) => void;
  deleteCard?: (cardId: number) => void;
  seletedCard?: (cardId: number) => void;
};

const formatDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};

export const CardTodo = ({ card, updateCard, deleteCard }: CardTodoProps) => {
  const [addInputEdit, setAddInputEdit] = useState(false);

  const completedTasks = card.tasklist?.filter((item) => item.status).length;
  const totalTasks = card.tasklist?.length;

  const { input, handleInput } = useChangeInput({
    updateCardName: '',
  });

  if (completedTasks === undefined || totalTasks === undefined) return;

  const progressPercent = (completedTasks / totalTasks) * 100;

  let progressBarColor: Colors = 'green';

  if (progressPercent < 50) {
    progressBarColor = 'red';
  } else if (progressPercent < 75) {
    progressBarColor = 'yellow';
  } else {
    progressBarColor = 'green';
  }

  const refInput = useRef(null);
  useClickOutside({ ref: refInput, callback: () => setAddInputEdit(false) });

  const handleaddInputEdit = () => {
    setAddInputEdit(!addInputEdit);
  };

  const handleEditCard = (cardId?: number) => {
    if (input.updateCardName === '' || !cardId || !updateCard) return;

    updateCard(cardId, input.updateCardName);
    input.updateCardName = '';
    setAddInputEdit(false);
  };

  const handleDeleteCard = (cardId?: number) => {
    if (!cardId || !deleteCard) return;

    deleteCard(cardId);
  };

  // const handleCardSelect = () => {
  //   console.log(card.id);
  // };

  return (
    <div
      key={card.id}
      // onClick={handleCardSelect}
      className="card-todo cursor-pointer w-full h-44 bg-BlackTheme-card p-5 rounded-xl drop-shadow-lg"
    >
      <div className="card-desc flex justify-between items-center">
        {!addInputEdit ? (
          <>
            <div className="card-desc-wrapper flex flex-col gap-1">
              {card.name && card.name?.length > 12
                ? `${card.name.substring(0, 12)}...`
                : card.name}
              <p className="font-medium text-xs opacity-50">
                {card.description}
              </p>
            </div>
            <DropDownButton textName="...">
              <ul
                className="text-sm flex flex-col gap-2"
                aria-labelledby="dropdownDefaultButton"
              >
                <li
                  className="cursor-pointer button-hover p-2 w-full text-center"
                  onClick={handleaddInputEdit}
                >
                  Editar
                </li>
                <li className="cursor-pointer button-hover p-2">
                  <ModalComponent
                    dialog={`Você tem certeza que deseja excluir o cartão "${card.name}"?`}
                    title="Excluir"
                    funcConfirm={() => handleDeleteCard(card.id)}
                  />
                </li>
              </ul>
            </DropDownButton>
          </>
        ) : (
          <div
            className="flex gap-2 items-center justify-center"
            ref={refInput}
          >
            <input
              type="text"
              name="updateCardName"
              id="updateCardName"
              onChange={handleInput('updateCardName')}
              placeholder="Editar"
              className="overflow-hidden resize-none text-sm drop-shadow-2xl py-2
                 w-full rounded-lg outline-none p-2 bg-BlackTheme-card
               text-gray-400 border-2 border-gray-800"
            />
            <div className="flex gap-2">
              <ButtonGreen
                children="V"
                buttonProps={{ onClick: () => handleEditCard(card.id) }}
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
            <p className="font-semiboldnt text-sm">{`${completedTasks}/${totalTasks}`}</p>
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
