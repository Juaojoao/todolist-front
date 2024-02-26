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

export const ListTodo = () => {
  const [frameData, setFrameData] = useState<Quadro[] | null>(null);
  const [listData, setListData] = useState<List[] | null>(null);
  const [cardData, setCardData] = useState<Card[] | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<number>();
  const [userData, setUserData] = useState<User | null>(null);

  const { createFrame } = useFrame();
  const { getInfoUser } = useUser();
  const { getFrames } = useFrame();
  const { getCards } = useCard();
  const { token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetch = async () => {
        const user = await getInfoUser();
        const frames = await getFrames();
        const cards = await getCards();

        const userFrame = frames?.find((frame) => frame.owner === user?.id);
        const lists = userFrame?.activitiesList || [];

        setUserData(user);
        setFrameData(frames);
        setListData(lists);
        setCardData(cards);

        if (frames && frames.length > 0) {
          setSelectedFrame(frames[0].id);
          setListData(frames[0].activitiesList || []);
        }
      };

      fetch();
    } else {
      navigate('/');
    }
  }, [token, navigate, getInfoUser, getFrames, getCards]);

  const handleSelectFrame = (projectId: number) => {
    const selectedFrame = frameData?.find((frame) => frame.id === projectId);
    const lists = selectedFrame?.activitiesList || [];
    setSelectedFrame(selectedFrame?.id);
    setListData(lists);
  };

  const handleAddProject = async (id: number, name: string) => {
    await createFrame(id, name);
    const frames = await getFrames();
    setFrameData(frames);
  };

  const updateListData = (updateListData: List[]) => {
    setListData(updateListData);
  };

  return (
    <>
      <Sidebar
        projects={frameData}
        handleSelectProject={handleSelectFrame}
        handleAddProject={handleAddProject}
        selectedProject={selectedFrame}
        userId={userData?.id}
      />
      <div className="project-box px-8 h-full w-full flex flex-col overflow-x-hidden">
        <HeaderTodo user={userData} />

        <div className="overflow-hidden">
          <ContainerList
            list={listData}
            card={cardData}
            frameId={selectedFrame}
            updateListData={updateListData}
          />
        </div>
      </div>
    </>
  );
};
