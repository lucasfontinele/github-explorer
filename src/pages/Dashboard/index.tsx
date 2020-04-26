import React, { useState, FormEvent, useEffect } from 'react';

import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';

import logoImg from '../../assets/logo.svg';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repo, setRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@github-explorer:repositories',
    );

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    } else {
      return [];
    }
  });

  async function handleAddRepository(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (!repo) {
      setInputError('Digite o autor/nome do repositório');

      return;
    }

    try {
      const response = await api.get<Repository>(`/repos/${repo}`);

      if (response.status === 200) {
        const repository = response.data;
        setRepositories([...repositories, repository]);
        setRepo('');
        setInputError('');
      }
    } catch (error) {
      setInputError('Erro ao buscar o repositório');
    }
  }

  useEffect(() => {
    localStorage.setItem(
      '@github-explorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  return (
    <>
      <img src={logoImg} alt="App logo" />
      <Title>Explore repositórios no Github</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((item) => (
          <Link to={`/repositories/${item.full_name}`} key={item.full_name}>
            <img src={item.owner.avatar_url} alt={item.owner.login} />
            <div>
              <strong>{item.full_name}</strong>
              <p>{item.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
