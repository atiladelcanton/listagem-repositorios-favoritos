import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, SubmitButton, List, ContainerForm } from "./style";
import { FaGithub, FaPlus, FaSpinner, FaEye } from "react-icons/fa";
import api from "../../services/api";
export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setNewRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //DidMount buscar
  useEffect(() => {
    const repoStorage = localStorage.getItem("repos");

    if (repoStorage) {
      setNewRepositorios(JSON.parse(repoStorage));
    }
  }, []);
  // Salvar
  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositorios));
  }, [repositorios]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      async function submit() {
        setLoading(true);
        setAlert(null);
        try {
          if (newRepo === "") {
            throw new Error("Você precisa indicar um repositorio!");
          }
          const response = await api.get(`repos/${newRepo}`);
          if (response.status === 404) {
            throw new Error("Repositorio inválido!");
          }
          const hasRepo = repositorios.find(repo => repo.name === newRepo);
          if (hasRepo) {
            throw new Error("Repositorio Duplicado!");
          }
          const data = {
            name: response.data.full_name,
            avatar: response.data.owner.avatar_url
          };
          setNewRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          setAlert(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      submit();
    },
    [newRepo, repositorios]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null);
  }

  return (
    <Container>
      <ContainerForm>
        <h1>
          <FaGithub size={25} />
          Meus Repositorios
        </h1>
        <Form onSubmit={handleSubmit} error={alert}>
          <input
            type="text"
            placeholder="Adicionar Repositorios"
            value={newRepo}
            onChange={handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={15} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
      </ContainerForm>
      <List>
        {repositorios.map(repo => (
          <li key={repo.name}>
            <span>
              <img src={repo.avatar} alt={repo.name} />
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaEye size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
