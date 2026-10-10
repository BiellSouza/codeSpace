import React from "react";
import HeaderComponent from "../Components/HeaderComponent";
import SectionHeader from "../Components/SectionHeader";
import { Box, CircleQuestionMark, Flame, GitCompareArrows } from "lucide-react";

function Dashboard() {
  const dados = [
    {
      label: "Total de Tarefas",
      number: 24,
      porcent: 3,
      color: "#0a9800",
    },
    {
      label: "Em Andamento",
      number: 6,
      porcent: 25,
      color: "#0a9800",
    },
    {
      label: "Concluídas",
      number: 14,
      porcent: 17,
      color: "#0a9800",
    },
    {
      label: "Pendente",
      number: 14,
      porcent: 17,
      color: "#CB4039",
    },
  ];

  const lista = [
    {
      title: "Atualizar banco de dados",
      priority: "Alta",
      pullRequest: "127",
      date: "Hoje",
      column: "Backlog",
    },
    {
      title: "Criar interface Dashboard",
      priority: "Baixa",
      pullRequest: "22",
      date: "9/10/2026",
      column: "Em Andamento",
    },
    {
      title: "Implementar API de Pagementos",
      priority: "Media",
      pullRequest: "251",
      date: "07/10/2026",
      column: "Concluída",
    },
    {
      title: "Atualizar banco de dados",
      priority: "Alta",
      pullRequest: "127",
      date: "Hoje",
      column: "Backlog",
    },
    {
      title: "Criar interface Dashboard",
      priority: "Baixa",
      pullRequest: "22",
      date: "9/10/2026",
      column: "Em Andamento",
    },
    {
      title: "Implementar API de Pagementos",
      priority: "Media",
      pullRequest: "251",
      date: "07/10/2026",
      column: "Concluída",
    },
    {
      title: "Atualizar banco de dados",
      priority: "Alta",
      pullRequest: "127",
      date: "Hoje",
      column: "Backlog",
    },
    {
      title: "Criar interface Dashboard",
      priority: "Baixa",
      pullRequest: "22",
      date: "9/10/2026",
      column: "Em Andamento",
    },
    {
      title: "Implementar API de Pagementos",
      priority: "Media",
      pullRequest: "251",
      date: "07/10/2026",
      column: "Concluída",
    },
    {
      title: "Atualizar banco de dados",
      priority: "Alta",
      pullRequest: "127",
      date: "Hoje",
      column: "Backlog",
    },
    {
      title: "Criar interface Dashboard",
      priority: "Baixa",
      pullRequest: "22",
      date: "9/10/2026",
      column: "Em Andamento",
    },
    {
      title: "Implementar API de Pagementos",
      priority: "Media",
      pullRequest: "251",
      date: "07/10/2026",
      column: "Concluída",
    },
  ];

  const atividade = [
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel iniciou a tarefa #12",
      status: "tarefa iniciada",
      time: "Há 2 horas",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel iniciou a tarefa #12",
      status: "tarefa iniciada",
      time: "Há 2 horas",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel iniciou a tarefa #12",
      status: "tarefa iniciada",
      time: "Há 2 horas",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel iniciou a tarefa #12",
      status: "tarefa iniciada",
      time: "Há 2 horas",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel iniciou a tarefa #12",
      status: "tarefa iniciada",
      time: "Há 2 horas",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel iniciou a tarefa #12",
      status: "tarefa iniciada",
      time: "Há 2 horas",
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <HeaderComponent />

      <section className="mt-6 rounded-lg w-full">
        <SectionHeader
          title="Olá, Gabriel! 👋"
          subtitle="Aqui está o resumo do seu projeto de hoje."
        />

        <div className="flex lg:flex-col xl:flex-row justify-between gap-12">
          <div className="w-full">
            <div className="mt-6 flex w-full gap-4">
              {dados.map((item, index) => (
                <div className="border border-primary-light/20 w-full max-w-42 rounded-md p-2 bg-black/20">
                  <h1 className="lg:text-sm">{item.label}</h1>
                  <h2 className="lg:text-lg">{item.number}</h2>
                  <div className="flex mt-4 items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <p>{item.porcent}%</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-primary-light/30 p-4 rounded-md lg:h-138 2xl:h-164 overflow-y-auto">
              <h1>Tarefas Recentes</h1>
              <div className="flex flex-col">
                {lista.map((item, index) => (
                  <div className="flex justify-between py-4 border-b border-white/20 last:border-none">
                    <div className="flex items-center gap-2">
                      <Box className="size-5" />
                      <h1>{item.title}</h1>
                    </div>
                    <div className="flex items-center justify-between gap-4 w-full max-w-92 text-sm">
                      <p
                        className={`w-full py-0.5 max-w-14 text-sm text-center px-2 rounded-md ${item.priority === "Alta" ? "bg-red-800" : item.priority === "Media" ? "bg-blue-800" : "bg-green-800"}`}
                      >
                        {item.priority}
                      </p>
                      <p className="flex items-center gap-1">
                        <span>
                          <GitCompareArrows className="size-5" />
                        </span>
                        {item.pullRequest}
                      </p>
                      <p>
                        {item.date} • {item.column}
                      </p>
                      <p>
                        <CircleQuestionMark className="size-5" />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 border border-primary-light/30 p-4 rounded-md lg:h-138 xl:h-170 2xl:h-196 overflow-y-auto xl:max-w-92 xl:w-full">
            {atividade.map((item, index) => (
              <div className="flex gap-2 items-start border-b border-primary-dark/20 py-4 last:border-none">
                <img
                  src={item.user}
                  alt=""
                  className="lg:w-10 rounded-full object-cover"
                />
                <div className="text-sm flex flex-col gap-1">
                  <p>{item.action}</p>
                  <p className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-dark rounded-full" />
                    {item.status}
                  </p>
                  <p className="text-xs">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
