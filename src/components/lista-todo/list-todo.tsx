import { CardTodo } from "../card-todo/card";
import { MoreSvg } from "../svg/more";

interface List {
  name: string;
}

interface Props {
  list: List[];
}

export const ListTodo: React.FC<Props> = ({ list }) => {
  return (
    <div className="flex gap-6">
      {list.map((item, index) => (
        <div key={index} className="card-wrapper">
          <div className="w-80 list-todo bg-BlackTheme-list p-3 flex flex-col gap-8 rounded-xl">
            <div className="list-top flex justify-between items-center px-3">
              <p className="text-sm font-semibold opacity-50">{item.name}</p>
              <button className="flex gap-2 items-center font-bold text-sm">
                <MoreSvg /> Novo Cartão
              </button>
            </div>
            <div className="list-wrapper overflow-y-auto">
              <div className="flex flex-col gap-3 items-center px-2">
                <CardTodo />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
