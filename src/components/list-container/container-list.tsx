import { useState } from "react";
import { Card, List } from "../../interfaces/todo-list.interface";
import { addCardToProject } from "../../util/functions/addCardToProject";
import { CardTodo } from "../card/card";
import { MoreSvg } from "../svg/more";

export const ContainerList = ({ list }: { list: List[] }) => {
  const [addCard, setAddCard] = useState<Card[][]>([]);
  const handleAddList = (listIndex: number) => {
    addCardToProject({ list, listIndex, setAddCard });
  };

  return (
    <div className="flex gap-6">
      {!list.length ? (
        <p>Está um pouco vazio aqui..</p>
      ) : (
        list.map((item, index) => (
          <div key={item.id} className="card-wrapper">
            <div className="w-80 list-todo bg-BlackTheme-list p-3 flex flex-col gap-8 rounded-xl">
              <div className="list-top flex justify-between items-center px-3">
                <p className="text-sm font-semibold opacity-50">{item.name}</p>
                <button
                  onClick={() => handleAddList(index)}
                  className="flex gap-2 items-center font-bold text-sm"
                >
                  <MoreSvg /> Novo Cartão
                </button>
              </div>
              <div className="list-wrapper overflow-y-auto">
                <div className="flex flex-col gap-3 items-center px-2">
                  {item.cards && (
                    <>
                      {item.cards.map((card: Card) => (
                        <CardTodo key={card.id} {...card} />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
