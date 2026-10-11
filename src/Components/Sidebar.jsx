import React from "react";
import { NavLink } from "react-router-dom";
import {
  Archive,
  Box,
  ChartSpline,
  FocusIcon,
  GitBranch,
  Grid2X2,
  Home,
  User,
  Users,
  X,
} from "lucide-react";

function Sidebar() {
  const menu = {
    menu1: {
      title: "Painel",
      links: {
        link1: {
          icon: <Home className="lg:size-5 xl:size-6" />,
          label: "Dashboard",
          direction: "dashboard",
        },
        link2: {
          icon: <Grid2X2 className="lg:size-5 xl:size-6" />,
          label: "Board",
          direction: "board",
        },
        link3: {
          icon: <User className="lg:size-5 xl:size-6" />,
          label: "MyTasks",
          direction: "mytasks",
        },
      },
    },
    menu2: {
      title: "Desenvolvimento",
      links: {
        link1: {
          icon: <FocusIcon className="lg:size-5 xl:size-6" />,
          label: "Sprint",
          direction: "sprint",
        },
        link2: {
          icon: <GitBranch className="lg:size-5 xl:size-6" />,
          label: "Pull Rquests",
          direction: "pullrequests",
        },
      },
    },
    menu3: {
      title: "Projeto",
      links: {
        link1: {
          icon: <Archive className="lg:size-5 xl:size-6" />,
          label: "RoadMap",
          direction: "roadmap",
        },
        link2: {
          icon: <ChartSpline className="lg:size-5 xl:size-6" />,
          label: "Reports",
          direction: "reposts",
        },
      },
    },
    menu4: {
      title: "Equipe",
      links: {
        link1: {
          icon: <Users className="lg:size-5 xl:size-6" />,
          label: "Team",
          direction: "team",
        },
      },
    },
  };
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col justify-between overflow-y-auto bg-black p-4 lg:gap-10">
      <div>
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl">
            C | <span className="text-primary-light">S</span>
          </h1>

          <button className="cursor-pointer hover:scale-125 hover:duration-300 transition-all hover:text-primary-light">
            <X />
          </button>
        </div>
        <hr className="opacity-20" />
        <div className="mt-4 flex flex-col gap-8">
          {Object.values(menu).map((item, index) => (
            <div
              key={index}
              className="border-b last:border-none border-white/15 pb-6 "
            >
              <p className="mb-2 lg:text-sm xl:text-md">{item.title}</p>

              <div className="flex flex-col gap-4">
                {Object.values(item.links).map((link) => {
                  return (
                    <NavLink
                      key={link.direction}
                      to={`/${link.direction}`}
                      end
                      className={({ isActive }) =>
                        `flex items-center py-2 px-2 rounded-md gap-2 xl:text-2xl 2xl:text-md transition-colors ${isActive ? "bg-primary-light text-white" : "bg-transparent hover:bg-primary-dark/50 hover:duration-300 transition-all"}`
                      }
                      aria-label={link.label}
                    >
                      <span>{link.icon}</span>
                      <span className="opacity-20">|</span>
                      {link.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between lg:max-w-[90%] 2xl:max-w-62 border p-4 rounded-md border-white/10 gap-4">
        <img
          src="https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg"
          alt=""
          className="max-w-14 rounded-full object-cover"
        />
        <div>
          <h1 className="text-md font-bold">Gabriel de Souza</h1>
          <p className="text-sm text-primary-light">Desenvolvedor</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
