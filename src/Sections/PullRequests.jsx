import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  GitPullRequest,
  GitMerge,
  CircleDot,
  CheckCircle2,
  Search,
  RefreshCw,
  ExternalLink,
  GitBranch,
  CalendarDays,
  UserRound,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

const FILTERS = [
  { label: "Todos", value: "all" },
  { label: "Abertos", value: "open" },
  { label: "Rascunhos", value: "draft" },
  { label: "Mesclados", value: "merged" },
  { label: "Fechados", value: "closed" },
];

function formatDate(date) {
  if (!date) return "Data indisponível";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getStatus(pr) {
  if (pr.merged_at) {
    return {
      label: "Mesclado",
      className: "bg-purple-500/10 text-purple-400",
      icon: GitMerge,
    };
  }

  if (pr.draft) {
    return {
      label: "Rascunho",
      className: "bg-gray-500/10 text-gray-400",
      icon: GitPullRequest,
    };
  }

  if (pr.state === "open") {
    return {
      label: "Aberto",
      className: "bg-green-500/10 text-green-400",
      icon: CircleDot,
    };
  }

  return {
    label: "Fechado",
    className: "bg-red-500/10 text-red-400",
    icon: CheckCircle2,
  };
}

function PullRequests() {
  const [owner, setOwner] = useState("BiellSouza");
  const [repo, setRepo] = useState("codeSpace");
  const [repository, setRepository] = useState({
    owner: "BiellSouza",
    repo: "codeSpace",
  });

  const [pullRequests, setPullRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchPullRequests = useCallback(async (repoOwner, repoName) => {
    if (!repoOwner.trim() || !repoName.trim()) {
      setError("Informe o proprietário e o nome do repositório.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url =
        `https://api.github.com/repos/` +
        `${encodeURIComponent(repoOwner.trim())}/` +
        `${encodeURIComponent(repoName.trim())}/pulls?state=all&sort=updated&direction=desc&per_page=100`;

      const response = await fetch(url, {
        headers: {
          Accept: "application/vnd.github+json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "Repositório não encontrado ou privado. Confira o proprietário e o nome.",
          );
        }

        if (response.status === 403) {
          throw new Error(
            "Limite de consultas atingido ou acesso negado. Tente novamente mais tarde.",
          );
        }

        throw new Error(`O GitHub retornou um erro (${response.status}).`);
      }

      const data = await response.json();

      setPullRequests(data);
      setRepository({
        owner: repoOwner.trim(),
        repo: repoName.trim(),
      });
      setLastUpdated(new Date());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar os pull requests.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPullRequests("BiellSouza", repo);
  }, [fetchPullRequests]);

  const stats = useMemo(() => {
    return {
      total: pullRequests.length,
      open: pullRequests.filter((pr) => pr.state === "open" && !pr.draft)
        .length,
      draft: pullRequests.filter((pr) => pr.state === "open" && pr.draft)
        .length,
      merged: pullRequests.filter((pr) => pr.merged_at).length,
      closed: pullRequests.filter(
        (pr) => pr.state === "closed" && !pr.merged_at,
      ).length,
    };
  }, [pullRequests]);

  const filteredPullRequests = useMemo(() => {
    return pullRequests.filter((pr) => {
      const matchesSearch =
        pr.title.toLowerCase().includes(search.toLowerCase()) ||
        String(pr.number).includes(search) ||
        pr.user.login.toLowerCase().includes(search.toLowerCase());

      let matchesFilter = true;

      if (filter === "open") {
        matchesFilter = pr.state === "open" && !pr.draft;
      } else if (filter === "draft") {
        matchesFilter = pr.state === "open" && pr.draft;
      } else if (filter === "merged") {
        matchesFilter = Boolean(pr.merged_at);
      } else if (filter === "closed") {
        matchesFilter = pr.state === "closed" && !pr.merged_at;
      }

      return matchesSearch && matchesFilter;
    });
  }, [pullRequests, filter, search]);

  function handleRepositorySubmit(event) {
    event.preventDefault();
    fetchPullRequests(owner, repo);
  }

  return (
    <div className="min-h-screen space-y-6 bg-dark p-4 text-light sm:p-6 lg:p-8">
      {/* Cabeçalho */}
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-light/50">
            <GitPullRequest size={17} />
            <span>Desenvolvimento</span>
            <span>/</span>
            <span>Pull Requests</span>
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Pull Requests
          </h1>

          <p className="mt-2 text-sm text-light/60">
            Acompanhe as contribuições e alterações do seu repositório.
          </p>
        </div>

        <button
          onClick={() => fetchPullRequests(repository.owner, repository.repo)}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary-light px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          Atualizar dados
        </button>
      </header>

      {/* Seleção do repositório */}
      <form
        onSubmit={handleRepositorySubmit}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
      >
        <div className="mb-4">
          <h2 className="font-semibold text-white">Repositório conectado</h2>
          <p className="mt-1 text-sm text-light/50">
            Informe o usuário ou organização e o nome do repositório.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <label className="flex-1">
            <span className="mb-2 block text-xs text-light/60">
              Proprietário
            </span>
            <input
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              placeholder="Ex.: octocat"
              className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-white outline-none transition placeholder:text-light/30 focus:border-primary-light"
            />
          </label>

          <label className="flex-1">
            <span className="mb-2 block text-xs text-light/60">
              Repositório
            </span>
            <input
              value={repo}
              onChange={(event) => setRepo(event.target.value)}
              placeholder="Ex.: Hello-World"
              className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-white outline-none transition placeholder:text-light/30 focus:border-primary-light"
            />
          </label>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5 disabled:opacity-50 md:w-auto"
            >
              <Search size={16} />
              Consultar
            </button>
          </div>
        </div>

        <a
          href={`https://github.com/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.repo)}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-xs text-light/50 transition hover:text-white"
        >
          <GitBranch size={14} />
          {repository.owner}/{repository.repo}
          <ExternalLink size={13} />
        </a>
      </form>

      {/* Erro da API */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Não foi possível consultar o GitHub</p>
            <p className="mt-1 text-red-200/80">{error}</p>
          </div>
        </div>
      )}

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          {
            title: "Total carregado",
            value: stats.total,
            icon: GitPullRequest,
            color: "text-white",
            description: "PRs nesta consulta",
          },
          {
            title: "Abertos",
            value: stats.open,
            icon: CircleDot,
            color: "text-green-400",
            description: "Aguardando conclusão",
          },
          {
            title: "Rascunhos",
            value: stats.draft,
            icon: GitPullRequest,
            color: "text-gray-400",
            description: "Ainda em preparação",
          },
          {
            title: "Mesclados",
            value: stats.merged,
            icon: GitMerge,
            color: "text-purple-400",
            description: "Alterações integradas",
          },
          {
            title: "Fechados",
            value: stats.closed,
            icon: CheckCircle2,
            color: "text-red-400",
            description: "Fechados sem merge",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20"
            >
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="text-sm text-light/60">{item.title}</span>
                <Icon size={19} className={item.color} />
              </div>

              <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>

              <p className="mt-2 text-xs text-light/40">{item.description}</p>
            </article>
          );
        })}
      </section>

      {/* Lista de PRs */}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="border-b border-white/10 p-4 sm:p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Pull requests do repositório
              </h2>
              <p className="mt-1 text-sm text-light/50">
                Dados recebidos diretamente da API do GitHub.
              </p>
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-light/40"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar título, número ou autor..."
                className="w-full rounded-xl border border-white/10 bg-dark py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-light/30 focus:border-primary-light"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm transition ${
                  filter === item.value
                    ? "bg-primary-light text-white"
                    : "text-light/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-light/60">
            <RefreshCw size={28} className="animate-spin text-primary-light" />
            <p className="text-sm">Buscando pull requests no GitHub...</p>
          </div>
        ) : filteredPullRequests.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <GitPullRequest size={34} className="mb-3 text-light/30" />
            <h3 className="font-semibold text-white">
              Nenhum pull request encontrado
            </h3>
            <p className="mt-2 max-w-sm text-sm text-light/50">
              Tente mudar o filtro ou o termo da pesquisa. Se o repositório
              estiver vazio, esta lista também ficará vazia.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.07]">
            {filteredPullRequests.map((pr) => {
              const status = getStatus(pr);
              const StatusIcon = status.icon;

              return (
                <article
                  key={pr.id}
                  className="p-4 transition hover:bg-white/[0.025] sm:p-5"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-1 hidden sm:block">
                      <StatusIcon
                        size={22}
                        className={
                          status.label === "Mesclado"
                            ? "text-purple-400"
                            : status.label === "Aberto"
                              ? "text-green-400"
                              : status.label === "Fechado"
                                ? "text-red-400"
                                : "text-gray-400"
                        }
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="break-words font-semibold text-white">
                          {pr.title}
                        </h3>

                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${status.className}`}
                        >
                          <StatusIcon size={13} />
                          {status.label}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-light/50">
                        <span className="text-light/70">#{pr.number}</span>
                        {" · "}
                        aberto por{" "}
                        <span className="text-light/80">{pr.user.login}</span>
                        {" · "}
                        atualizado em {formatDate(pr.updated_at)}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-light/50">
                        <span className="inline-flex items-center gap-1.5">
                          <GitBranch size={14} />
                          <span className="max-w-36 truncate">
                            {pr.head.ref}
                          </span>
                          <ChevronDown size={12} className="-rotate-90" />
                          <span className="max-w-36 truncate">
                            {pr.base.ref}
                          </span>
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          Criado em {formatDate(pr.created_at)}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <UserRound size={14} />
                          {pr.user.login}
                        </span>
                      </div>

                      {pr.labels?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {pr.labels.map((label) => (
                            <span
                              key={label.id}
                              className="rounded-md border border-white/10 px-2 py-1 text-xs text-light/60"
                            >
                              {label.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <a
                      href={pr.html_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Abrir pull request ${pr.number} no GitHub`}
                      title="Abrir no GitHub"
                      className="shrink-0 rounded-lg border border-white/10 p-2 text-light/50 transition hover:border-primary-light hover:text-white"
                    >
                      <ExternalLink size={17} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <footer className="flex flex-col gap-2 border-t border-white/10 px-4 py-4 text-xs text-light/40 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <span>
            Exibindo {filteredPullRequests.length} de {pullRequests.length} PRs
            carregados
          </span>

          <span>
            {lastUpdated
              ? `Última consulta: ${lastUpdated.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "Aguardando consulta"}
          </span>
        </footer>
      </section>
    </div>
  );
}

export default PullRequests;
