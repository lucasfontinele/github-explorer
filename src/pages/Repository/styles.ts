import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;

    transition: color 0.2s;

    svg {
      margin-right: 4px;
    }

    &:hover {
      color: #666;
    }
  }
`;

export const RepositoryInfo = styled.div`
  margin-top: 80px;

  ul {
    display: flex;
    list-style: none;

    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
  }
`;

export const RepositoryInfoHeader = styled.header`
  display: flex;
  align-items: center;

  img {
    width: 120px;
    height: 120px;

    border-radius: 50%;
  }

  div {
    margin-left: 24px;

    strong {
      font-size: 36;
      color: #3d3d4d;
    }
    p {
      font-size: 18px;
      color: #737380;

      margin-top: 4px;
    }
  }
`;

export const Issues = styled.div`
  margin-top: 80px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;

    &:hover {
      transform: translateX(10px);
      transition: transform 0.2s;
    }

    & + a {
      margin-top: 10px;
    }

    div {
      flex: 1;
      margin-left: 16px;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
