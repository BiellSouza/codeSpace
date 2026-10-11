import React from "react";
import HeaderComponent from "../Components/HeaderComponent";
import { Box, GitBranch, Plus } from "lucide-react";

function Board() {
  const columns = [
    {
      id: "backlog",
      name: "Backlog",
      color: "#1C4BC1",
    },
    {
      id: "andamento",
      name: "Em Andamento",
      color: "#F75932",
    },
    {
      id: "revisao",
      name: "Revisão",
      color: "#6F44A4",
    },
    {
      id: "concluido",
      name: "Concluído",
      color: "#3ACE79",
    },
  ];

  const tasks = [
    {
      text: "Implementar autenticação JWT",
      function: "backend",
      priority: "alta",
      pr: "912",
      date: "14 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "backlog",
    },
    {
      text: "Criar tela de login e cadastro",
      function: "frontend",
      priority: "media",
      pr: "913",
      date: "15 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "backlog",
    },
    {
      text: "Corrigir responsividade do dashboard",
      function: "frontend",
      priority: "alta",
      pr: "914",
      date: "16 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "backlog",
    },
    {
      text: "Corrigir responsividade do dashboard",
      function: "frontend",
      priority: "alta",
      pr: "914",
      date: "16 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "backlog",
    },
    {
      text: "Corrigir responsividade do dashboard",
      function: "frontend",
      priority: "alta",
      pr: "914",
      date: "16 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "backlog",
    },
    {
      text: "Desenvolver filtros de tarefas",
      function: "frontend",
      priority: "baixa",
      pr: "916",
      date: "18 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "backlog",
    },
    {
      text: "Integrar API de usuários",
      function: "backend",
      priority: "media",
      pr: "915",
      date: "17 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "andamento",
    },
    {
      text: "Desenvolver filtros de tarefas",
      function: "frontend",
      priority: "baixa",
      pr: "916",
      date: "18 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "andamento",
    },
    {
      text: "Configurar permissões de acesso",
      function: "backend",
      priority: "alta",
      pr: "917",
      date: "19 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "andamento",
    },
    {
      text: "Revisar validação dos formulários",
      function: "frontend",
      priority: "media",
      pr: "918",
      date: "20 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "revisao",
    },
    {
      text: "Otimizar consultas ao banco de dados",
      function: "backend",
      priority: "alta",
      pr: "919",
      date: "21 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "revisao",
    },
    {
      text: "Adicionar modo escuro",
      function: "frontend",
      priority: "baixa",
      pr: "920",
      date: "22 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "concluido",
    },
    {
      text: "Corrigir erros no endpoint de tarefas",
      function: "backend",
      priority: "alta",
      pr: "921",
      date: "23 Set",
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      status: "concluido",
    },
  ];

  return (
    <div className="">
      <HeaderComponent />

      <div className="mt-4 flex gap-4 w-full overflow-x-auto scrollbar-custom-dashboard-geral p-2 border border-white/10 rounded-md">
        {columns.map((item, index) => (
          <div className="rounded-md w-full">
            <div className="bg-black/20 h-screen rounded-md w-full p-4 overflow-y-auto scrollbar-custom-dashboard-geral">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Box className="size-5" />
                  <h1 className="truncate">{item.name}</h1>
                  <p>3</p>
                </div>
                <button>
                  <Plus className="size-5" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {tasks
                  .filter((task) => task.status === item.id)
                  .map((task, index) => (
                    <div
                      key={task.pr ?? index}
                      className="group min-w-62 relative cursor-pointer overflow-hidden rounded-xl border border-white/8 bg-white/2 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/5 hover:shadow-lg"
                      style={{
                        borderLeft: `4px solid ${item.color}`,
                      }}
                    >
                      {/* Título */}
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <h3 className="text-sm font-medium leading-6 text-light transition-colors group-hover:text-white">
                          {task.text}
                        </h3>
                      </div>

                      {/* Categoria e prioridade */}
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-md border border-white/8 bg-white/4 px-2 py-1 text-xs font-medium text-light/80">
                          {task.function}
                        </span>

                        <span
                          className={`rounded-md px-2 py-1 text-xs font-semibold capitalize ${
                            task.priority === "alta"
                              ? "bg-red-500/10 text-red-400"
                              : task.priority === "media"
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-blue-500/10 text-blue-400"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {/* Separador */}
                      <div className="mb-3 border-t border-white/6" />

                      {/* Informações inferiores */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3 text-xs text-light/60">
                          <span className="flex shrink-0 items-center gap-1.5">
                            <GitBranch className="size-3.5" />
                            <span>#{task.pr}</span>
                          </span>

                          <span className="size-1 shrink-0 rounded-full bg-white/20" />

                          <span className="truncate">{task.date}</span>
                        </div>

                        <img
                          className="size-7 shrink-0 rounded-full border border-white/10 object-cover ring-2 ring-transparent transition-all group-hover:ring-white/10"
                          src={task.user}
                          alt="Responsável pela tarefa"
                          title="Responsável pela tarefa"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
