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
      time: "Há 5 minutos",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel concluiu a tarefa #08",
      status: "tarefa concluída",
      time: "Há 15 minutos",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel comentou na tarefa #15",
      status: "comentário adicionado",
      time: "Há 30 minutos",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel atualizou a tarefa #21",
      status: "tarefa atualizada",
      time: "Há 45 minutos",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel moveu a tarefa #17 para Revisão",
      status: "tarefa movida",
      time: "Há 1 hora",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel adicionou um comentário na tarefa #09",
      status: "comentário adicionado",
      time: "Há 1 hora",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel alterou a prioridade da tarefa #14",
      status: "prioridade alterada",
      time: "Há 2 horas",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel criou a tarefa #24",
      status: "tarefa criada",
      time: "Há 3 horas",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel enviou o PR #127 para revisão",
      status: "pull request enviado",
      time: "Há 4 horas",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel finalizou a tarefa #06",
      status: "tarefa concluída",
      time: "Há 5 horas",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel moveu a tarefa #19 para Em Andamento",
      status: "tarefa movida",
      time: "Ontem",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel atualizou a descrição da tarefa #11",
      status: "descrição atualizada",
      time: "Ontem",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel revisou o PR #124",
      status: "pull request revisado",
      time: "Há 2 dias",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel reabriu a tarefa #07",
      status: "tarefa reaberta",
      time: "Há 3 dias",
    },
    {
      user: "https://i.pinimg.com/1200x/14/61/df/1461dfbf7f784a31f7550f02fc945f90.jpg",
      action: "Gabriel arquivou a tarefa #03",
      status: "tarefa arquivada",
      time: "Há 4 dias",
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
                <div className="border border-primary-light/20 w-full max-w-42 rounded-md p-2 bg-black/2 2xl:max-w-full">
                  <h1 className="lg:text-sm">{item.label}</h1>
                  <h2 className="lg:text-lg 2xl:text-2xl">{item.number}</h2>
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
            <div className="mt-4 border border-primary-light/30 p-4 rounded-md lg:h-138 2xl:h-164 overflow-y-auto scrollbar-custom-dashboard-geral">
              <h1>Tarefas Recentes</h1>

              <div className="flex flex-col">
                {lista.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[minmax(220px,1fr)_minmax(420px,1.5fr)] items-center gap-6 border-b border-white/20 py-5 last:border-none"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Box className="size-5 shrink-0" />

                      <h1 className="truncate text-sm xl:text-base">
                        {item.title}
                      </h1>
                    </div>

                    <div className="grid grid-cols-[90px_100px_minmax(150px,1fr)_24px] items-center justify-between gap-5 text-sm">
                      <p
                        className={`w-full rounded-md px-2 py-1 text-center ${
                          item.priority === "Alta"
                            ? "bg-red-800"
                            : item.priority === "Media"
                              ? "bg-blue-800"
                              : "bg-green-800"
                        }`}
                      >
                        {item.priority}
                      </p>

                      <p className="flex items-center justify-center gap-2 whitespace-nowrap">
                        <GitCompareArrows className="size-5 shrink-0" />
                        {item.pullRequest}
                      </p>

                      <p className="whitespace-nowrap text-center">
                        {item.date} • {item.column}
                      </p>

                      <CircleQuestionMark className="size-5 justify-self-center" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 border border-primary-light/30 p-4 rounded-md lg:h-138 xl:h-170 2xl:h-196 overflow-y-auto scrollbar-custom-dashboard-geral xl:max-w-92 xl:w-full ">
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
