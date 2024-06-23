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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { CardService } from '../../services/api/cardService';
import { getAllCards } from '../../services/redux/card/actions';
import { useDispatch } from 'react-redux';

type ContainerCardProps = {
  cards: Card[];
  list: List;
};

export const ContainerCard = ({ cards, list }: ContainerCardProps) => {
  const userInfo = useSelector((state: RootState) => state.UserReducer);
  const frameInfo = useSelector((state: RootState) => state.frameReducer);
  const selectedFrame: number = frameInfo.selectedFrame;

  const { deleteList, updateList } = ActivitiesListsRequests();
  const { createCard, orderCard } = CardsRequest();

  const [addInputEdit, setAddInputEdit] = useState(false);
  const [addInput, setAddInput] = useState(false);
  const { input, handleInput } = useChangeInput({
    createCard: '',
    updateListName: '',
  });

  const handleaddInputEdit = () => setAddInputEdit(!addInputEdit);
  const handleAddInput = () => setAddInput(!addInput);

  const cardService = new CardService();
  const dispatch = useDispatch();

  const handleDragEndWithContext = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.index === destination.index) return;

    // Reordena as listas localmente
    const reorderedList = Array.from(cards);
    const [movedList] = reorderedList.splice(source.index, 1);
    reorderedList.splice(destination.index, 0, movedList);

    // Atualiza a ordem com base na nova posição
    const updatedListInfo = reorderedList.map((card, index) => ({
      id: card.id,
      order: index + 1,
    }));

    try {
      await Promise.all(
        updatedListInfo.map((card) => {
          if (!card.id) return;
          return orderCard({
            id: card.id,
            order: card.order,
            activitiesListId: list.id,
          });
        }),
      );

      const newCards = await cardService.getAllCard(userInfo.id);

      if (newCards) {
        dispatch(getAllCards(newCards));
      }
    } catch (error) {
      console.error('Error updating List', error);
    }
  };
  return (
    <>
      <div className="basis-[200px] w-[200px] md:basis-[272px] md:w-[272px] p-3 bg-BlackTheme-list rounded-xl border-collapse border-2 border-gray-900">
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
        <DragDropContext onDragEnd={handleDragEndWithContext}>
          <Droppable droppableId="droppable-list" direction="vertical">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="h-full overflow-y-auto"
              >
                {cards?.length > 0 ? (
                  cards.map((card: Card, index: number) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id?.toString() || ''}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="shadow flex flex-col p-2 gap-3 items-center drop-shadow-xl"
                        >
                          <CardTodo key={card.id} card={card} />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">Sem cartões..</span>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <InputConditionComp
          condition={addInput}
          funcChange={handleInput('createCard')}
          funcCancel={() => setAddInput(false)}
          funcConfirm={() =>
            createCard({
              activitiesListId: list.id,
              clearButton: setAddInput,
              input,
              order: cards.length + 1,
            })
          }
          valueId={list.id}
        >
          <div className="w-full flex flex-col pt-2">
            <button
              onClick={handleAddInput}
              className="rounded-lg flex gap-2 items-center font-bold text-sm hover:bg-gray-800"
            >
              <MoreSvg /> Adicionar um cartão
            </button>
          </div>
        </InputConditionComp>
      </div>
    </>
  );
};
