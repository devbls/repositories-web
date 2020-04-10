import React, { useState, useEffect } from 'react';
import {
  FaGithubAlt,
  FaPlus,
  FaSpinner,
  FaFilter,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';

import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import api from '../../services/api';
import {
  Container,
  Form,
  SubmitButton,
  List,
  SortButton,
  TotalContainer,
  LoadingContainer,
  Avatar,
  RepositoryName,
  RepositoryOwner,
  RepositoryItem,
  RepositoryInfo,
  PageChanger,
  PreviousPage,
  NextPage,
} from './styles';

export default function Main() {
  const [querySearch, setQuerySearch] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepositories, setTotalRepositories] = useState(0);
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  // Salvar os dados do localStorage
  /*
  useEffect(() => {
    const localRepositories = localStorage.getItem('repositories');

    if (localRepositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }, [repositories]);
  */

  function handleInputChange(e) {
    setQuerySearch(e.target.value);
  }

  async function loadRepositories(query, page) {
    const response = await api.get(
      `repositories?q=${query}&page=${page}&per_page=8`
    );

    return response;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setSearchResult('');
    setTotalRepositories(0);
    setRepositories([]);

    const response = await loadRepositories(querySearch, currentPage);

    const { items, total_count: totalCount } = response.data;

    if (totalCount === 0) {
      toast.error('No repository found, try again!');
    }

    setRepositories(items);
    setSearchResult(querySearch);
    setQuerySearch('');
    setLoading(false);
    setTotalRepositories(totalCount);
  }

  async function handlePrevPage() {
    const page = currentPage - 1;

    if (currentPage === 1) {
      setPrevButton(false);
      return;
    }

    setPrevButton(true);

    setCurrentPage(page);

    const response = await loadRepositories(searchResult, page);

    setRepositories(response.data.items);
  }

  async function handleNextPage() {
    const page = currentPage + 1;

    setCurrentPage(page);

    const response = await loadRepositories(searchResult, page);

    setRepositories(response.data.items);
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Search repositories
      </h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type repository name"
          value={querySearch}
          onChange={handleInputChange}
        />
        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
        <SortButton>
          <FaFilter />
        </SortButton>
      </Form>
      {totalRepositories ? (
        <TotalContainer>
          <h1>
            <FaSearch />
            Repositories found: {totalRepositories}
          </h1>
        </TotalContainer>
      ) : null}
      <List>
        {loading ? (
          <LoadingContainer loading={loading}>
            <FaSpinner color="#000" size={64} />
          </LoadingContainer>
        ) : (
          repositories.map(repo => (
            <RepositoryItem key={repo.id}>
              <Avatar src={repo.owner.avatar_url} alt="avatar" />
              <RepositoryInfo>
                <RepositoryName>{repo.name}</RepositoryName>
                <RepositoryOwner>{repo.owner.login}</RepositoryOwner>
              </RepositoryInfo>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </RepositoryItem>
          ))
        )}
      </List>
      {totalRepositories ? (
        <PageChanger>
          <PreviousPage disabled={prevButton} onClick={handlePrevPage}>
            <FaArrowLeft />
          </PreviousPage>
          <h2>Page {currentPage}</h2>
          <NextPage disabled={nextButton} onClick={handleNextPage}>
            <FaArrowRight />
          </NextPage>
        </PageChanger>
      ) : null}
    </Container>
  );
}
