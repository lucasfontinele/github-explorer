import React, { useEffect, useState } from 'react';

import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import { Header, RepositoryInfo, RepositoryInfoHeader, Issues } from './styles';

import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    async function getRepositoryInfo(): Promise<void> {
      try {
        const response = await api.get(`/repos/${params.repository}`);

        if (response.status === 200) {
          setRepository(response.data);
        }
      } catch (error) {}
    }

    async function getRepositoryIssues(): Promise<void> {
      try {
        const response = await api.get(`/repos/${params.repository}/issues`);

        if (response.status === 200) {
          setIssues(response.data);
        }
      } catch (error) {}
    }

    Promise.all([getRepositoryInfo(), getRepositoryIssues()]);
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <RepositoryInfoHeader>
            <img src={repository.owner.avatar_url} alt={repository.full_name} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </RepositoryInfoHeader>
          <ul>
            <li>
              <strong>
                {Intl.NumberFormat('pt-BR').format(repository.stargazers_count)}
              </strong>
              <span>stars</span>
            </li>
            <li>
              <strong>
                {Intl.NumberFormat('pt-BR').format(repository.forks_count)}
              </strong>
              <span>forks</span>
            </li>
            <li>
              <strong>
                {Intl.NumberFormat('pt-BR').format(
                  repository.open_issues_count,
                )}
              </strong>
              <span>issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map((item) => (
          <a
            href={item.html_url}
            target="_blank"
            rel="noopener noreferrer"
            key={item.id}
          >
            <div>
              <strong>{item.title}</strong>
              <p>{item.user.login}</p>
            </div>
            <FiChevronRight />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
