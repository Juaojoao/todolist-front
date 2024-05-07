import { useState } from 'react';
import { CardTodo } from '../card/card';
import { MoreSvg } from '../svg/more';
import { Card, List } from '../../interfaces/todo-list.interface';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { DropDownButton } from '../buttons/dropDown';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/root-reducer';
import { EditSvg } from '../svg/edit';
import { TreshSvg } from '../svg/tresh';
import { ActivitiesListsRequests } from '../../util/functions/requests/activitiesListsRequests';
import { CardsRequest } from '../../util/functions/requests/cardsRequests';
import { InputConditionComp } from '../inputs/inputCondition';

type ContainerCardProps = {
  cards: Card[];
  list: List;
};

export const ContainerCard = ({ cards, list }: ContainerCardProps) => {
  const frameInfo = useSelector((state: RootState) => state.frameReducer);
  const selectedFrame: number = frameInfo.selectedFrame;

  const { deleteList, updateList } = ActivitiesListsRequests();
  const { createCard } = CardsRequest();

  const [addInputEdit, setAddInputEdit] = useState(false);
  const [addInput, setAddInput] = useState(false);
  const { input, handleInput } = useChangeInput({
    createCard: '',
    updateListName: '',
  });

  const handleaddInputEdit = () => setAddInputEdit(!addInputEdit);
  const handleAddInput = () => setAddInput(!addInput);

  return (
    <li className="w-72 h-full self-start flex-shrink-0">
      <div
        className="max-h-full drop-shadow-md list-todo bg-BlackTheme-list
       p-3 flex flex-col gap-3 rounded-xl border-collapse border-2 border-gray-900"
      >
        <div className="list-top flex justify-between items-center px-3">
          <InputConditionComp
            condition={addInputEdit}
            funcChange={handleInput('updateListName')}
            funcCancel={() => setAddInputEdit(false)}
            funcConfirm={() =>
              updateList({
                id: list.id,
                input: input,
                clearButton: setAddInputEdit,
                selectedFrame,
              })
            }
            valueId={list.id}
          >
            <p className="text-sm font-semibold opacity-50">
              {list.name && list?.name?.length > 20
                ? `${list.name.substring(0, 20)}...`
                : list.name}
            </p>
            <DropDownButton textName="...">
              <EditSvg onClick={handleaddInputEdit} />
              <TreshSvg
                onClick={() =>
                  deleteList({
                    id: list.id,
                    clearButton: setAddInputEdit,
                    selectedFrame,
                  })
                }
              />
            </DropDownButton>
          </InputConditionComp>
        </div>

        <div className="shadow flex flex-col p-2 gap-3 items-center overflow-y-auto drop-shadow-xl">
          {cards?.length > 0 ? (
            cards.map((card) => <CardTodo card={card} key={card.id} />)
          ) : (
            <span className="text-sm text-gray-400">Sem cartões..</span>
          )}
        </div>

        <InputConditionComp
          condition={addInput}
          funcChange={handleInput('createCard')}
          funcCancel={() => setAddInput(false)}
          funcConfirm={() =>
            createCard({
              activitiesListId: list.id,
              clearButton: setAddInput,
              input,
            })
          }
          valueId={list.id}
        >
          <div className="w-full flex flex-col">
            <button
              onClick={handleAddInput}
              className="rounded-lg flex gap-2 items-center font-bold text-sm hover:bg-gray-800"
            >
              <MoreSvg /> Adicionar um cartão
            </button>
          </div>
        </InputConditionComp>
      </div>
    </li>
  );
};
