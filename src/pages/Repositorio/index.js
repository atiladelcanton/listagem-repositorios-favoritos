import React, { useState, useCallback, useEffect } from "react";
import api from "../../services/api";
import {
  Container,
  Owner,
  Loading,
  BackButton,
  IssuesList,
  PageActions,
  FilterList,
  HeaderDetail
} from "./styles.js";
import { FaArrowAltCircleLeft } from "react-icons/fa";
export default function Repositorio({ match }) {
  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    { state: "all", label: "Todas Issues", active: true },
    { state: "open", label: "Issues Abertas", active: false },
    { state: "closed", label: "Issues Fechadas", active: false }
  ]);
  const [filterIndex, setFilterIndex] = useState(0);
  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: filters.find(f => f.active).state,
            per_page: 5
          }
        })
      ]);
      setRepositorio(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    load();
  }, []);

  useEffect(() => {
    async function loadIssue() {
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page: page,
          per_page: 5
        }
      });

      setIssues(response.data);
    }

    loadIssue();
  }, [page, filters, filterIndex]);

  function handlePage(action) {
    setPage(action === "back" ? page - 1 : page + 1);
  }
  function handleFilter(index) {
    setFilterIndex(index);
  }
  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }
  return (
    <Container>
      <HeaderDetail>
        <BackButton to="/">
          <FaArrowAltCircleLeft color="#0d2636" size={24} />
        </BackButton>
        <Owner>
          <img
            src={repositorio.owner.avatar_url}
            alt={repositorio.owner.login}
          />
          <h1>{repositorio.name}</h1>
          <p>{repositorio.description}</p>
        </Owner>
        <FilterList active={filterIndex}>
          {filters.map((filter, index) => (
            <button
              type="button"
              key={filter.label}
              onClick={() => handleFilter(index)}
            >
              {filter.label}
            </button>
          ))}
        </FilterList>
      </HeaderDetail>
      <IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
              </strong>
              <div className="labels">
                {issue.labels.map(label => (
                  <span key={String(label.id)} test={label.color}>
                    {" "}
                    {label.name}
                  </span>
                ))}
              </div>

              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>

      <PageActions>
        <button
          type="button"
          onClick={() => handlePage("back")}
          disabled={page < 2}
        >
          Anterior
        </button>
        <span>Você está na página {page}</span>
        <button type="button" onClick={() => handlePage("next")}>
          Proxima
        </button>
      </PageActions>
    </Container>
  );
}
