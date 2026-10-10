import React from "react";
import { Bell, EllipsisVertical, Search } from "lucide-react";

function HeaderComponent() {
  return (
    <div className="w-full flex justify-between border-b border-white/20 pb-3">
      <div className="flex items-center gap-4 border border-white/20 w-full max-w-[40%] rounded-md px-3 py-1">
        <Search size={16} />
        <input
          type="text"
          placeholder="Buscar tarefas, projetos..."
          className="outline-none w-full text-light"
        />
      </div>
      <div className="flex items-center gap-2">
        <Bell className="lg:size-5 2xl:size-6" />
        <img
          src="https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg"
          alt=""
          className="lg:max-w-6 2xl:max-w-7 rounded-full object-cover"
        />
        <EllipsisVertical className="lg:size-5 2xl:size-6" />
      </div>
    </div>
  );
}

export default HeaderComponent;
