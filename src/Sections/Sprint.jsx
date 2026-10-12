import React, { useEffect, useMemo, useState } from "react";
import HeaderComponent from "../Components/HeaderComponent";
import SectionHeader from "../Components/SectionHeader";
import {
  Calendar,
  CheckCheck,
  Clock,
  Flag,
  Grid2x2,
  Pencil,
  Target,
  Users,
  TrendingUp,
  CircleAlert,
  MoreHorizontal,
  ArrowUpRight,
  Zap,
  ListTodo,
  ChevronDown,
  Plus,
  Trash2,
  X,
  Play,
  CheckCircle2,
  Circle,
  FileText,
  Search,
} from "lucide-react";

const STORAGE_KEY = "codespace_sprints_v1";

const statusOptions = ["Backlog", "Em andamento", "Em revisão", "Concluída"];

const priorityOptions = ["Alta", "Média", "Baixa"];

const today = () => {
  const date = new Date();
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const formatDate = (value) => {
  if (!value) return "Não definida";

  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const daysRemaining = (date) => {
  if (!date) return 0;

  const end = new Date(`${date}T23:59:59`);
  return Math.max(0, Math.ceil((end.getTime() - Date.now()) / 86400000));
};

const makeInitialData = () => {
  const tasks = [
    {
      id: "task-124",
      title: "Implementar checkout de pagamentos",
      description: "Finalizar fluxo de compra",
      priority: "Alta",
      status: "Em andamento",
      points: 8,
      assignee: "Gabriel",
      dueDate: "2026-10-14",
      sprintId: "sprint-demo",
    },
    {
      id: "task-125",
      title: "Integrar API de pagamentos",
      description: "Conectar gateway de pagamento",
      priority: "Alta",
      status: "Em revisão",
      points: 5,
      assignee: "Marcos",
      dueDate: "2026-10-13",
      sprintId: "sprint-demo",
    },
    {
      id: "task-126",
      title: "Criar tela de confirmação",
      description: "Exibir resumo do pedido",
      priority: "Média",
      status: "Concluída",
      points: 3,
      assignee: "Gabriel",
      dueDate: "2026-10-11",
      sprintId: "sprint-demo",
    },
    {
      id: "task-127",
      title: "Validar dados do cartão",
      description: "Adicionar validações ao formulário",
      priority: "Alta",
      status: "Backlog",
      points: 5,
      assignee: "Ana",
      dueDate: "2026-10-17",
      sprintId: "sprint-demo",
    },
    {
      id: "task-128",
      title: "Criar testes de integração",
      description: "Cobrir cenários de pagamento",
      priority: "Média",
      status: "Em andamento",
      points: 8,
      assignee: "Marcos",
      dueDate: "2026-10-18",
      sprintId: "sprint-demo",
    },
    {
      id: "task-129",
      title: "Documentar endpoints",
      description: "Registrar os contratos da API",
      priority: "Baixa",
      status: "Backlog",
      points: 3,
      assignee: "Ana",
      dueDate: "2026-10-20",
      sprintId: null,
    },
  ];

  return {
    tasks,
    sprints: [
      {
        id: "sprint-demo",
        name: "Sprint 12",
        goal: "Finalizar a integração com o gateway de pagamentos, garantindo um checkout seguro em produção.",
        startDate: "2026-10-05",
        endDate: "2026-10-22",
        status: "ativa",
        createdAt: new Date().toISOString(),
        closedAt: null,
      },
    ],
    selectedId: "sprint-demo",
  };
};

const loadData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed.tasks) && Array.isArray(parsed.sprints)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Erro ao carregar as Sprints:", error);
  }

  return makeInitialData();
};

