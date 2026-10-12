import React, { useState } from "react";
import HeaderComponent from "../Components/HeaderComponent";
import { Box, GitBranch, Plus, Pencil, Trash2, X } from "lucide-react";

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

  const initialTasks = [
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

  const [tasks, setTasks] = useState(() =>
    initialTasks.map((task, index) => ({
      ...task,
      id: index + 1,
    })),
  );

  function handleDragStart(e, taskId) {
    e.dataTransfer.setData("taskId", String(taskId));
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, newStatus) {
    e.preventDefault();

    const taskId = Number(e.dataTransfer.getData("taskId"));

    setTasks((currentTasks) => {
      const draggedTask = currentTasks.find((task) => task.id === taskId);

      if (!draggedTask) return currentTasks;

      // Atualiza o status da tarefa arrastada
      const updatedTask = {
        ...draggedTask,
        status: newStatus,
      };

      // Remove a tarefa da posição anterior
      const remainingTasks = currentTasks.filter((task) => task.id !== taskId);

      // Coloca a tarefa no final da lista
      return [...remainingTasks, updatedTask];
    });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    text: "",
    function: "frontend",
    priority: "media",
    pr: "",
    date: "",
    user: initialTasks[0]?.user ?? "",
    status: "backlog",
  });

  function openCreateModal(status) {
    setEditingTask(null);

    setFormData({
      text: "",
      function: "frontend",
      priority: "media",
      pr: "",
      date: "",
      user: initialTasks[0]?.user ?? "",
      status,
    });

    setIsModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);

    setFormData({
      text: task.text,
      function: task.function,
      priority: task.priority,
      pr: task.pr,
      date: task.date,
      user: task.user,
      status: task.status,
    });

    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  function handleSaveTask(e) {
    e.preventDefault();

    if (!formData.text.trim()) return;

    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData } : task,
        ),
      );
    } else {
      const newTask = {
        ...formData,
        id: Date.now(),
        pr: formData.pr || String(Date.now()).slice(-4),
      };

      setTasks((currentTasks) => [...currentTasks, newTask]);
    }

    closeModal();
  }

  function handleDeleteTask() {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a tarefa "${editingTask.text}"?`,
    );

    if (!confirmed) return;

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== editingTask.id),
    );

    closeModal();
  }

  return (
    <div className="">
      <HeaderComponent />

      <div className="mt-4 flex gap-4 w-full overflow-x-auto scrollbar-custom-dashboard-geral p-2 border border-white/10 rounded-md">
        {columns.map((item, index) => (
          <div className="rounded-md w-full">
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item.id)}
              className="bg-black/20 h-screen rounded-md w-full p-4 overflow-y-auto scrollbar-custom-dashboard-geral"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Box className="size-5" />
                  <h1 className="truncate">{item.name}</h1>
                  <p>
                    {tasks.filter((task) => task.status === item.id).length}
                  </p>
                </div>
                <button
                  onClick={() => openCreateModal(item.id)}
                  title="Adicionar tarefa"
                  className="rounded-lg p-2 text-light/70 transition hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <Plus className="size-5" />
                </button>

                {isModalOpen && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onMouseDown={(e) => {
                      if (e.target === e.currentTarget) closeModal();
                    }}
                  >
                    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#17171c] shadow-2xl">
                      <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
                        <div>
                          <h2 className="text-lg font-semibold text-white">
                            {editingTask ? "Editar tarefa" : "Nova tarefa"}
                          </h2>
                          <p className="mt-1 text-sm text-light/60">
                            {editingTask
                              ? "Atualize as informações da tarefa."
                              : "Preencha os dados para adicionar uma tarefa ao board."}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={closeModal}
                          className="rounded-lg p-2 text-light/60 transition hover:bg-white/10 hover:text-white"
                        >
                          <X className="size-5" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveTask} className="space-y-5 p-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-light">
                            Título da tarefa
                          </label>
                          <input
                            autoFocus
                            required
                            value={formData.text}
                            onChange={(e) =>
                              setFormData({ ...formData, text: e.target.value })
                            }
                            placeholder="Ex.: Implementar autenticação JWT"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-light/30 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-light">
                              Categoria
                            </label>
                            <select
                              value={formData.function}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  function: e.target.value,
                                })
                              }
                              className="w-full rounded-xl border border-white/10 bg-[#222229] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
                            >
                              <option value="frontend">Frontend</option>
                              <option value="backend">Backend</option>
                              <option value="fullstack">Full Stack</option>
                              <option value="design">Design</option>
                              <option value="teste">Testes</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-light">
                              Prioridade
                            </label>
                            <select
                              value={formData.priority}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  priority: e.target.value,
                                })
                              }
                              className="w-full rounded-xl border border-white/10 bg-[#222229] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
                            >
                              <option value="baixa">Baixa</option>
                              <option value="media">Média</option>
                              <option value="alta">Alta</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-light">
                              Número da PR
                            </label>
                            <input
                              value={formData.pr}
                              onChange={(e) =>
                                setFormData({ ...formData, pr: e.target.value })
                              }
                              placeholder="Ex.: 922"
                              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-light/30 focus:border-violet-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-light">
                              Data de entrega
                            </label>
                            <input
                              value={formData.date}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  date: e.target.value,
                                })
                              }
                              placeholder="Ex.: 25 Out"
                              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-light/30 focus:border-violet-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-light">
                            Status da tarefa
                          </label>
                          <select
                            value={formData.status}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                status: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#222229] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
                          >
                            <option value="backlog">Backlog</option>
                            <option value="andamento">Em Andamento</option>
                            <option value="revisao">Revisão</option>
                            <option value="concluido">Concluído</option>
                          </select>
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          {editingTask ? (
                            <button
                              type="button"
                              onClick={handleDeleteTask}
                              className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                            >
                              <Trash2 className="size-4" />
                              Excluir tarefa
                            </button>
                          ) : (
                            <div />
                          )}

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={closeModal}
                              className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-light transition hover:bg-white/5 sm:flex-none"
                            >
                              Cancelar
                            </button>

                            <button
                              type="submit"
                              className="flex-1 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 sm:flex-none"
                            >
                              {editingTask
                                ? "Salvar alterações"
                                : "Criar tarefa"}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {tasks
                  .filter((task) => task.status === item.id)
                  .map((task, index) => (
                    <div
                      key={task.pr ?? index}
                      draggable
                      onClick={() => openEditModal(task)}
                      onDragStart={(e) => handleDragStart(e, task.id)}
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
