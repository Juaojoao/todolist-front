import { useState } from 'react';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { CardTodo } from '../card/card';
import { MoreSvg } from '../svg/more';
import { Card } from '../../interfaces/todo-list.interface';

export const ContainerCard = ({
  title,
  cards,
}: {
  title: string;
  cards: Card[];
}) => {
  const [addInput, setAddInput] = useState(false);

  const handleAddCard = () => {
    setAddInput(!addInput);
  };

  return (
    <div className="w-72 list-todo bg-BlackTheme-list mb-2 p-3 flex flex-col gap-8 rounded-xl flex-shrink-0">
      <div className="list-top flex justify-between items-center px-3">
        <p className="text-sm font-semibold opacity-50">{title}</p>
        <p>...</p>
      </div>

      <div className="flex flex-col gap-3 items-center px-2">
        {cards?.length > 0 &&
          cards.map((card) => <CardTodo card={card} key={card.id} />)}

        {addInput && (
          <div className="w-full flex flex-col">
            <textarea
              name="name"
              id="name"
              placeholder="Digite o nome do cartão"
              className="overflow-hidden resize-none text-sm drop-shadow-2xl py-6 w-full rounded-lg outline-none p-2 bg-BlackTheme-card text-gray-400"
            />
            <div className="flex gap-2 mt-3">
              <ButtonGreen children="Adicionar cartão" />
              <ButtonRed
                children="X"
                buttonProps={{
                  onClick: () => setAddInput(false),
                }}
              />
            </div>
          </div>
        )}
      </div>
      {!addInput && (
        <button
          onClick={handleAddCard}
          className="rounded-lg p-2 flex gap-2 items-center font-bold text-sm hover:bg-gray-800"
        >
          <MoreSvg /> Adicionar um cartão
        </button>
      )}
    </div>
  );
};