function Sprint() {
  const [data, setData] = useState(loadData);
  const [modal, setModal] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtro, setFiltro] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const [sprintForm, setSprintForm] = useState({
    name: "",
    goal: "",
    startDate: today(),
    endDate: "",
    taskIds: [],
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "Média",
    status: "Backlog",
    points: 3,
    assignee: "Gabriel",
    dueDate: "",
  });

  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao salvar as Sprints:", error);
      setMensagem("Não foi possível salvar os dados no navegador.");
    }
  }, [data]);

  const sprints = data.sprints;
  const tarefas = data.tasks;

  const sprintAtual = sprints.find((sprint) => sprint.id === data.selectedId);

  const tarefasDaSprint = useMemo(
    () =>
      sprintAtual
        ? tarefas.filter((task) => task.sprintId === sprintAtual.id)
        : [],
    [tarefas, sprintAtual],
  );

  const concluidas = tarefasDaSprint.filter(
    (task) => task.status === "Concluída",
  );

  const totalPoints = tarefasDaSprint.reduce(
    (total, task) => total + Number(task.points || 0),
    0,
  );

  const completedPoints = concluidas.reduce(
    (total, task) => total + Number(task.points || 0),
    0,
  );

  const progresso = tarefasDaSprint.length
    ? Math.round((concluidas.length / tarefasDaSprint.length) * 100)
    : 0;

  const statusTarefas = [
    {
      id: "Backlog",
      title: "Backlog",
      color: "bg-gray-400",
    },
    {
      id: "Em andamento",
      title: "Em andamento",
      color: "bg-blue-400",
    },
    {
      id: "Em revisão",
      title: "Em revisão",
      color: "bg-purple-400",
    },
    {
      id: "Concluída",
      title: "Concluídas",
      color: "bg-primary-light",
    },
  ].map((item) => ({
    ...item,
    total: tarefasDaSprint.filter((task) => task.status === item.id).length,
  }));

  const tarefasFiltradas = tarefasDaSprint.filter((task) => {
    const combinaStatus = filtro === "Todas" || task.status === filtro;

    const termo = busca.toLowerCase();
    const combinaBusca =
      task.title.toLowerCase().includes(termo) ||
      task.id.toLowerCase().includes(termo) ||
      task.assignee.toLowerCase().includes(termo);

    return combinaStatus && combinaBusca;
  });

  const dias = sprintAtual ? daysRemaining(sprintAtual.endDate) : 0;

  const progressoTempo = sprintAtual
    ? Math.min(
        100,
        Math.max(
          0,
          Math.round(
            ((Date.now() -
              new Date(`${sprintAtual.startDate}T00:00:00`).getTime()) /
              (new Date(`${sprintAtual.endDate}T23:59:59`).getTime() -
                new Date(`${sprintAtual.startDate}T00:00:00`).getTime())) *
              100,
          ),
        ),
      )
    : 0;

  const updateData = (updater) => {
    setData((current) => updater(current));
  };

  const notify = (text) => {
    setMensagem(text);
    window.setTimeout(() => setMensagem(""), 3000);
  };

  const openCreateSprint = () => {
    if (sprints.some((item) => item.status === "ativa")) {
      notify("Encerre a Sprint ativa antes de iniciar outra.");
    }

    setSprintForm({
      name: `Sprint ${sprints.length + 1}`,
      goal: "",
      startDate: today(),
      endDate: "",
      taskIds: tarefas.filter((task) => !task.sprintId).map((task) => task.id),
    });

    setModal({ type: "sprint", mode: "create" });
  };

  const openEditSprint = () => {
    if (!sprintAtual) return;

    setSprintForm({
      name: sprintAtual.name,
      goal: sprintAtual.goal,
      startDate: sprintAtual.startDate,
      endDate: sprintAtual.endDate,
      taskIds: tarefasDaSprint.map((task) => task.id),
    });

    setModal({ type: "sprint", mode: "edit" });
    setMenuAberto(false);
  };

  const saveSprint = (event) => {
    event.preventDefault();

    const name = sprintForm.name.trim();
    const goal = sprintForm.goal.trim();

    if (!name || !goal || !sprintForm.startDate || !sprintForm.endDate) {
      notify("Preencha todos os campos obrigatórios.");
      return;
    }

    if (sprintForm.endDate < sprintForm.startDate) {
      notify("A data final precisa ser posterior à data inicial.");
      return;
    }

    if (
      modal.mode === "create" &&
      sprints.some((item) => item.status === "ativa")
    ) {
      notify("Já existe uma Sprint ativa. Encerre-a primeiro.");
      return;
    }

    if (modal.mode === "edit" && sprintAtual?.status === "concluída") {
      notify("Uma Sprint concluída não pode ser editada.");
      return;
    }

    const sprintId = modal.mode === "edit" ? sprintAtual.id : makeId();

    const novaSprint = {
      id: sprintId,
      name,
      goal,
      startDate: sprintForm.startDate,
      endDate: sprintForm.endDate,
      status: modal.mode === "edit" ? sprintAtual.status : "planejada",
      createdAt:
        modal.mode === "edit"
          ? sprintAtual.createdAt
          : new Date().toISOString(),
      closedAt: null,
    };

    updateData((current) => ({
      ...current,
      sprints:
        modal.mode === "edit"
          ? current.sprints.map((item) =>
              item.id === sprintId ? novaSprint : item,
            )
          : [...current.sprints, novaSprint],
      tasks: current.tasks.map((task) => {
        if (modal.mode === "edit" && task.sprintId === sprintId) {
          return sprintForm.taskIds.includes(task.id)
            ? task
            : { ...task, sprintId: null };
        }

        if (sprintForm.taskIds.includes(task.id)) {
          return { ...task, sprintId: sprintId };
        }

        return task;
      }),
      selectedId: sprintId,
    }));

    setModal(null);
    notify(
      modal.mode === "edit"
        ? "Sprint atualizada com sucesso."
        : "Sprint criada com sucesso.",
    );
  };

  const startSprint = () => {
    if (!sprintAtual) return;

    if (sprints.some((item) => item.status === "ativa")) {
      notify("Já existe uma Sprint ativa.");
      return;
    }

    if (!tarefasDaSprint.length) {
      notify("Adicione pelo menos uma tarefa antes de iniciar.");
      return;
    }

    if (!window.confirm(`Deseja iniciar "${sprintAtual.name}"?`)) {
      return;
    }

    updateData((current) => ({
      ...current,
      sprints: current.sprints.map((item) =>
        item.id === sprintAtual.id ? { ...item, status: "ativa" } : item,
      ),
    }));

    notify("Sprint iniciada.");
  };

  const closeSprint = () => {
    if (!sprintAtual) return;

    const pendentes = tarefasDaSprint.length - concluidas.length;

    const confirmacao = window.confirm(
      `Encerrar "${sprintAtual.name}"?\n\n` +
        `${concluidas.length} tarefas concluídas.\n` +
        `${pendentes} tarefas pendentes.\n\n` +
        "As tarefas pendentes continuarão vinculadas à Sprint encerrada.",
    );

    if (!confirmacao) return;

    updateData((current) => ({
      ...current,
      sprints: current.sprints.map((item) =>
        item.id === sprintAtual.id
          ? {
              ...item,
              status: "concluída",
              closedAt: new Date().toISOString(),
            }
          : item,
      ),
    }));

    notify("Sprint encerrada. O histórico foi preservado.");
  };

  const deleteSprint = () => {
    if (!sprintAtual) return;

    if (sprintAtual.status !== "planejada") {
      notify("Somente Sprints planejadas podem ser excluídas.");
      return;
    }

    if (!window.confirm(`Excluir "${sprintAtual.name}"?`)) return;

    const remaining = sprints.filter((item) => item.id !== sprintAtual.id);

    updateData((current) => ({
      ...current,
      sprints: remaining,
      tasks: current.tasks.map((task) =>
        task.sprintId === sprintAtual.id ? { ...task, sprintId: null } : task,
      ),
      selectedId: remaining[0]?.id || "",
    }));

    setMenuAberto(false);
    notify("Sprint excluída.");
  };

  const openCreateTask = () => {
    if (!sprintAtual || sprintAtual.status === "concluída") {
      notify("Selecione uma Sprint não concluída.");
      return;
    }

    setEditTaskId(null);
    setTaskForm({
      title: "",
      description: "",
      priority: "Média",
      status: "Backlog",
      points: 3,
      assignee: "Gabriel",
      dueDate: "",
    });

    setModal({ type: "task" });
  };

  const openEditTask = (task) => {
    if (sprintAtual?.status === "concluída") {
      notify("Esta Sprint foi encerrada e está somente para consulta.");
      return;
    }

    setEditTaskId(task.id);
    setTaskForm({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
      points: task.points,
      assignee: task.assignee,
      dueDate: task.dueDate || "",
    });

    setModal({ type: "task" });
  };

  const saveTask = (event) => {
    event.preventDefault();

    if (!taskForm.title.trim() || !sprintAtual) return;

    const points = Number(taskForm.points);

    if (!Number.isFinite(points) || points < 0) {
      notify("Informe uma quantidade válida de Story Points.");
      return;
    }

    if (editTaskId) {
      updateData((current) => ({
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === editTaskId
            ? {
                ...task,
                ...taskForm,
                title: taskForm.title.trim(),
                points,
              }
            : task,
        ),
      }));

      notify("Tarefa atualizada.");
    } else {
      const newTask = {
        id: makeId(),
        ...taskForm,
        title: taskForm.title.trim(),
        points,
        sprintId: sprintAtual.id,
      };

      updateData((current) => ({
        ...current,
        tasks: [...current.tasks, newTask],
      }));

      notify("Tarefa adicionada à Sprint.");
    }

    setModal(null);
  };

  const removeTask = (task) => {
    if (sprintAtual?.status === "concluída") {
      notify("Esta Sprint foi encerrada.");
      return;
    }

    if (!window.confirm(`Remover "${task.title}" desta Sprint?`)) {
      return;
    }

    updateData((current) => ({
      ...current,
      tasks: current.tasks.map((item) =>
        item.id === task.id ? { ...item, sprintId: null } : item,
      ),
    }));

    notify("Tarefa removida da Sprint. Ela continua no projeto.");
  };

  const addExistingTasks = () => {
    if (!sprintAtual || sprintAtual.status === "concluída") {
      notify("Não é possível alterar uma Sprint concluída.");
      return;
    }

    setSelecionados(
      tarefas.filter((task) => !task.sprintId).map((task) => task.id),
    );

    setModal({ type: "existing" });
  };

  const confirmExistingTasks = () => {
    updateData((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        selecionados.includes(task.id) && !task.sprintId
          ? { ...task, sprintId: sprintAtual.id }
          : task,
      ),
    }));

    setModal(null);
    notify("Tarefas adicionadas à Sprint.");
  };

  const updateTaskStatus = (taskId, status) => {
    if (sprintAtual?.status === "concluída") {
      notify("Esta Sprint foi encerrada.");
      return;
    }

    updateData((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task,
      ),
    }));
  };

  const priorityStyle = {
    Alta: "text-red-400 bg-red-400/10 border-red-400/20",
    Média: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    Baixa: "text-primary-light bg-primary-light/10 border-primary-light/20",
  };

  const statusStyle = {
    Backlog: "text-gray-400 bg-gray-400/10",
    "Em andamento": "text-blue-400 bg-blue-400/10",
    "Em revisão": "text-purple-400 bg-purple-400/10",
    Concluída: "text-primary-light bg-primary-light/10",
  };

  const inputClass =
    "w-full rounded-lg cursor-pointer border border-white/10 bg-[#181818] px-3 py-2.5 text-sm text-white outline-none transition focus:border-primary-light";

  const buttonClass =
    "flex items-center cursor-pointer justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="w-full min-w-0 space-y-6 pb-8">
      <HeaderComponent />

      {mensagem && (
        <div
          role="status"
          className="fixed right-5 top-5 z-[100] max-w-sm rounded-xl border border-white/10 bg-[#181818] px-4 py-3 text-sm shadow-xl"
        >
          {mensagem}
        </div>
      )}

      {/* CABEÇALHO E SELETOR */}
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <SectionHeader
          title="Sprints"
          subtitle="Planeje ciclos e acompanhe as entregas da equipe."
        />

        <button
          onClick={openCreateSprint}
          className="flex w-fit items-center gap-2 rounded-lg bg-primary-light px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-80"
        >
          <Plus size={17} />
          Criar Sprint
        </button>
      </div>

      {sprints.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1 sm:max-w-xl">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <select
              aria-label="Selecionar Sprint"
              value={data.selectedId}
              onChange={(event) => {
                setData((current) => ({
                  ...current,
                  selectedId: event.target.value,
                }));
                setFiltro("Todas");
                setBusca("");
              }}
              className={`${inputClass} appearance-none pl-10 pr-10`}
            >
              {sprints.map((sprint) => (
                <option
                  key={sprint.id}
                  value={sprint.id}
                  className="bg-[#181818]"
                >
                  {sprint.name} — {sprint.status}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          {sprintAtual && (
            <span
              className={`w-fit rounded-full px-3 py-1.5 text-xs ${
                sprintAtual.status === "ativa"
                  ? "bg-primary-light/10 text-primary-light"
                  : sprintAtual.status === "concluída"
                    ? "bg-blue-400/10 text-blue-400"
                    : "bg-amber-400/10 text-amber-400"
              }`}
            >
              {sprintAtual.status === "ativa"
                ? "Em andamento"
                : sprintAtual.status === "concluída"
                  ? "Concluída"
                  : "Planejada"}
            </span>
          )}
        </div>
      )}

      {/* ESTADO VAZIO */}
      {!sprintAtual ? (
        <section className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/10 p-8 text-center">
          <div className="rounded-2xl bg-primary-light/10 p-4">
            <Target size={32} className="text-primary-light" />
          </div>

          <h2 className="mt-5 text-lg font-semibold">Nenhuma Sprint criada</h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
            Crie sua primeira Sprint, defina um objetivo, escolha as tarefas do
            Board e acompanhe o progresso em um só lugar.
          </p>

          <button
            onClick={openCreateSprint}
            className="mt-5 flex items-center gap-2 rounded-lg bg-primary-light px-4 py-2.5 text-sm text-white hover:opacity-80"
          >
            <Plus size={17} />
            Criar primeira Sprint
          </button>
        </section>
      ) : (
        <>
          {/* CABEÇALHO DA SPRINT */}
          <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold">
                {sprintAtual.name}
              </h2>
              <p className="mt-1 text-sm text-gray-400">{sprintAtual.goal}</p>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(sprintAtual.startDate)} —{" "}
                  {formatDate(sprintAtual.endDate)}
                </span>

                {sprintAtual.status === "ativa" && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {dias === 0 ? "Prazo atingido" : `${dias} dias restantes`}
                  </span>
                )}

                {sprintAtual.status === "concluída" && (
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    Encerrada em{" "}
                    {sprintAtual.closedAt
                      ? formatDate(sprintAtual.closedAt.slice(0, 10))
                      : formatDate(sprintAtual.endDate)}
                  </span>
                )}
              </div>
            </div>

            <div className="relative flex flex-wrap items-center gap-2">
              {sprintAtual.status === "planejada" && (
                <button
                  onClick={startSprint}
                  className="flex items-center gap-2 rounded-lg bg-primary-light px-3 py-2.5 text-xs font-medium text-white hover:opacity-80"
                >
                  <Play size={14} />
                  Iniciar Sprint
                </button>
              )}

              {sprintAtual.status === "ativa" && (
                <button
                  onClick={closeSprint}
                  className="flex items-center gap-2 rounded-lg bg-primary-light px-3 py-2.5 text-xs font-medium text-white hover:opacity-80"
                >
                  <Flag size={14} />
                  Encerrar Sprint
                </button>
              )}

              {sprintAtual.status !== "concluída" && (
                <button onClick={openEditSprint} className={buttonClass}>
                  <Pencil size={14} />
                  Editar
                </button>
              )}

              <button
                onClick={() => setMenuAberto((value) => !value)}
                className={buttonClass}
                aria-label="Mais opções da Sprint"
              >
                <MoreHorizontal size={17} />
              </button>

              {menuAberto && (
                <div className="absolute right-0 top-12 z-20 w-52 rounded-xl border border-white/10 bg-[#181818] p-1.5 shadow-xl">
                  {sprintAtual.status === "planejada" && (
                    <button
                      onClick={deleteSprint}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-400 hover:bg-white/5"
                    >
                      <Trash2 size={15} />
                      Excluir Sprint
                    </button>
                  )}

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(sprintAtual.name);
                      setMenuAberto(false);
                      notify("Nome da Sprint copiado.");
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-white/5"
                  >
                    <FileText size={15} />
                    Copiar nome
                  </button>

                  <button
                    onClick={() => setMenuAberto(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-gray-400 hover:bg-white/5"
                  >
                    <X size={15} />
                    Fechar menu
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* INDICADORES DINÂMICOS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {[
              {
                icon: Grid2x2,
                text: "Total de tarefas",
                number: tarefasDaSprint.length,
                detail: "Tarefas vinculadas à Sprint",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
              },
              {
                icon: Zap,
                text: "Story Points",
                number: totalPoints,
                detail: `${completedPoints} pontos concluídos`,
                color: "text-amber-400",
                bg: "bg-amber-400/10",
              },
              {
                icon: CheckCheck,
                text: "Concluídas",
                number: concluidas.length,
                detail: `${progresso}% das tarefas`,
                color: "text-primary-light",
                bg: "bg-primary-light/10",
              },
              {
                icon: Clock,
                text: "Dias restantes",
                number:
                  sprintAtual.status === "concluída"
                    ? "—"
                    : sprintAtual.status === "planejada"
                      ? "Não iniciada"
                      : dias,
                detail:
                  sprintAtual.status === "concluída"
                    ? "Ciclo encerrado"
                    : sprintAtual.status === "planejada"
                      ? "Aguardando início"
                      : dias === 0
                        ? "Prazo atingido"
                        : "Até o encerramento",
                color: "text-purple-400",
                bg: "bg-purple-400/10",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  className="rounded-xl border border-white/10 bg-black/20 p-5 transition hover:border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div className={`rounded-lg p-2.5 ${item.bg}`}>
                      <Icon size={20} className={item.color} />
                    </div>
                    <ArrowUpRight size={17} className="text-gray-500" />
                  </div>

                  <p className="mt-5 text-sm text-gray-400">{item.text}</p>
                  <h2 className="mt-1 break-words text-3xl font-semibold">
                    {item.number}
                  </h2>
                  <p className="mt-2 text-xs text-gray-500">{item.detail}</p>
                </div>
              );
            })}
          </div>

          {/* OBJETIVO E CAPACIDADE */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <section className="rounded-xl border border-white/10 bg-black/20 p-5 xl:col-span-2">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary-light/10 p-2.5">
                  <Target size={22} className="text-primary-light" />
                </div>
                <div>
                  <h2 className="font-semibold">Objetivo da Sprint</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Principal entrega deste ciclo
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-gray-300">
                {sprintAtual.goal}
              </p>

              <div className="mt-7">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">
                    Progresso da Sprint
                  </span>
                  <span className="text-sm font-semibold text-primary-light">
                    {progresso}%
                  </span>
                </div>

                <div
                  className="h-2.5 overflow-hidden rounded-full bg-white/10"
                  role="progressbar"
                  aria-valuenow={progresso}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-primary-light transition-all duration-300"
                    style={{ width: `${progresso}%` }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-gray-500">
                  <span>
                    {concluidas.length} de {tarefasDaSprint.length} tarefas
                    concluídas
                  </span>
                  <span>
                    {tarefasDaSprint.length - concluidas.length} pendentes
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-gray-500">Início</p>
                  <p className="mt-1 text-sm font-medium">
                    {formatDate(sprintAtual.startDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Encerramento previsto</p>
                  <p className="mt-1 text-sm font-medium">
                    {formatDate(sprintAtual.endDate)}
                  </p>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-gray-500">Responsáveis</p>
                  <p className="mt-1 text-sm font-medium">
                    {
                      new Set(
                        tarefasDaSprint
                          .map((task) => task.assignee)
                          .filter(Boolean),
                      ).size
                    }{" "}
                    integrantes
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Capacidade da equipe</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Story Points planejados
                  </p>
                </div>
                <Users size={20} className="text-gray-400" />
              </div>

              <div className="mt-7 flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-3xl font-semibold">{totalPoints}</h3>
                  <p className="mt-1 text-xs text-gray-500">pontos totais</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary-light">
                    {completedPoints}
                  </p>
                  <p className="text-xs text-gray-500">pontos concluídos</p>
                </div>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-primary-light transition-all"
                  style={{
                    width: `${
                      totalPoints ? (completedPoints / totalPoints) * 100 : 0
                    }%`,
                  }}
                />
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <span className="size-2 rounded-full bg-primary-light" />
                    Concluídos
                  </span>
                  <span>{completedPoints} pts</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <span className="size-2 rounded-full bg-white/30" />
                    Restantes
                  </span>
                  <span>{totalPoints - completedPoints} pts</span>
                </div>
              </div>

              {sprintAtual.status === "ativa" && progressoTempo > progresso && (
                <div className="mt-6 flex items-start gap-3 rounded-lg bg-amber-400/5 p-3">
                  <CircleAlert
                    size={18}
                    className="mt-0.5 shrink-0 text-amber-400"
                  />
                  <p className="text-xs leading-5 text-gray-400">
                    O tempo decorrido está à frente do progresso das tarefas.
                    Avalie as prioridades e os bloqueios da equipe.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* FLUXO DE TRABALHO */}
          <section className="rounded-xl border border-white/10 bg-black/20 p-5">
            <div>
              <h2 className="font-semibold">Fluxo de trabalho</h2>
              <p className="mt-1 text-xs text-gray-500">
                Distribuição das tarefas por etapa
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              {statusTarefas.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${item.color}`} />
                      <span className="text-sm text-gray-300">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-sm font-semibold">{item.total}</span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{
                        width: `${
                          tarefasDaSprint.length
                            ? (item.total / tarefasDaSprint.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    {tarefasDaSprint.length
                      ? Math.round((item.total / tarefasDaSprint.length) * 100)
                      : 0}
                    % das tarefas
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* BACKLOG */}
          <section className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-400/10 p-2.5">
                  <ListTodo size={20} className="text-blue-400" />
                </div>
                <div>
                  <h2 className="font-semibold">Backlog da Sprint</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    {tarefasDaSprint.length} tarefas neste ciclo
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={addExistingTasks}
                  disabled={sprintAtual.status === "concluída"}
                  className={buttonClass}
                >
                  <Grid2x2 size={14} />
                  Do projeto
                </button>

                <button
                  onClick={openCreateTask}
                  disabled={sprintAtual.status === "concluída"}
                  className="flex items-center gap-2 rounded-lg bg-primary-light px-3 py-2 text-xs text-white transition hover:opacity-80 disabled:opacity-40"
                >
                  <Plus size={15} />
                  Nova tarefa
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b border-white/10 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {["Todas", ...statusOptions].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFiltro(item)}
                    className={`rounded-lg px-3 py-2 text-xs transition ${
                      filtro === item
                        ? "bg-primary-light/15 text-primary-light"
                        : "text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    {item}
                    <span className="ml-2 opacity-60">
                      {item === "Todas"
                        ? tarefasDaSprint.length
                        : tarefasDaSprint.filter((task) => task.status === item)
                            .length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:max-w-xs">
                <Search
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                  placeholder="Buscar tarefa ou responsável..."
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-gray-500">
                    <th className="px-5 py-4 font-medium">Tarefa</th>
                    <th className="px-4 py-4 font-medium">Prioridade</th>
                    <th className="px-4 py-4 font-medium">Responsável</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Pontos</th>
                    <th className="px-4 py-4 font-medium">Prazo</th>
                    <th className="px-4 py-4 font-medium">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {tarefasFiltradas.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b border-white/5 transition last:border-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-5 py-4">
                        <button
                          onClick={() => openEditTask(task)}
                          className="flex items-start gap-3 text-left"
                        >
                          <span className="mt-0.5 text-xs text-gray-500">
                            #{task.id.slice(-5)}
                          </span>
                          <span>
                            <span className="block font-medium text-gray-200">
                              {task.title}
                            </span>
                            <span className="mt-1 block text-xs text-gray-500">
                              {task.description || "Sem descrição"}
                            </span>
                          </span>
                        </button>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`whitespace-nowrap rounded-md border px-2 py-1 text-xs ${priorityStyle[task.priority] || priorityStyle.Média}`}
                        >
                          <Flag size={11} className="mr-1 inline" />
                          {task.priority}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="flex size-7 items-center justify-center rounded-full bg-purple-500 text-[10px] font-semibold text-white">
                            {(task.assignee || "?")
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-400">
                            {task.assignee || "Não atribuído"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <select
                          aria-label={`Status de ${task.title}`}
                          value={task.status}
                          disabled={sprintAtual.status === "concluída"}
                          onChange={(event) =>
                            updateTaskStatus(task.id, event.target.value)
                          }
                          className={`rounded-md border-0 px-2 py-1 text-xs outline-none ${statusStyle[task.status] || statusStyle.Backlog}`}
                        >
                          {statusOptions.map((status) => (
                            <option
                              key={status}
                              value={status}
                              className="bg-[#181818] text-white"
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-4 py-4 text-gray-300">
                        {task.points} pts
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-xs text-gray-400">
                        {formatDate(task.dueDate)}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditTask(task)}
                            title="Editar tarefa"
                            disabled={sprintAtual.status === "concluída"}
                            className="rounded p-2 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => removeTask(task)}
                            title="Remover da Sprint"
                            disabled={sprintAtual.status === "concluída"}
                            className="rounded p-2 text-gray-400 hover:bg-red-400/10 hover:text-red-400 disabled:opacity-30"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {tarefasFiltradas.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center">
                        <Circle size={25} className="mx-auto text-gray-500" />
                        <p className="mt-3 text-sm text-gray-300">
                          Nenhuma tarefa encontrada
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Ajuste os filtros ou adicione tarefas a esta Sprint.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
              <p className="text-xs text-gray-500">
                Exibindo {tarefasFiltradas.length} de {tarefasDaSprint.length}{" "}
                tarefas
              </p>
              <p className="text-xs text-gray-500">
                {totalPoints} Story Points no total
              </p>
            </div>
          </section>

          {/* RESUMO DO CICLO */}
          <section className="rounded-xl border border-white/10 bg-black/20 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary-light/10 p-2.5">
                <TrendingUp size={20} className="text-primary-light" />
              </div>
              <div>
                <h2 className="font-semibold">Resumo da Sprint</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Acompanhamento atualizado conforme os status das tarefas
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-xs text-gray-500">Progresso das tarefas</p>
                <p className="mt-2 text-2xl font-semibold">{progresso}%</p>
                <p className="mt-1 text-xs text-gray-500">
                  {concluidas.length} concluídas de {tarefasDaSprint.length}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-xs text-gray-500">Progresso dos pontos</p>
                <p className="mt-2 text-2xl font-semibold">
                  {totalPoints
                    ? Math.round((completedPoints / totalPoints) * 100)
                    : 0}
                  %
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {completedPoints} de {totalPoints} pontos entregues
                </p>
              </div>

              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-xs text-gray-500">Tarefas pendentes</p>
                <p className="mt-2 text-2xl font-semibold">
                  {tarefasDaSprint.length - concluidas.length}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Em backlog, andamento ou revisão
                </p>
              </div>
            </div>

            {sprintAtual.status === "ativa" && (
              <div className="mt-5 flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <TrendingUp
                  size={18}
                  className="mt-0.5 shrink-0 text-primary-light"
                />
                <p className="text-xs leading-5 text-gray-400">
                  Este resumo representa o estado atual das tarefas. Para
                  produzir um gráfico histórico real de velocidade ou burndown,
                  será necessário registrar snapshots diários de progresso.
                </p>
              </div>
            )}
          </section>
        </>
      )}

      {/* MODAIS */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModal(null);
          }}
        >
          <div className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <h2 className="text-lg font-semibold">
                  {modal.type === "sprint"
                    ? modal.mode === "edit"
                      ? "Editar Sprint"
                      : "Criar Sprint"
                    : modal.type === "task"
                      ? editTaskId
                        ? "Editar tarefa"
                        : "Nova tarefa"
                      : "Adicionar tarefas existentes"}
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {modal.type === "sprint"
                    ? "Defina o objetivo e o período do ciclo."
                    : modal.type === "task"
                      ? "Preencha as informações da tarefa."
                      : "Selecione tarefas ainda não vinculadas a uma Sprint."}
                </p>
              </div>

              <button
                onClick={() => setModal(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                aria-label="Fechar modal"
              >
                <X size={19} />
              </button>
            </div>

            {modal.type === "sprint" && (
              <form onSubmit={saveSprint} className="space-y-5 p-5">
                <div className="space-y-1.5">
                  <label className="text-sm text-gray-300">
                    Nome da Sprint *
                  </label>
                  <input
                    required
                    maxLength={80}
                    value={sprintForm.name}
                    onChange={(event) =>
                      setSprintForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Ex.: Sprint 13"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-gray-300">Objetivo *</label>
                  <textarea
                    required
                    rows={3}
                    maxLength={500}
                    value={sprintForm.goal}
                    onChange={(event) =>
                      setSprintForm((current) => ({
                        ...current,
                        goal: event.target.value,
                      }))
                    }
                    placeholder="Qual entrega a equipe deve realizar?"
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-300">
                      Data de início *
                    </label>
                    <input
                      required
                      type="date"
                      value={sprintForm.startDate}
                      onChange={(event) =>
                        setSprintForm((current) => ({
                          ...current,
                          startDate: event.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-300">
                      Data de encerramento *
                    </label>
                    <input
                      required
                      type="date"
                      min={sprintForm.startDate}
                      value={sprintForm.endDate}
                      onChange={(event) =>
                        setSprintForm((current) => ({
                          ...current,
                          endDate: event.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-300">
                      Tarefas do projeto
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      Selecione as tarefas que farão parte desta Sprint.
                    </p>
                  </div>

                  <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-white/10 p-2">
                    {tarefas
                      .filter(
                        (task) =>
                          !task.sprintId ||
                          (modal.mode === "edit" &&
                            task.sprintId === sprintAtual?.id),
                      )
                      .map((task) => (
                        <label
                          key={task.id}
                          className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-white/5"
                        >
                          <input
                            type="checkbox"
                            checked={sprintForm.taskIds.includes(task.id)}
                            onChange={(event) =>
                              setSprintForm((current) => ({
                                ...current,
                                taskIds: event.target.checked
                                  ? [...current.taskIds, task.id]
                                  : current.taskIds.filter(
                                      (id) => id !== task.id,
                                    ),
                              }))
                            }
                            className="accent-green-500"
                          />

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm text-gray-200">
                              {task.title}
                            </span>
                            <span className="text-xs text-gray-500">
                              {task.priority} · {task.points} pts
                            </span>
                          </span>
                        </label>
                      ))}

                    {tarefas.filter(
                      (task) =>
                        !task.sprintId ||
                        (modal.mode === "edit" &&
                          task.sprintId === sprintAtual?.id),
                    ).length === 0 && (
                      <p className="p-4 text-center text-xs text-gray-500">
                        Não há tarefas livres. Você pode criar novas tarefas
                        depois de salvar a Sprint.
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-gray-500">
                    {sprintForm.taskIds.length} tarefas selecionadas
                  </p>
                </div>

                <div className="flex justify-end gap-2 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setModal(null)}
                    className={buttonClass}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary-light px-4 py-2.5 text-sm font-medium text-white hover:opacity-80"
                  >
                    {modal.mode === "edit"
                      ? "Salvar alterações"
                      : "Criar Sprint"}
                  </button>
                </div>
              </form>
            )}

            {modal.type === "task" && (
              <form onSubmit={saveTask} className="space-y-5 p-5">
                <div className="space-y-1.5">
                  <label className="text-sm text-gray-300">Título *</label>
                  <input
                    required
                    maxLength={120}
                    value={taskForm.title}
                    onChange={(event) =>
                      setTaskForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Ex.: Implementar autenticação"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-gray-300">Descrição</label>
                  <textarea
                    rows={2}
                    maxLength={500}
                    value={taskForm.description}
                    onChange={(event) =>
                      setTaskForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Descreva o que precisa ser feito"
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-300">Prioridade</label>
                    <select
                      value={taskForm.priority}
                      onChange={(event) =>
                        setTaskForm((current) => ({
                          ...current,
                          priority: event.target.value,
                        }))
                      }
                      className={inputClass}
                    >
                      {priorityOptions.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-300">Status</label>
                    <select
                      value={taskForm.status}
                      onChange={(event) =>
                        setTaskForm((current) => ({
                          ...current,
                          status: event.target.value,
                        }))
                      }
                      className={inputClass}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-300">
                      Story Points
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={taskForm.points}
                      onChange={(event) =>
                        setTaskForm((current) => ({
                          ...current,
                          points: event.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-300">Responsável</label>
                    <input
                      value={taskForm.assignee}
                      onChange={(event) =>
                        setTaskForm((current) => ({
                          ...current,
                          assignee: event.target.value,
                        }))
                      }
                      placeholder="Nome do integrante"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm text-gray-300">Prazo</label>
                    <input
                      type="date"
                      value={taskForm.dueDate}
                      onChange={(event) =>
                        setTaskForm((current) => ({
                          ...current,
                          dueDate: event.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setModal(null)}
                    className={buttonClass}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary-light px-4 py-2.5 text-sm font-medium text-white hover:opacity-80"
                  >
                    {editTaskId ? "Salvar tarefa" : "Adicionar tarefa"}
                  </button>
                </div>
              </form>
            )}

            {modal.type === "existing" && (
              <div className="space-y-4 p-5">
                <div className="max-h-80 space-y-1 overflow-y-auto">
                  {tarefas
                    .filter((task) => !task.sprintId)
                    .map((task) => (
                      <label
                        key={task.id}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/5 p-3 hover:bg-white/5"
                      >
                        <input
                          type="checkbox"
                          checked={selecionados.includes(task.id)}
                          onChange={(event) =>
                            setSelecionados((current) =>
                              event.target.checked
                                ? [...current, task.id]
                                : current.filter((id) => id !== task.id),
                            )
                          }
                          className="accent-green-500"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm text-gray-200">
                            {task.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            {task.priority} · {task.points} pts · {task.status}
                          </span>
                        </span>
                      </label>
                    ))}

                  {tarefas.filter((task) => !task.sprintId).length === 0 && (
                    <p className="py-10 text-center text-sm text-gray-500">
                      Todas as tarefas já estão vinculadas a uma Sprint.
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 border-t border-white/10 pt-4">
                  <button
                    onClick={() => setModal(null)}
                    className={buttonClass}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmExistingTasks}
                    className="rounded-lg bg-primary-light px-4 py-2.5 text-sm text-white hover:opacity-80"
                  >
                    Adicionar selecionadas ({selecionados.length})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sprint;
