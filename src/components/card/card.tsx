import { ProgressSvg } from "../svg/progress";
import { Progress } from "@material-tailwind/react";
import { Card } from "../../interfaces/todo-list.interface";

type Colors = "red" | "yellow" | "green";

type CardTodoProps = {
  card: Card;
}

const formatDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}

export const CardTodo = ({ card }: CardTodoProps) => {
  const completedTasks = card.tasklist?.filter((item) => item.status).length;
  const totalTasks = card.tasklist?.length;

  if (completedTasks === undefined || totalTasks === undefined) return;

  const progressPercent = (completedTasks / totalTasks) * 100;

  let progressBarColor: Colors = "green";

  if (progressPercent < 50) {
    progressBarColor = "red";
  } else if (progressPercent < 75) {
    progressBarColor = "yellow";
  } else {
    progressBarColor = "green";
  }

  return (
    <div
      key={card.id}
      className="card-todo cursor-pointer w-full h-44 bg-BlackTheme-card p-5 rounded-xl drop-shadow-lg"
    >
      <div className="card-desc">
        <div className="card-desc-wrapper flex flex-col gap-1">
          <h3 className="font-bold">{card.name}</h3>
          <p className="font-medium text-xs opacity-50">{card.description}</p>
        </div>
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
          {formatDate(card.createdAt)}
        </div>
        <div className="task-users"></div>
      </div>
    </div>
  );
};
