import { HeaderTodo } from "../../components/header-todo/header-todo";
import { ListTodo } from "../../components/lista-todo/list-todo";
import { Sidebar } from "../../components/sidebar/sidebar";
import { ListProject, User, test } from "./test";

export const Dashboard = () => {
  return (
    <div className="h-screen w-full flex bg-BlackTheme-fundo">
      <Sidebar projects={test} />
      <div className="project-box px-8 h-full w-full flex flex-col overflow-x-hidden">
        <HeaderTodo user={User} />
        <div className="container-cards overflow-x-auto">
          <div className="cards-wrapper py-5">
            <ListTodo list={ListProject} />
          </div>
        </div>
      </div>
    </div>
  );
};
