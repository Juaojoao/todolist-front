import React from "react";
import { ProgressSvg } from "../svg/progress";
import { Progress } from "@material-tailwind/react";
import { Card } from "../../interfaces/todo-list.interface";

type Colors = "red" | "yellow" | "green";

export const CardTodo: React.FC<Card> = ({
  id,
  name,
  description,
  date,
  tasks,
}) => {
  const completedTasks = tasks.filter((item) => item.status).length;
  const totalTasks = tasks.length;

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
      key={id}
      className="card-todo cursor-pointer w-full h-44 bg-BlackTheme-card p-5 rounded-xl drop-shadow-lg"
    >
      <div className="card-desc">
        <div className="card-desc-wrapper flex flex-col gap-1">
          <h3 className="font-bold">{name}</h3>
          <p className="font-medium text-xs opacity-50">{description}</p>
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
          {date}
        </div>
        <div className="task-users"></div>
      </div>
    </div>
  );
};
