import { HeaderTodo } from "../../../components/header/header";
import { ContainerList } from "../../../components/list-container/container-list";
import { Sidebar } from "../../../components/sidebar/sidebar";
import { List, User } from "../../../interfaces/todo-list.interface";
import { dataUsers } from "../../../util/data/data";

interface ListProps {
  useOn: number;
}

export const ListTodo = ({ useOn }: ListProps) => {
  const userData: User | undefined = dataUsers?.find(
    (item) => item.id === useOn
  );
  if (!userData) {
    return <div>Usuário não encontrado</div>;
  }

  const listData: List[] | undefined = userData?.quadros?.flatMap(
    (item) => item.lists || []
  );
  if (!listData) {
    return <div>Lista não encontrada</div>;
  }

  const handleAddList = () => {
    console.log("add list");
  };

  return (
    <>
      <Sidebar projects={userData?.quadros || []} />
      <div className="project-box px-8 h-full w-full flex flex-col overflow-x-hidden">
        <HeaderTodo user={userData} addList={handleAddList} />
        <div className="container-cards overflow-x-auto">
          <div className="cards-wrapper py-5">
            <ContainerList list={listData} />
          </div>
        </div>
      </div>
    </>
  );
};
