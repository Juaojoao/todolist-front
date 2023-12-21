import { HeaderTodo } from "../../components/header/header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { ListTodo } from "./components/list-component";
import { User, test } from "./test";

export const Dashboard = () => {
  return (
    <div className="h-screen w-full flex bg-BlackTheme-fundo">
      <Sidebar projects={test} />
      <div className="project-box px-8 h-full w-full flex flex-col overflow-x-hidden">
        <HeaderTodo user={User} />
        <div className="container-cards overflow-x-auto">
          <div className="cards-wrapper py-5">
            <ListTodo />
          </div>
        </div>
      </div>
    </div>
  );
};
