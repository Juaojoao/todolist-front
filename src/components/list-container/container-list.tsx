import { useState } from 'react';
import { Card, List } from '../../interfaces/todo-list.interface';
import { MoreSvg } from '../svg/more';
import { QuadroSvg } from '../svg/quadro';
import { ButtonGreen } from '../buttons/buttonGreen';
import { ButtonRed } from '../buttons/buttonRed';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { useList } from '../../context/ListContext';
import { ContainerCard } from './container-card';

type ContainerListProps = {
  list: List[] | null;
  card: Card[] | null;
  frameId?: number;
  updateListData?: (data: List[]) => void;
};

export const ContainerList = ({
  list,
  card,
  frameId,
  updateListData,
}: ContainerListProps) => {
  const { input, handleInput } = useChangeInput({ name: '' });
  const [addInput, setAddInput] = useState(false);

  const { createList, getLists } = useList();

  const handleAddButton = () => {
    setAddInput(!addInput);
  };

  const handleAddList = async () => {
    if (frameId !== undefined) {
      await createList(input.name, frameId);
      input.name = '';
      setAddInput(false);

      if (updateListData) {
        const lists = await getLists();
        updateListData(lists || []);
      }
    }
  };

  return (
    <div className="container-list flex gap-6 flex-col">
      <div className="pb-2 flex gap-3">
        <div className="header-quadro flex items-center gap-2">
          <QuadroSvg />
          <p>Seu Quadro</p>
        </div>

        {!addInput && (
          <button
            onClick={handleAddButton}
            className="header-addList flex items-center gap-2 "
          >
            <MoreSvg />
            <p className="font-semibold text-sm">Adicionar Lista</p>
          </button>
        )}
        {addInput && (
          <div className="flex justify-center items-center gap-2">
            <input
              value={input.name}
              onChange={handleInput('name')}
              type="text"
              name="name"
              id="name"
              placeholder="Nova Lista"
              className="overflow-hidden
               resize-none text-sm rounded-lg outline-none p-2 
               bg-BlackTheme-list drop-shadow-lg text-gray-400
               border border-gray-400 w-full"
            />
            <div className="flex w-full gap-2">
              <ButtonGreen
                children="Criar"
                buttonProps={{
                  onClick: handleAddList,
                }}
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
      <div className="divisor w-full h-px bg-white" />
      <div className="flex gap-4 mt-5 w-full overflow-x-auto">
        {list?.length ? (
          list.map(
            (item: List) =>
              item.frameId === frameId && (
                <ContainerCard
                  title={item.name}
                  key={item.id}
                  cards={
                    card?.filter((card) => card.activitiesListId === item.id) ||
                    []
                  }
                />
              ),
          )
        ) : (
          <p>Está um pouco vazio aqui...</p>
        )}
      </div>
    </div>
  );
};
