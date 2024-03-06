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

export const ListTodo = () => {
  const [frameData, setFrameData] = useState<Quadro[] | null>(null);
  const [listData, setListData] = useState<List[] | null>(null);
  const [cardData, setCardData] = useState<Card[] | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<number>();
  const [userData, setUserData] = useState<User | null>(null);

  const { createFrame } = useFrame();
  const { getInfoUser } = useUser();
  const { getFrames, updateFrame, deleteFrame } = useFrame();
  const { getLists, updateList, deleteList } = useList();
  const { getCards } = useCard();

  const { token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetch = async () => {
        const user = await getInfoUser();
        if (!user) return;
        setUserData(user);

        const frames = await getFrames(user?.id);
        const framesOwner = frames?.find((frame) => frame.userId === user?.id);

        if (framesOwner) {
          setFrameData(frames);
        }

        const cards = await getCards();
        setCardData(cards);

        const lists = framesOwner?.activitiesList || [];
        setListData(lists);

        if (frames && frames.length > 0) {
          setSelectedFrame(frames[0].id);
          setListData(frames[0].activitiesList || []);
        }
      };

      fetch();
    } else {
      navigate('/');
    }
  }, [token]);

  const handleSelectFrame = (projectId: number) => {
    if (!frameData || !projectId) return;
    const selectedFrame = frameData?.find((frame) => frame.id === projectId);
    const lists = selectedFrame?.activitiesList || [];
    setSelectedFrame(selectedFrame?.id);
    setListData(lists);
  };

  // Frame
  const addFrame = async (frameId: number, name: string) => {
    if (!userData?.id || !frameId) return;
    await createFrame(frameId, name);
    const frames = await getFrames(userData?.id);
    setFrameData(frames);
  };

  const updatePatchFrame = async (frameId: number, name: string) => {
    if (!userData || !frameId) return;
    await updateFrame(frameId, { userId: userData.id, name });
    const frames = await getFrames(userData?.id);
    setFrameData(frames);
  };

  const deleteFrameId = async (frameId: number) => {
    if (!userData || !frameId) return;
    await deleteFrame(frameId, userData.id);
    const frames = await getFrames(userData?.id);
    setFrameData(frames);
  };

  // List

  const updatePatchList = async (
    listId: number,
    frameId: number,
    name: string,
  ) => {
    if (!listId || !frameId || !name) return;

    await updateList(listId, { frameId, name });
    const lists = await getLists();
    setListData(lists);
  };

  const deleteListId = async (listId: number, frameId: number) => {
    if (!listId || !frameId) return;
    await deleteList(listId, frameId);
    const lists = await getLists();
    setListData(lists);
  };

  const updateListData = async () => {
    const lists = await getLists();
    setListData(lists);
  };

  const updateCardData = async () => {
    const cards = await getCards();
    setCardData(cards);
  };

  return (
    <>
      <Sidebar
        projects={frameData}
        handleSelectProject={handleSelectFrame}
        handleUpdateProject={updatePatchFrame}
        handleDeleteProject={deleteFrameId}
        handleAddProject={addFrame}
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
            updateListData={updateListData}
            updateCardData={updateCardData}
            updateList={updatePatchList}
            deleteList={deleteListId}
          />
        </div>
      </div>
    </>
  );
};
