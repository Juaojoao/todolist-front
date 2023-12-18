import { ProgressSvg } from "../svg/progress";
import { Progress } from "@material-tailwind/react";

export const CardTodo = () => {
  return (
    <div className="card-todo w-80 h-44 bg-BlackTheme-card p-5 rounded-xl">
      <div className="card-desc">
        <div className="card-desc-wrapper flex flex-col gap-1">
          <h3 className="font-bold">Card Title</h3>
          <p className="font-medium text-xs opacity-50">Card Description</p>
        </div>
      </div>
      <div className="task-progress flex flex-col gap-1">
        <div className="task-progress-task flex justify-between pt-5">
          <div className="task-progress-task-wrapper flex gap-1">
            <ProgressSvg />
            <p className="font-medium text-xs opacity-50">Progresso</p>
          </div>
          <div className="task-progress-task-wrapper">
            <p className="font-semiboldnt text-sm">1/10</p>
          </div>
        </div>
        <div className="task-progress-bar w-full">
          <Progress color="pink" value={10} size="sm" />
        </div>
      </div>
      <div className="task-footer pt-5 flex">
        <div className="task-date font-semibold text-sm bg-BlackTheme-roudend rounded-xl p-1">
          30/12/2023
        </div>
        <div className="task-users"></div>
      </div>
    </div>
  );
};
