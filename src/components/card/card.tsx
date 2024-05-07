import { ProgressSvg } from '../svg/progress';
import { Progress } from '@material-tailwind/react';
import { Card, taskList } from '../../interfaces/todo-list.interface';
import { DropDownButton } from '../buttons/dropDown';
import { ModalComponent } from '../modal/modalAlert';
import { useState } from 'react';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { formatDate } from '../../util/functions/formatDate';
import { progressBar } from '../../util/functions/progressBar';
import { EditSvg } from '../svg/edit';
import { CardsRequest } from '../../util/functions/requests/cardsRequests';
import { InputConditionComp } from '../inputs/inputCondition';

type CardTodoProps = {
  card: Card;
};

export const CardTodo = ({ card }: CardTodoProps) => {
  const { input, handleInput } = useChangeInput({ updateCardName: '' });
  const { updateCard, deleteCard, selectCard } = CardsRequest();
  const [addInputEdit, setAddInputEdit] = useState(false);

  let completedTasks = 0;
  let totTask = 0;

  if (completedTasks === undefined || totTask === undefined) return;

  const progress = progressBar({ completedTasks, totalTasks: totTask });
  const taskListInfoForCard: taskList[] | undefined = card.tasklist;
  const progressPercent = progress?.percent;
  const progressBarColor = progress?.color;

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

  const handleaddInputEdit = () => setAddInputEdit(!addInputEdit);

  return (
    <div
      key={card.id}
      onClick={() => selectCard({ id: card.id })}
      className="card-todo cursor-pointer w-full h-44 bg-BlackTheme-card 
      p-5 rounded-xl drop-shadow-md hover:drop-shadow-2xl hover:-translate-y-2 transition-all 
      duration-300"
    >
      <div className="card-desc flex justify-between items-center">
        <InputConditionComp
          condition={addInputEdit}
          funcCancel={() => setAddInputEdit(false)}
          funcConfirm={() =>
            updateCard({ id: card.id, input, clearButton: setAddInputEdit })
          }
          funcChange={handleInput('updateCardName')}
          valueId={card.id}
        >
          <div
            className={`card-desc-wrapper flex flex-col ${card.description && 'gap-1'}`}
          >
            <p className="text-xs font-sans">
              {card.name && card.name?.length > 30
                ? `${card.name.substring(0, 10)}...`
                : card.name}
            </p>

            <p className="font-medium text-xs opacity-50">{card.description}</p>
          </div>
          <DropDownButton textName="...">
            <button onClick={handleaddInputEdit}>
              <EditSvg />
            </button>
            <ModalComponent
              funcConfirm={() => deleteCard({ id: card.id })}
              dialog={card.name}
            />
          </DropDownButton>
        </InputConditionComp>
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
