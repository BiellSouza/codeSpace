import React, { useState } from "react";
import HeaderComponent from "../Components/HeaderComponent";
import SectionHeader from "../Components/SectionHeader";
import { Box, Equal, Flag, Menu, Minus } from "lucide-react";

function MyTasks() {
  const [selected, setSelected] = useState(false);
  const [filterSelected, setFilterSelected] = useState(1);

  const filter = [
    {
      id: 1,
      label: "Todas",
    },
    {
      id: 2,
      label: "Backlog",
    },
    {
      id: 3,
      label: "Em Andamento",
    },
    {
      id: 4,
      label: "Revisão",
    },
    {
      id: 5,
      label: "Concluídas",
    },
  ];

  const tabela = [
    {
      text: "Corrigir autenticação JWT",
      project: "Website",
      priority: "alta",
      time: "14 Set",
      status: "Backlog",
    },
    {
      text: "Resolver falha no login",
      project: "App Mobile",
      priority: "alta",
      time: "15 Set",
      status: "Em Andamento",
    },
    {
      text: "Corrigir erro no pagamento",
      project: "E-commerce",
      priority: "alta",
      time: "16 Set",
      status: "Revisão",
    },
    {
      text: "Implementar controle de acesso",
      project: "Dashboard",
      priority: "alta",
      time: "17 Set",
      status: "Backlog",
    },
    {
      text: "Resolver vazamento de dados",
      project: "API REST",
      priority: "alta",
      time: "18 Set",
      status: "Em Andamento",
    },
    {
      text: "Corrigir falha no deploy",
      project: "Website",
      priority: "alta",
      time: "19 Set",
      status: "Concluídas",
    },
    {
      text: "Criar página de configurações",
      project: "Website",
      priority: "media",
      time: "20 Set",
      status: "Backlog",
    },
    {
      text: "Implementar filtros de tarefas",
      project: "Dashboard",
      priority: "media",
      time: "21 Set",
      status: "Em Andamento",
    },
    {
      text: "Melhorar responsividade do menu",
      project: "App Mobile",
      priority: "media",
      time: "22 Set",
      status: "Revisão",
    },
    {
      text: "Adicionar paginação na tabela",
      project: "Admin Panel",
      priority: "media",
      time: "23 Set",
      status: "Backlog",
    },
    {
      text: "Integrar API de notificações",
      project: "API REST",
      priority: "media",
      time: "24 Set",
      status: "Em Andamento",
    },
    {
      text: "Atualizar componentes de formulário",
      project: "Website",
      priority: "media",
      time: "25 Set",
      status: "Concluídas",
    },
    {
      text: "Ajustar espaçamento dos cards",
      project: "Dashboard",
      priority: "baixa",
      time: "26 Set",
      status: "Backlog",
    },
    {
      text: "Atualizar ícones do menu",
      project: "Website",
      priority: "baixa",
      time: "27 Set",
      status: "Em Andamento",
    },
    {
      text: "Revisar textos dos botões",
      project: "App Mobile",
      priority: "baixa",
      time: "28 Set",
      status: "Revisão",
    },
    {
      text: "Adicionar animações suaves",
      project: "Website",
      priority: "baixa",
      time: "29 Set",
      status: "Backlog",
    },
    {
      text: "Organizar arquivos CSS",
      project: "Admin Panel",
      priority: "baixa",
      time: "30 Set",
      status: "Em Andamento",
    },
    {
      text: "Padronizar nomes de componentes",
      project: "API REST",
      priority: "baixa",
      time: "01 Out",
      status: "Concluídas",
    },
  ];

  const tarefasFiltradas = tabela.filter((item) => {
    if (filterSelected === 1) {
      return true;
    }

    const statusSelecionado = filter.find(
      (filtro) => filtro.id === filterSelected,
    );

    return item.status === statusSelecionado.label;
  });

  return (
    <div>
      <HeaderComponent />

      <div>
        <SectionHeader
          title="Minhas Tarefas"
          subtitle="Acompanhe todas as tarefas atribuídas a você."
        />
      </div>
      <div className="mt-6 flex gap-4">
        {filter.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setFilterSelected(item.id)}
            className={`w-32 h-10 rounded-md border-2 cursor-pointer transition-all duration-200 hover:bg-white/5 hover:shadow-lg hover:border-primary-dark ${
              filterSelected === item.id
                ? "bg-primary-dark border-primary-dark"
                : "border-white/20 bg-transparent"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-10 max-h-182 overflow-y-auto overflow-x-auto rounded-md border border-white/20 p-5 scrollbar-custom-dashboard-geral">
        <div className="flex min-w-212.5 flex-col gap-7">
          {tarefasFiltradas.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[minmax(280px,2fr)_minmax(100px,1fr)_minmax(130px,1fr)_minmax(90px,0.7fr)_minmax(130px,1fr)] border-b border-white/20 pb-4 last:border-none items-center gap-6 2xl:gap-10"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`shrink-0 rounded-full p-2 ${
                    item.priority === "alta"
                      ? "bg-red-700"
                      : item.priority === "media"
                        ? "bg-blue-700"
                        : "bg-green-700"
                  }`}
                >
                  <Box size={20} />
                </div>

                <h1 className="truncate text-sm xl:text-base 2xl:text-lg">
                  {item.text}
                </h1>
              </div>

              <p className="truncate text-center text-sm xl:text-base">
                {item.project}
              </p>

              <p
                className={`flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm ${
                  item.priority === "alta"
                    ? "border border-red-500"
                    : item.priority === "media"
                      ? "border border-blue-500"
                      : "border border-green-500"
                }`}
              >
                {item.priority === "alta" ? (
                  <Menu size={18} />
                ) : item.priority === "media" ? (
                  <Equal size={18} />
                ) : (
                  <Minus size={18} />
                )}
                {item.priority}
              </p>

              <p className="whitespace-nowrap text-center text-sm xl:text-base">
                {item.time}
              </p>

              <p className="truncate text-center text-sm xl:text-base">
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTasks;
