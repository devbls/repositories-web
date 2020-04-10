import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 32px;
  margin: 80px auto;

  h1 {
    font-size: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 12px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 32px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #149543;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const SortButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  background: #fff;
  border: 1px solid #000;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 48px;

  h1 {
    font-size: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 12px;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 16px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      color: #24292e;
      padding: 12px;
      border: 1px solid #000;
      border-radius: 8px;
      text-align: center;
      font-size: 16px;
      height: 48px;
      text-decoration: none;
    }
  }
`;

export const Avatar = styled.img`
  height: 72px;
  width: 72px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background: #eee;
  margin-right: 16px;
`;

export const RepositoryInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;

export const RepositoryItem = styled.li`
  display: flex;
  align-items: center;
  padding: 16px;
`;

export const RepositoryName = styled.h1`
  font-size: 18px;
  color: #24292e;
`;

export const RepositoryOwner = styled.p`
  font-size: 14px;
  margin-top: 8px;
  color: #777;
`;

export const PageChanger = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 32px;

  h2 {
    font-size: 18px;
    margin: 0 16px;
  }
`;

export const PreviousPage = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.disabled,
}))`
  background: #fff;
  border: 0;
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.9;
  }

  ${props =>
    props.disabled &&
    css`
      svg {
        color: #999;
      }
    `}
`;

export const NextPage = styled.button`
  background: #fff;
  border: 0;
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
