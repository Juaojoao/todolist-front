import { useState } from 'react';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { CardTodo } from '../card/card';
import { MoreSvg } from '../svg/more';
import { Card } from '../../interfaces/todo-list.interface';
import { useCard } from '../../context/CardContext';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { DropDownButton } from '../buttons/dropDown';

type ContainerCardProps = {
  title: string;
  cards: Card[];
  ActivityListId?: number;
  updateCardData?: () => void;
};

export const ContainerCard = ({
  title,
  cards,
  ActivityListId,
  updateCardData,
}: ContainerCardProps) => {
  const { input, handleInput } = useChangeInput({ name: '' });
  const [addInput, setAddInput] = useState(false);
  const { createCard } = useCard();

  const handleAddInput = () => {
    setAddInput(!addInput);
  };

  const handleAddCard = async () => {
    if (input.name === '') return;

    if (ActivityListId !== undefined) {
      await createCard(input.name, ActivityListId);
      input.name = '';
      setAddInput(false);

      if (updateCardData) {
        updateCardData();
      }
    }
  };

  return (
    <li className="w-72 h-full self-start flex-shrink-0">
      <div
        className="max-h-full drop-shadow-md list-todo bg-BlackTheme-list
       p-3 flex flex-col gap-3 rounded-xl border-collapse border-2 border-gray-900"
      >
        <div className="list-top flex justify-between items-center px-3">
          <p className="text-sm font-semibold opacity-50">{title}</p>
          <DropDownButton textName="...">
            <ul
              className="text-sm flex flex-col gap-2"
              aria-labelledby="dropdownDefaultButton"
            >
              <li className="cursor-pointer button-hover p-2">Editar</li>
              <li className="cursor-pointer button-hover p-2">Excluir</li>
            </ul>
          </DropDownButton>
        </div>

        <div className="shadow flex flex-col p-2 gap-3 items-center overflow-y-auto drop-shadow-xl">
          {cards?.length > 0 ? (
            cards.map((card) => <CardTodo card={card} key={card.id} />)
          ) : (
            <span className="text-sm text-gray-400">Sem cartões..</span>
          )}
        </div>
        {!addInput && (
          <div className="w-full flex flex-col">
            <button
              onClick={handleAddInput}
              className="rounded-lg flex gap-2 items-center font-bold text-sm hover:bg-gray-800"
            >
              <MoreSvg /> Adicionar um cartão
            </button>
          </div>
        )}
        {addInput && (
          <div className="w-full flex flex-col">
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInput('name')}
              placeholder="Digite o nome do cartão"
              className="overflow-hidden resize-none text-sm drop-shadow-2xl py-6 w-full rounded-lg outline-none p-2 bg-BlackTheme-card text-gray-400"
            />
            <div className="flex gap-2 mt-3">
              <ButtonGreen
                children="Criar cartão"
                buttonProps={{ onClick: handleAddCard }}
              />
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
    </li>
  );
};
