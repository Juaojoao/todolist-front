import { Input } from "@material-tailwind/react";
import { DateSvg } from "../svg/date";
import { SearchSvg } from "../svg/src";
import { QuadroSvg } from "../svg/quadro";
import { MoreSvg } from "../svg/more";
import { FunctionDate } from "../../util/functions/date";

interface User {
  name: string;
  image: string;
}

interface Props {
  user: User;
}

export const HeaderTodo: React.FC<Props> = ({ user }) => {
  return (
    <header className="w-full">
      <div className="header-wrapper flex w-full items-center justify-between py-10">
        <div className="header-desc">
          <h1 className="text-xl font-bold text-white">{`Bem-Vindo, ${user.name}`}</h1>
        </div>
        <div className="header-info flex items-center gap-5">
          <div className="w-72">
            <Input
              label="Buscar"
              icon={<SearchSvg />}
              color="white"
              crossOrigin={undefined}
            />
          </div>
          <div className="header-date flex items-center gap-2">
            <DateSvg />
            <p className="opacity-50 font-semibold">{FunctionDate()}</p>
          </div>
          <div className="header-img ">
            <img
              className="rounded-full"
              src={user.image}
              alt={user.name}
              width={40}
            />
          </div>
        </div>
      </div>
      <div className="header-quadro-wrapper pb-2 flex gap-3">
        <div className="header-quadro flex items-center gap-2">
          <QuadroSvg />
          <p>Seu Quadro</p>
        </div>
        <button className="header-addList flex items-center gap-2">
          <MoreSvg />
          <p className="font-semibold text-sm">Adicionar Lista</p>
        </button>
      </div>
      <div className="divisor w-full h-px bg-white" />
    </header>
  );
};
