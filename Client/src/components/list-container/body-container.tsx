import './style.css';
import { useState } from 'react';
import { Card, List, Quadro, User } from '../../interfaces/todo-list.interface';
import { MoreSvg } from '../svg/more';
import { QuadroSvg } from '../svg/quadro';
import { useChangeInput } from '../../util/hooks/useChangeInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/root-reducer';
import { ContainerCard } from './list-container';
import { ActivitiesListsRequests } from '../../util/functions/requests/activitiesListsRequests';
import { InputConditionComp } from '../inputs/inputCondition';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ListService } from '../../services/api/listService';
import { useDispatch } from 'react-redux';
import { filterList, getAllList } from '../../services/redux/list/actions';

export const BodyContainer = () => {
  const userInfo: User = useSelector((state: RootState) => state.UserReducer);
  const cards = useSelector((state: RootState) => state.CardReducer.cards);
  const listInfo = useSelector((state: RootState) => state.ListReducer);

  const [addInput, setAddInput] = useState(false);

  const { selectedFrame, frames } = useSelector(
    (state: RootState) => state.frameReducer,
  );

  const { input, handleInput } = useChangeInput({ createList: '' });
  const { createList } = ActivitiesListsRequests();

  const filtredList = listInfo.filterList;
  const listService = new ListService();
  const dispatch = useDispatch();

  const handleAddButton = () => setAddInput(!addInput);

  const handleDragEndWithContext = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.index === destination.index) return;

    // Reordena as listas localmente
    const reorderedList = Array.from(filtredList);
    const [movedList] = reorderedList.splice(source.index, 1);
    reorderedList.splice(destination.index, 0, movedList);

    // Atualiza a ordem com base na nova posição
    const updatedListInfo = reorderedList.map((list, index) => ({
      id: list.id,
      order: index + 1,
    }));

    try {
      await Promise.all(
        updatedListInfo.map((list) => {
          if (!list.id) return;
          return listService.orderList(list.id, list.order);
        }),
      );

      const newLists = await listService.getAllList(userInfo.id);

      if (newLists) {
        dispatch(getAllList(newLists));
        dispatch(filterList(selectedFrame));
      }
    } catch (error) {
      console.error('Error updating List', error);
    }
  };

  return (
    <>
      {selectedFrame ? (
        frames.map(
          (frame: Quadro) =>
            frame.id === selectedFrame && (
              <div key={frame.id} className="h-full flex flex-col">
                <div className="flex gap-2 sm:justify-start justify-center flex-col">
                  <div className="flex gap-2 items-center">
                    <QuadroSvg />
                    <p>{frame.name}</p>
                  </div>

                  <InputConditionComp
                    condition={addInput}
                    funcCancel={() => setAddInput(false)}
                    funcConfirm={() =>
                      createList({
                        id: selectedFrame,
                        input: input,
                        clearButton: setAddInput,
                        order: filtredList.length + 1,
                      })
                    }
                    funcChange={handleInput('createList')}
                    valueId={frame.id}
                  >
                    <button
                      onClick={handleAddButton}
                      className="flex gap-2 items-center"
                    >
                      <MoreSvg />
                      <p className="font-semibold text-sm">Adicionar Lista</p>
                    </button>
                  </InputConditionComp>
                </div>
                <div className="board-canvas">
                  <DragDropContext onDragEnd={handleDragEndWithContext}>
                    {filtredList.length > 0 ? (
                      <Droppable
                        droppableId="droppable-list"
                        direction="horizontal"
                      >
                        {(provided) => (
                          <ol
                            id="board"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="board-canvas flex"
                          >
                            {filtredList.map((list: List, index: number) => (
                              <Draggable
                                key={list.id}
                                draggableId={list.id?.toString() || ''}
                                index={index}
                              >
                                {(provided) => (
                                  <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className="self-start flex-shrink-0"
                                  >
                                    <ContainerCard
                                      key={list.id}
                                      list={list}
                                      cards={cards.filter(
                                        (card: Card) =>
                                          card.activitiesListId === list.id,
                                      )}
                                    />
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </ol>
                        )}
                      </Droppable>
                    ) : (
                      <div className="">
                        <p>Crie uma Lista de atividades para começar!</p>
                      </div>
                    )}
                  </DragDropContext>
                </div>
              </div>
            ),
        )
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-center font-bold">
            Selecione ou crie um
            <br />
            Quadro para começar!
          </p>
        </div>
      )}
    </>
  );
};
