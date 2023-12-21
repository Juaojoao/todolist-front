import { useState } from "react";
import { CardTodo } from "../../../components/card/card";
import { MoreSvg } from "../../../components/svg/more";
import { ProjectData } from "../test";
import { CardProps } from "../../../components/card/card";
import { FunctionDate } from "../../../util/functions/date";
import { MagicMotion } from "react-magic-motion";

export const ListTodo = () => {
  const [addCard, setAddCard] = useState<CardProps[][]>([]);

  const handleAddCard = (listIndex: number) => {
    const cardIDActual = ProjectData[listIndex].cardProject.length + 1;

    const updateProjectData = [...ProjectData] as {
      id: number;
      listName: string;
      cardProject: CardProps[];
    }[];

    if (!updateProjectData[listIndex]?.cardProject) {
      updateProjectData[listIndex].cardProject = [];
    }

    const newCard = {
      id: cardIDActual,
      title: `Novo Card ${cardIDActual}`,
      description: "Descrição do novo card",
      completedTasks: 0,
      totalTasks: 0,
      date: FunctionDate(),
    };

    updateProjectData[listIndex].cardProject.push(newCard);

    const mappedProjectData = updateProjectData.map((item) => {
      return item.cardProject;
    });

    setAddCard(mappedProjectData);
    console.log(addCard);
  };

  return (
    <div className="flex gap-6">
      {!ProjectData.length ? (
        <p>Está um pouco vazio aqui..</p>
      ) : (
        ProjectData.map((item, index) => (
          <div key={item.id} className="card-wrapper">
            <div className="w-80 list-todo bg-BlackTheme-list p-3 flex flex-col gap-8 rounded-xl">
              <div className="list-top flex justify-between items-center px-3">
                <p className="text-sm font-semibold opacity-50">
                  {item.listName}
                </p>
                <button
                  onClick={() => handleAddCard(index)}
                  className="flex gap-2 items-center font-bold text-sm"
                >
                  <MoreSvg /> Novo Cartão
                </button>
              </div>
              <MagicMotion>
                <div className="list-wrapper overflow-y-auto">
                  <div className="flex flex-col gap-3 items-center px-2">
                    {item.cardProject && (
                      <>
                        {item.cardProject.map((card: CardProps) => (
                          <CardTodo
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            description={card.description}
                            completedTasks={card.completedTasks}
                            totalTasks={card.totalTasks}
                            date={card.date}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </MagicMotion>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
