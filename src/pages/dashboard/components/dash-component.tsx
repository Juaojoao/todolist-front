import { useEffect, useState } from 'react';
import { HeaderTodo } from '../../../components/header/header';
import { ContainerList } from '../../../components/list-container/container-list';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { useAuth } from '../../../context/AuthContext';
import {
  Card,
  List,
  Quadro,
  User,
} from '../../../interfaces/todo-list.interface';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { useCard } from '../../../context/CardContext';
import { useFrame } from '../../../context/FrameContext';
import { useList } from '../../../context/ListContext';
import { FrameService } from '../../../services/api/frameService';
import { CardService } from '../../../services/api/cardService';
import { ListService } from '../../../services/api/listService';

export const ListTodo = () => {
  const [frameData, setFrameData] = useState<Quadro[] | null>(null);
  const [listData, setListData] = useState<List[] | null>(null);
  const [cardData, setCardData] = useState<Card[] | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<number>();
  const [userData, setUserData] = useState<User | null>(null);

  const { getInfoUser } = useUser();
  const { token } = useAuth();
  const navigate = useNavigate();

  const frameService = FrameService(useFrame());
  const cardService = CardService(useCard());
  const listService = ListService(useList());

  useEffect(() => {
    if (token) {
      const fetch = async () => {
        const user = await getInfoUser();
        if (!user) return;

        setUserData(user);

        const frames = await frameService.onGetFrames(user.id);
        const framesOwner = frames?.find((frame) => frame.userId === user?.id);

        if (framesOwner && frames && frames?.length > 0) {
          setFrameData(frames || []);
          setSelectedFrame(frames[0].id);
          setListData(framesOwner.activitiesList || []);
        }

        const cards = await cardService.onGetCard();
        setCardData(cards);
      };

      fetch();
    } else {
      navigate('/');
    }
  }, [token]);

  // Frame

  const createFramePost = async (frameId: number, name: string) => {
    const frames = await frameService.onCreateFrame(
      frameId,
      name,
      userData?.id,
    );
    if (frames) setFrameData(frames);
  };

  const uploadFramePatch = async (frameId: number, name: string) => {
    const frames = await frameService.onUpdateFrame(
      frameId,
      name,
      userData?.id,
    );
    if (frames) setFrameData(frames);
  };

  const deleteFrameId = async (frameId: number) => {
    const frames = await frameService.onDeleteFrame(frameId, userData?.id);
    if (frames) setFrameData(frames);
    const lists = await listService.onGetlist();
    if (lists) setListData(lists);
  };

  const handleSelectFrame = (projectId: number) => {
    if (!frameData || !projectId) return;
    const selectedFrame = frameData?.find((frame) => frame.id === projectId);
    const lists = selectedFrame?.activitiesList || [];
    setSelectedFrame(selectedFrame?.id);
    setListData(lists);
  };

  // List

  const createListPost = async (name: string, frameId: number) => {
    const list = await listService.onCreateList(name, frameId);
    if (list) setListData(list);
  };

  const updateListPatch = async (
    listId: number,
    frameId: number,
    name: string,
  ) => {
    const list = await listService.onUpdateList(listId, { frameId, name });
    if (list) setListData(list);
  };

  const deleteListId = async (listId: number, frameId: number) => {
    const list = await listService.onDeleteList(listId, frameId);
    if (list) setListData(list);
  };

  // Card

  const createCardPost = async (name: string, ActivityListId: number) => {
    const cards = await cardService.onCreateCard(name, ActivityListId);
    if (cards) setCardData(cards);
  };

  const updateCardPatch = async (cardId: number, data: Card) => {
    const cards = await cardService.onUpdateCard(cardId, data);
    if (cards) setCardData(cards);
  };

  const deleteCardId = async (cardId: number, activitiesListId: number) => {
    const cards = await cardService.onDeleteCard(cardId, activitiesListId);
    if (cards) setCardData(cards);
  };

  return (
    <>
      <Sidebar
        projects={frameData}
        handleSelectProject={handleSelectFrame}
        handleUpdateProject={uploadFramePatch}
        handleDeleteProject={deleteFrameId}
        handleAddProject={createFramePost}
        selectedProject={selectedFrame}
        userId={userData?.id}
      />
      <div className="project-box p-4 w-full flex flex-col overflow-x-hidden">
        <HeaderTodo user={userData} />

        <div className="overflow-hidden">
          <ContainerList
            list={listData}
            card={cardData}
            frameId={selectedFrame}
            createList={createListPost}
            updateList={updateListPatch}
            deleteList={deleteListId}
            createCard={createCardPost}
            updateCard={updateCardPatch}
            deleteCard={deleteCardId}
          />
        </div>
      </div>
    </>
  );
};
